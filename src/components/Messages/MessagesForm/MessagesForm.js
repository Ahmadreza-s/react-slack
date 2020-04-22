import React from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';

const MessagesForm = () => {
    return (
        <Segment className='message__form'>
            <Input fluid
                   name='message'
                   style={{marginBottom: '.7em'}}
                   label={<Button icon='add'/>}
                   labelPosition='left'
                   placeholder='Write Your Message'/>

            <Button.Group icon widths={2}>
                <Button color='orange'
                        content='Add reply'
                        labelPosition='left'
                        icon='edit'/>
                <Button color='teal'
                        content='Upload Media'
                        labelPosition='right'
                        icon='cloud upload'/>
            </Button.Group>
        </Segment>
    );
};

export default MessagesForm;
