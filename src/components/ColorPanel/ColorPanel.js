import React from 'react';
import {Button, Divider, Menu, Sidebar} from 'semantic-ui-react';

const ColorPanel = () => {
    return (
        <Sidebar as={Menu}
                 icon='labeled'
                 inverted
                 vertical
                 visible
                 width='very thin'>
            <Divider/>
            <Button icon='add' size='small' color='blue'/>
        </Sidebar>
    );
};

export default ColorPanel;
