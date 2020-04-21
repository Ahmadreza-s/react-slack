import React from 'react';
import './App.css';
import {Grid} from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

function App() {
    return (
        <Grid columns='equal' className='app'>
            <ColorPanel/>
            <SidePanel/>
            <Grid.Column style={{marginLeft: 320}}>
                <Messages/>
            </Grid.Column>
            <Grid.Column style={{width: 4}}>
                <MetaPanel/>
            </Grid.Column>
        </Grid>
    );
}

export default App;
