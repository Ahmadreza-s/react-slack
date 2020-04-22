import {
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_START,
    FETCH_MESSAGES_SUCCESS,
    NEW_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS
} from './messages.types';

const initialState = {
    isFetching           : false,
    messages             : [],
    isSending            : false,
    sendingMessageError  : null,
    fetchingMessagesError: null
};
export default (state = initialState, action) => {
    switch (action.type) {
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
                isFetching: false,
                messages  : action.messages
            };
        case FETCH_MESSAGES_FAIL:
            return {
                ...state,
                isFetching           : false,
                fetchingMessagesError: action.error
            };
        default:
            return state;
    }
}
