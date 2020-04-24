import React from 'react';
import './App.css';
import {Dimmer, Grid, Header, Icon} from 'semantic-ui-react';
import SidePanel from './SidePanel/SidePanel';
import {useSelector} from 'react-redux';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

function App() {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    return (
        <Grid columns='equal' className='app'>
            <SidePanel/>
            {
                currentChannel ?
                    <>
                        <Grid.Column style={{marginLeft: 252}}>
                            <Messages/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            {
                                !currentChannel.isPrivate && <MetaPanel/>
                            }
                        </Grid.Column>
                    </> :
                    <Grid.Column style={{marginLeft: 252}}>
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
