import React from 'react';
import {Header, Icon, Segment} from 'semantic-ui-react';

const MessagesHeader = ({channelName, channelUsersCount, isPrivate = false}) => {
    return (
        <Segment clearing>
            <Header floated='left' as='h2' style={{marginBottom: 0}}>
                <span>
                    {
                        isPrivate ?
                            `@${channelName} `
                            :
                            `#${channelName} `
                    }
                    {
                        !isPrivate &&
                        <Icon name='star outline'/>
                    }
                </span>
                <Header.Subheader>
                    {
                        isPrivate ? 'Private' :
                            channelUsersCount !== null ?
                                `${channelUsersCount} User${channelUsersCount > 1 ? 's' : ''}` :
                                <span>
                                <Icon name='spinner' loading size='small'/>
                                 Loading users count
                            </span>
                    }

                </Header.Subheader>
            </Header>
            {/*
             /*
             todo: add some logic for searching messages
             */
                /*
                 <Header floated='right'>
                 <Input size='mini' icon='search' name='searchTerm' placeholder='Search Messages'/>
                 </Header>*/}
        </Segment>
    );
};

export default MessagesHeader;
