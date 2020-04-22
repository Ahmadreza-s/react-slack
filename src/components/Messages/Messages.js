import React from 'react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import {Comment, Segment} from 'semantic-ui-react';
import MessagesForm from './MessagesForm/MessagesForm';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessages} from '../../redux/messages/messages.actions';

const Messages = () => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchMessages(currentChannel.id));
    }, [currentChannel, dispatch]);
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
