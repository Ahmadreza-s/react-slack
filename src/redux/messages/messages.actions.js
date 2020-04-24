import {
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_START,
    FETCH_MESSAGES_SUCCESS,
    NEW_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS,
    UPLOAD_MEDIA_FAIL,
    UPLOAD_MEDIA_PERCENT,
    UPLOAD_MEDIA_START,
    UPLOAD_MEDIA_SUCCESS
} from './messages.types';
import firebase from '../../firebase';

const messagesRef = firebase.database().ref('messages');
const privateMessagesRef = firebase.database().ref('privateMessages');
const getMessagesRef = (isPrivate) => isPrivate ? privateMessagesRef : messagesRef;

const sendMessageStart = () => ({type: SEND_MESSAGE_START});
const sendMessageFail = error => ({type: SEND_MESSAGE_FAIL, error});
const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});

export const sendMessage = message => async (dispatch, getState) => {
    dispatch(sendMessageStart());
    const user = getState().user.currentUser;
    const currentChannel = getState().channels.currentChannel;
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
        await getMessagesRef(currentChannel.isPrivate)
            .child(currentChannel.id)
            .push()
            .set(msgToSend);
        dispatch(sendMessageSuccess());
    } catch (e) {
        dispatch(sendMessageFail(e.message));
    }
};

const uploadMediaStart = () => ({type: UPLOAD_MEDIA_START});
const uploadMediaFail = error => ({type: UPLOAD_MEDIA_FAIL, error});
const uploadMediaSuccess = () => ({type: UPLOAD_MEDIA_SUCCESS});
const uploadMediaPercent = percent => ({type: UPLOAD_MEDIA_PERCENT, percent});

export const uploadMedia = (file, filepath, metadata) => async (dispatch, getState) => {
    dispatch(uploadMediaStart());
    const currentChannel = getState().channels.currentChannel;
    const user = getState().user.currentUser;
    const storageRef = firebase.storage().ref(filepath);
    const uploadTask = storageRef.put(file, metadata);
    uploadTask.on('state_changed',
        snap => dispatch(uploadMediaPercent(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))),
        error => dispatch(uploadMediaFail(error.message)),
        async () => {
            try {
                const url = await uploadTask.snapshot.ref.getDownloadURL();

                const msgToSend = {
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    image    : url,
                    user     : {
                        id    : user.id,
                        name  : user.displayName,
                        avatar: user.avatar
                    }
                };

                try {
                    await getMessagesRef(currentChannel.isPrivate)
                        .child(currentChannel.id)
                        .push()
                        .set(msgToSend);
                    dispatch(uploadMediaSuccess());
                } catch (e) {
                    dispatch(uploadMediaFail(e.message()));
                }
            } catch (e) {
                dispatch(uploadMediaFail(e.message()));
            }
        });
};

const fetchMessagesStart = () => ({type: FETCH_MESSAGES_START});
const fetchMessagesFail = error => ({type: FETCH_MESSAGES_FAIL, error});
const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});

export const fetchMessages = channel => async dispatch => {
    dispatch(fetchMessagesStart());
    return new Promise(resolve => {
        getMessagesRef(channel.isPrivate).child(channel.id).on('value', snap => {
            const msgs = [];
            if (snap.val())
                Object.entries(snap.val()).forEach(([id, msg]) => msgs.push({id, ...msg}));
            getMessagesRef(channel.isPrivate).child(channel.id).off('value');
            dispatch(fetchMessagesSuccess(msgs));
            resolve();
        });
    });
};

const newMessage = message => ({type: NEW_MESSAGE, message});
export const newMessagesListener = (state, channel) => async (dispatch, getState) => {
    if (state) {
        getMessagesRef(channel.isPrivate)
            .child(channel.id)
            .on('child_added', snap => {
                const messages = getState().messages.messages;
                const message = {id: snap.key, ...snap.val()};
                if (!messages.find(msg => msg.id === message.id))
                    dispatch(newMessage(message));
            });
    }
    else {
        getMessagesRef(channel.isPrivate).child(channel.id).off('child_added');
    }
};
