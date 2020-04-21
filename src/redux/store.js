import {createStore} from 'redux';
import rootReducer from './root.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools());
