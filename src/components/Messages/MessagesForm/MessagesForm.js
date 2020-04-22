import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import {sendMessage} from '../../../redux/messages/messages.actions';
import {useDispatch, useSelector} from 'react-redux';

const MessagesForm = ({onAddReply, onUploadMedia}) => {
    const isSending = useSelector(state => state.messages.isSending);
    const sendingMessageError = useSelector(state => state.messages.sendingMessageError);
    const [message, setMessage] = React.useState('');
    const dispatch = useDispatch();
    const changeHandler = e => setMessage(e.target.value);
    const sendMessageHandler = () => {
        if (message.trim()) {
            dispatch(sendMessage(message.trim()));
            setMessage('');
        }
    };

    const keyPressHandler = e => {
        if (e.key === 'Enter')
            sendMessageHandler();
    };
    //todo:add some logic for handling error
    return (
        <Segment className='message__form'>
            <Input fluid
                   name='message'
                   style={{marginBottom: '.7em'}}
                   disabled={isSending}
                   label={<Button loading={isSending}
                                  onClick={sendMessageHandler}
                                  icon={isSending ? 'spinner' : 'add'}/>}
                   labelPosition='left'
                   placeholder='Write Your Message'
                   onChange={changeHandler}
                   onKeyPress={keyPressHandler}
                   className={sendingMessageError ? 'error' : ''}
                   value={message}/>

            <Button.Group icon widths={2}>
                <Button color='orange'
                        content='Add reply'
                        labelPosition='left'
                        icon='edit'
                        onClick={onAddReply}/>
                <Button color='teal'
                        content='Upload Media'
                        labelPosition='right'
                        icon='cloud upload'
                        onClick={onUploadMedia}/>
            </Button.Group>
        </Segment>
    );
};

export default MessagesForm;
