import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

const spinner = ({text = 'Preparing Chat ...', page = false}) => {
    return (
        <Dimmer active page={page}>
            <Loader size='huge' content={text}/>
        </Dimmer>
    );
};

export default spinner;
