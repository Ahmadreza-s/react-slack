import {
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_START,
    FETCH_MESSAGES_SUCCESS,
    NEW_MESSAGE,
    NEW_NOTIFICATION,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS,
    UPLOAD_MEDIA_FAIL,
    UPLOAD_MEDIA_PERCENT,
    UPLOAD_MEDIA_START,
    UPLOAD_MEDIA_SUCCESS
} from './messages.types';

const initialState = {
    isFetching           : false,
    messages             : [],
    isSending            : false,
    sendingMessageError  : null,
    fetchingMessagesError: null,
    isUploading          : false,
    isUploadingDone      : false,
    uploadPercent        : 0,
    uploadError          : null,
    notifications        : []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_MEDIA_START:
            return {
                ...state,
                isUploading    : true,
                isUploadingDone: false,
                uploadPercent  : 0,
                uploadError    : null
            };
        case UPLOAD_MEDIA_PERCENT:
            return {
                ...state,
                uploadPercent: action.percent
            };
        case UPLOAD_MEDIA_SUCCESS:
            return {
                ...state,
                isUploading    : false,
                isUploadingDone: true,
                uploadPercent  : 100
            };
        case UPLOAD_MEDIA_FAIL:
            return {
                ...state,
                isUploading: false,
                uploadError: action.error
            };
        case NEW_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.message)
            };
        case SEND_MESSAGE_START:
            return {
                ...state,
                isSending          : true,
                sendingMessageError: null
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                isSending: false
            };
        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                isSending          : false,
                sendingMessageError: action.error
            };
        case FETCH_MESSAGES_START:
            return {
                ...state,
                isFetching           : true,
                fetchingMessagesError: null
            };
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                isFetching   : false,
                messages     : action.messages,
                notifications: state.notifications.filter(noti => noti.channelId !== action.channelId)
            };
        case FETCH_MESSAGES_FAIL:
            return {
                ...state,
                isFetching           : false,
                fetchingMessagesError: action.error
            };
        case NEW_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.concat(action.notification)
            };
        default:
            return state;
    }
}
