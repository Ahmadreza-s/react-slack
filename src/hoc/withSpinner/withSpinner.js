import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

const withSpinner = WrappedComponent => ({isLoading, ...props}) => {
    return isLoading ? <Spinner/> : <WrappedComponent {...props}/>;
};

export default withSpinner;