import React from 'react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import {Comment, Segment} from 'semantic-ui-react';
import MessagesForm from './MessagesForm/MessagesForm';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessages, newMessagesListener} from '../../redux/messages/messages.actions';
import Spinner from '../Spinner/Spinner';
import Message from './Message/Message';

const Messages = () => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const currentUser = useSelector(state => state.user.currentUser);
    const isFetching = useSelector(state => state.messages.isFetching);
    const fetchingError = useSelector(state => state.messages.fetchingMessagesError);
    const messages = useSelector(state => state.messages.messages);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchMessages(currentChannel.id))
            .then(() => dispatch(newMessagesListener(true, currentChannel.id)));
        return () => dispatch(newMessagesListener(false, currentChannel.id));
    }, [currentChannel, dispatch]);
    return (
        <>
            <MessagesHeader/>

            <Segment>
                <Comment.Group className='messages'>
                    {
                        isFetching ? <Spinner text={'Loading Messages ...'}/> :
                            messages.length > 0 ? messages.map(msg => <Message key={msg.id}
                                                                               user={currentUser}
                                                                               message={msg}/>) :
                                <h2>There is no messages!</h2>
                    }
                </Comment.Group>
            </Segment>

            <MessagesForm/>
        </>
    );
};

export default Messages;
