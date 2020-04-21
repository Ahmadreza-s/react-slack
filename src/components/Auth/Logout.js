import React from 'react';
import firebase from '../../firebase';
import Spinner from '../Spinner/Spinner';

const Logout = () => {
    React.useEffect(() => {
        const logout = async () => await firebase.auth().signOut();
        logout();
    }, []);

    return <Spinner text={'Logging out ...'}/>;
};

export default Logout;
