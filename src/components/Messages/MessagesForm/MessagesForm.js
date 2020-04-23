import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import {sendMessage} from '../../../redux/messages/messages.actions';
import {useDispatch, useSelector} from 'react-redux';
import FileModal from './FileModal/FileModal';

const MessagesForm = () => {
    const isSending = useSelector(state => state.messages.isSending);
    const sendingMessageError = useSelector(state => state.messages.sendingMessageError);
    const isUploading = useSelector(state => state.messages.isUploading);
    const isUploadingDone = useSelector(state => state.messages.isUploadingDone);
    const uploadPercent = useSelector(state => state.messages.uploadPercent);
    const uploadError = useSelector(state => state.messages.uploadError);

    const [message, setMessage] = React.useState('');
    const [modalState, setModalState] = React.useState(false);
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

    if (isUploadingDone && modalState)
        setModalState(false);

    return (
        <Segment className='message__form'>
            <Input fluid
                   name='message'
                   style={{marginBottom: '.7em'}}
                   disabled={isSending}
                   label={<Button icon='add'/>}
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
                        loading={isSending}
                        icon={isSending ? 'spinner' : 'edit'}
                        onClick={sendMessageHandler}/>
                <Button color='teal'
                        content='Upload Media'
                        labelPosition='right'
                        icon='cloud upload'
                        onClick={() => setModalState(true)}/>
            </Button.Group>
            <FileModal open={modalState}
                       onClose={() => setModalState(false)}/>
        </Segment>
    );
};

export default MessagesForm;
