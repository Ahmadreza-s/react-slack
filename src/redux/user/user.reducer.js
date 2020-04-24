import {
    FETCH_USERS_FAIL,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    NEW_USER,
    SET_USER,
    USER_STATUS_CHANGED
} from './user.types';

const initialState = {
    currentUser       : null,
    loading           : true,
    users             : [],
    isUsersFetching   : false,
    fetchingUsersError: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case NEW_USER:
            return {
                ...state,
                users: state.users.concat(action.user)
            };
        case FETCH_USERS_START:
            return {
                ...state,
                isUsersFetching   : true,
                fetchingUsersError: null
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isUsersFetching: false,
                users          : action.users
            };
        case FETCH_USERS_FAIL:
            return {
                ...state,
                isUsersFetching   : false,
                fetchingUsersError: action.error
            };
        case USER_STATUS_CHANGED:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id)
                        return {
                            ...user,
                            status: action.status
                        };
                    return user;
                })
            };
        case SET_USER:
            return {
                ...state,
                currentUser: action.user,
                loading    : false
            };
        default:
            return state;
    }
};
export default user;
