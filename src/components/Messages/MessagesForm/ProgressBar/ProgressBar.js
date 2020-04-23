import React from 'react';
import {Progress} from 'semantic-ui-react';

const ProgressBar = ({percent}) => {
    return (
        <Progress className='progress__bar'
                  percent={percent}
                  progress='percent'
                  indicating
                  size='medium'
                  color='green'
                  inverted
        />
    );
};

export default ProgressBar;
