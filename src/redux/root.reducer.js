import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import channelsReducer from './channels/channels.reducer';
import messagesReducer from './messages/messages.reducer';

const rootReducer = combineReducers({
    user    : userReducer,
    channels: channelsReducer,
    messages: messagesReducer
});

export default rootReducer;
