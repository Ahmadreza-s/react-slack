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

    React.useEffect(() => {
        goToBottom();
    }, [messages]);

    const goToBottom = () => {
        const scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
        const chatList = document.getElementById('chat_list') || null;
        if (chatList)
            chatList.scrollTop = chatList.scrollHeight - chatList.clientHeight;
    };

    const channelUsersCount = () => {
        if (isFetching)
            return null;
        return new Set(messages.map(msg => msg.user).map(user => user.id)).size;
    };
    return (
        <>
            <MessagesHeader channelName={currentChannel.name}
                            channelUsersCount={channelUsersCount()}
                            isPrivate={currentChannel.isPrivate}/>

            <Segment>
                <Comment.Group id='chat_list' className='messages'>
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
