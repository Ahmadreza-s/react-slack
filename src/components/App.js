import React from 'react';
import './App.css';
import {Dimmer, Grid, Header, Icon} from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import {useSelector} from 'react-redux';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

function App() {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    return (
        <Grid columns='equal' className='app'>
            <ColorPanel/>
            <SidePanel/>
            {
                currentChannel ?
                    <>
                        <Grid.Column style={{marginLeft: 320}}>
                            <Messages/>
                        </Grid.Column>
                        <Grid.Column style={{width: 4}}>
                            <MetaPanel/>
                        </Grid.Column>
                    </> :
                    <Grid.Column style={{marginLeft: 312}}>
                        <Dimmer active>
                            <Header as='h2' icon inverted>
                                <Icon name='chat'/>
                                Please select a chat!
                            </Header>
                        </Dimmer>
                    </Grid.Column>
            }
        </Grid>
    );
}

export default App;
