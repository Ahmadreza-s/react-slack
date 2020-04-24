import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import {sendMessage} from '../../../redux/messages/messages.actions';
import {useDispatch, useSelector} from 'react-redux';
import FileModal from './FileModal/FileModal';
import {emojiIndex, Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const MessagesForm = () => {
    const isSending = useSelector(state => state.messages.isSending);
    const sendingMessageError = useSelector(state => state.messages.sendingMessageError);
    const isUploadingDone = useSelector(state => state.messages.isUploadingDone);

    const [message, setMessage] = React.useState('');
    const [modalState, setModalState] = React.useState(false);
    const [emojiPicker, setEmojiPicker] = React.useState(false);

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

    const selectEmojiHandler = emoji => {
        let newMessage = message ? colonToUnicode(`${message} ${emoji.colons}`) : colonToUnicode(emoji.colons);
        setEmojiPicker(false);
        setMessage(newMessage);
    };
    const colonToUnicode = message => {
        return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
            x = x.replace(/:/g, '');
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== 'undefined') {
                let unicode = emoji.native;
                if (typeof unicode !== 'undefined') {
                    return unicode;
                }
            }
            x = ':' + x + ':';
            return x;
        });
    };

    const moveCaretAtEnd = e => {
        let temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    };

    return (
        <Segment className='message__form'>
            {
                emojiPicker ? (
                    <Picker set='apple'
                            onSelect={selectEmojiHandler}
                            className='emojipicker'
                            title='Pick your emoji'
                            emoji='point_up'/>
                ) : null
            }
            <Input fluid
                   name='message'
                   style={{marginBottom: '.7em'}}
                   disabled={isSending}
                   label={<Button onClick={() => setEmojiPicker(true)}
                                  icon={emojiPicker ? 'close' : 'add'}
                                  content={emojiPicker ? 'Close' : null}/>}
                   autoFocus
                   onFocus={moveCaretAtEnd}
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
