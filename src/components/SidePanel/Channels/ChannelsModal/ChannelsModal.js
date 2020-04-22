import React from 'react';
import {Button, Form, Icon, Input, Modal} from 'semantic-ui-react';

const channelsModal = ({open, onClose, onSubmit, onChange, loading}) => {
    return (
        <Modal basic
               open={open}
               onClose={onClose}>
            <Modal.Header>
                Add a Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Form.Field>
                        <Input fluid
                               label='Name of Channel'
                               name='name'
                               onChange={onChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input fluid
                               label='About the Channel'
                               name='details'
                               onChange={onChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green'
                        inverted
                        positive
                        loading={loading}
                        disabled={loading}
                        onClick={onSubmit}>
                    <Icon name='checkmark'/> Add
                </Button>

                <Button color='red'
                        inverted
                        onClick={onClose}
                        negative
                        disabled={loading}>
                    <Icon name='remove'/> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default channelsModal;
/*export default React.memo(channelsModal, (prevProps, nextProps) =>
 (prevProps.loading === nextProps.loading) && prevProps.open === nextProps.open);*/
