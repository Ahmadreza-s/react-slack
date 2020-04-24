import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import {sendMessage} from '../../../redux/messages/messages.actions';
import {useDispatch, useSelector} from 'react-redux';
import FileModal from './FileModal/FileModal';

const MessagesForm = () => {
    const isSending = useSelector(state => state.messages.isSending);
    const sendingMessageError = useSelector(state => state.messages.sendingMessageError);
    const isUploadingDone = useSelector(state => state.messages.isUploadingDone);

    const [message, setMessage] = React.useState('');
    const [modalState, setModalState] = React.useState(false);

    const inputRef = React.useRef(null);

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

    React.useEffect(() => {
        if (isUploadingDone && modalState)
            setModalState(false);
    }, [isUploadingDone, modalState]);

    React.useEffect(() => inputRef.current.focus());

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
                   ref={inputRef}
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
