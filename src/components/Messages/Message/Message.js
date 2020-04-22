import React from 'react';
import {Comment} from 'semantic-ui-react';
import moment from 'moment';

const timeFromNow = timestamp => moment(timestamp).fromNow();
const Message = ({message, user}) => {
    return (
        <Comment>
            <Comment.Avatar src={message.user.avatar}/>
            <Comment.Content className={message.user.id === user.id ? 'message__self' : ''}>
                <Comment.Author as='a'>{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
                <Comment.Text>{message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
};

export default Message;
