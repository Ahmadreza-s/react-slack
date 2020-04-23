import {
    ADD_CHANNEL,
    FETCH_CHANNELS_FAIL,
    FETCH_CHANNELS_START,
    FETCH_CHANNELS_SUCCESS,
    SELECT_CHANNEL
} from './channels.types';
import firebase from '../../firebase';

const channelsRef = firebase.database().ref('channels');

export const addChannel = channel => ({type: ADD_CHANNEL, channel});
export const selectChannel = channel => ({type: SELECT_CHANNEL, channel});

const fetchChannelsStart = () => ({type: FETCH_CHANNELS_START});
const fetchChannelsSuccess = channels => ({type: FETCH_CHANNELS_SUCCESS, channels});
const fetchChannelsFail = error => ({type: FETCH_CHANNELS_FAIL, error});


export const fetchChannels = () => async dispatch => {
    dispatch(fetchChannelsStart());
    return new Promise(resolve => {
        channelsRef.on('value', snap => {
            const chs = [];
            Object.entries(snap.val()).forEach(([, ch]) => chs.push(ch));
            channelsRef.off('value');
            dispatch(fetchChannelsSuccess(chs));
            resolve();
        });
        //todo:fetchChannelsFail
    });
};

export const channelAddListener = state => async (dispatch, getState) => {
    if (state) {
        channelsRef.on('child_added', snap => {
            const channels = getState().channels.channels;
            const channel = snap.val();
            if (channels.findIndex(ch => ch.id === channel.id) < 0) dispatch(addChannel(channel));
        });
    }
    else channelsRef.off('child_added');
};
