import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import channelsReducer from './channels/channels.reducer';

const rootReducer = combineReducers({
    user    : userReducer,
    channels: channelsReducer
});

export default rootReducer;
