import {ADD_CHANNEL, SELECT_CHANNEL} from './channels.types';

export const addChannel = channel => ({type: ADD_CHANNEL, channel});
export const selectChannel = channel => ({type: SELECT_CHANNEL, channel});
