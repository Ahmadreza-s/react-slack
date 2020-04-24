import {
    FETCH_USERS_FAIL,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    NEW_USER,
    SET_USER,
    USER_STATUS_CHANGED
} from './user.types';
import firebase from '../../firebase';

const usersRef = firebase.database().ref('users');
const connectedRef = firebase.database().ref('.info/connected');
const presenceRef = firebase.database().ref('presence');

export const setUser = user => ({type: SET_USER, user});

const fetchUsersStart = () => ({type: FETCH_USERS_START});
const fetchUsersSuccess = users => ({type: FETCH_USERS_SUCCESS, users});
const fetchUsersFail = error => ({type: FETCH_USERS_FAIL, error});

export const fetchUsers = () => async (dispatch, getState) => {
    dispatch(fetchUsersStart());
    return new Promise(resolve => {
        const currentUserID = getState().user.currentUser.id;
        connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = presenceRef.child(currentUserID);
                ref.set(true);
                ref.onDisconnect().remove();
            }
        });

        usersRef.once('value', snap => {
            const users = [];
            Object.entries(snap.val()).forEach(([key, user]) => {
                if (key !== currentUserID)
                    users.push({id: key, ...user, status: 'offline'});
            });
            dispatch(fetchUsersSuccess(users));
            resolve(users);
            //todo:fetchUsersFAIL
        });
    });
};

export const userAddListener = state => async (dispatch, getState) => {
    if (state) {
        const currentUserID = getState().user.currentUser.id;

        usersRef.on('child_added', snap => {
            const users = getState().user.users;
            const user = snap.val();
            if (users.findIndex(u => u.id === snap.key) < 0 && snap.key !== currentUserID)
                dispatch({type: NEW_USER, user, status: 'offline'});
        });
    }
    else
        usersRef.off('child_added');
};

export const userStatusChangeListener = state => async (dispatch, getState) => {
    if (state) {
        const currentUserID = getState().user.currentUser.id;
        presenceRef.on('child_added', snap => {
            if (snap.key !== currentUserID)
                dispatch({
                    type  : USER_STATUS_CHANGED,
                    id    : snap.key,
                    status: 'online'
                });
        });
        presenceRef.on('child_removed', snap => {
            if (snap.key !== currentUserID)
                dispatch({
                    type  : USER_STATUS_CHANGED,
                    id    : snap.key,
                    status: 'offline'
                });
        });
    }
    else {
        presenceRef.off('child_removed');
        presenceRef.off('child_added');
    }
};
