import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './components/Auth/Login';

import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './redux/store';
import {setUser} from './redux/user/user.actions';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import Spinner from './components/Spinner/Spinner';


const Root = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user)
                dispatch(setUser({
                    displayName: user.displayName,
                    avatar     : user.photoURL,
                    email      : user.email,
                    id         : user.uid
                }));
            else
                dispatch(setUser(null));
        });
    }, []);

    return (
        loading ? <Spinner/> :
            <Switch>
                <Route exact path='/'>
                    <App/>
                </Route>
                {
                    !currentUser &&
                    <Route path='/login'>
                        <Login/>
                    </Route>}

                {
                    !currentUser &&
                    <Route path='/register'>
                        <Register/>
                    </Route>
                }
                {
                    currentUser &&
                    <Route path='/logout'>
                        <Logout/>
                    </Route>
                }
                <Redirect to={'/'}/>
            </Switch>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Root/>
        </Router>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
