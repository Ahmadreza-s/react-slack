import {
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_START,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS
} from './messages.types';
import firebase from '../../firebase';

const messagesRef = firebase.database().ref('messages');

const sendMessageStart = () => ({type: SEND_MESSAGE_START});
const sendMessageFail = error => ({type: SEND_MESSAGE_FAIL, error});
const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});

export const sendMessage = message => async (dispatch, getState) => {
    dispatch(sendMessageStart());
    const user = getState().user.currentUser;
    const channelId = getState().channels.currentChannel.id;
    const msgToSend = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        content  : message,
        user     : {
            id    : user.id,
            name  : user.displayName,
            avatar: user.avatar
        }
    };
    try {
        await messagesRef
            .child(channelId)
            .push()
            .set(msgToSend);
        dispatch(sendMessageSuccess());
    } catch (e) {
        dispatch(sendMessageFail(e.message));
    }
};

const fetchMessagesStart = () => ({type: FETCH_MESSAGES_START});
const fetchMessagesFail = error => ({type: FETCH_MESSAGES_FAIL, error});
const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});

export const fetchMessages = (channelId) => async dispatch => {
    dispatch(fetchMessagesStart());
    messagesRef.child(channelId).on('value', snap => {
        const msgs = [];
        Object.entries(snap.val()).forEach(([, msg]) => msgs.push(msg));
        messagesRef.off('value');
        dispatch(fetchMessagesSuccess(msgs));
    });
};
