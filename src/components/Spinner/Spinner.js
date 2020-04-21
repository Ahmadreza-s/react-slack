import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

const spinner = ({text = 'Preparing Chat ...'}) => {
    return (
        <Dimmer active>
            <Loader size='huge' content={text}/>
        </Dimmer>
    );
};

export default spinner;
