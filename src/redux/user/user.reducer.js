import {SET_USER} from './user.types';

const initialState = {
    currentUser: null,
    loading    : true
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.user,
                loading    : false
            };
        default:
            return state;
    }
};
export default user;
