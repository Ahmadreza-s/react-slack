import React from 'react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import {Comment, Segment} from 'semantic-ui-react';
import MessagesForm from './MessagesForm/MessagesForm';

const Messages = () => {
    return (
        <>
            <MessagesHeader/>

            <Segment>
                <Comment.Group className='messages'>
                    {/*Messages List*/}
                </Comment.Group>
            </Segment>

            <MessagesForm/>
        </>
    );
};

export default Messages;
