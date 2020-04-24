import React from 'react';
import {Button, Icon, Input, Modal} from 'semantic-ui-react';
import mime from 'mime-types';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {uploadMedia} from '../../../../redux/messages/messages.actions';
import ProgressBar from '../ProgressBar/ProgressBar';

const FileModal = ({open, onClose}) => {
    const dispatch = useDispatch();
    const isUploading = useSelector(state => state.messages.isUploading);
    const uploadPercent = useSelector(state => state.messages.uploadPercent);
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const [file, setFile] = React.useState();
    const onFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };
    const sendFile = () => {
        if (file && ['image/jpeg', 'image/png'].includes(mime.lookup(file.name))) {
            const metadata = {contentType: mime.lookup(file.name)};
            let filePath;
            if (currentChannel.isPrivate)
                filePath = `chat/private-${currentChannel.id}`;
            else
                filePath = `chat/public/${uuidv4()}.jpg`;
            dispatch(uploadMedia(file, filePath, metadata));
        }
    };

    const closeModal = () => {
        if (!isUploading)
            onClose();
    };
    return (
        <Modal basic open={open} onClose={closeModal}>
            <Modal.Header>
                {
                    isUploading ? 'Uploading File ...' : 'Select an Image File'
                }
            </Modal.Header>
            <Modal.Content>
                {
                    isUploading
                        ?
                        <ProgressBar percent={uploadPercent}/>
                        :
                        <Input fluid
                               label='File types: jpg, png'
                               name='file'
                               type='file'
                               onChange={onFileChange}/>
                }
            </Modal.Content>
            <Modal.Actions>
                <Button color='green'
                        inverted
                        positive
                        onClick={sendFile}
                        disabled={isUploading}
                        loading={isUploading}>
                    <Icon name='checkmark'/> Send
                </Button>
                <Button color='red'
                        inverted
                        negative
                        onClick={closeModal}
                        disabled={isUploading}>
                    <Icon name='remove'/> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default FileModal;
