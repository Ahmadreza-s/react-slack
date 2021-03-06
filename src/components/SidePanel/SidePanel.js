import React from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';
import DirectMessages from './DirectMessages/DirectMessages';

const SidePanel = () => {
    return (
        <Menu size='large'
              inverted
              fixed='left'
              vertical
              style={{backgroundColor: '#4c3c4c', fontSize: '1.2rem'}}>

            <UserPanel/>
            <Channels/>
            <DirectMessages/>
        </Menu>
    );
};

export default SidePanel;
