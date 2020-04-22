import {ADD_CHANNEL, SELECT_CHANNEL} from './channels.types';

const initialState = {
    channels      : [],
    currentChannel: null
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
        default:
            return state;
    }
}
