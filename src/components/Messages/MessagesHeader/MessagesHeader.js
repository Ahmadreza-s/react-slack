import React from 'react';
import {Header, Icon, Input, Segment} from 'semantic-ui-react';

const MessagesHeader = () => {
    return (
        <Segment clearing>
            <Header fluid floated='left' as='h2' style={{marginBottom: 0}}>
                <span>
                    Channel
                    <Icon name='star outline'/>
                </span>
                <Header.Subheader>
                    2 Users
                </Header.Subheader>
            </Header>
            <Header floated='right'>
                <Input size='mini' icon='search' name='searchTerm' placeholder='Search Messages'/>
            </Header>
        </Segment>
    );
};

export default MessagesHeader;
