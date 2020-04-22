import {
    ADD_CHANNEL,
    FETCH_CHANNELS_FAIL,
    FETCH_CHANNELS_START,
    FETCH_CHANNELS_SUCCESS,
    SELECT_CHANNEL
} from './channels.types';

const initialState = {
    channels      : [],
    currentChannel: null,
    isLoading     : true,
    error         : null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHANNEL:
            return {
                ...state,
                channels: state.channels.concat(action.channel)
            };
        case SELECT_CHANNEL:
            return {
                ...state,
                currentChannel: action.channel
            };
        case FETCH_CHANNELS_START:
            return {
                ...state,
                error    : null,
                isLoading: true
            };
        case FETCH_CHANNELS_SUCCESS:
            return {
                ...state,
                isLoading     : false,
                channels      : action.channels,
                currentChannel: null
            };
        case FETCH_CHANNELS_FAIL:
            return {
                ...state,
                isLoading: false,
                error    : action.error
            };
        default:
            return state;
    }
}
