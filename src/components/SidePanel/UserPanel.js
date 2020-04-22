import React from 'react';
import {Dropdown, Grid, Header, Icon, Image} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const UserPanel = () => {
    const history = useHistory();
    const user = useSelector(state => state.user.currentUser);
    const dropdownOptions = [
        {
            key     : 'user',
            text    : <span>Signed in as <strong>{user && user.displayName}</strong></span>,
            disabled: true
        },
        {
            key : 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key : 'signout',
            text: <span onClick={() => history.push('/logout')}>Sign Out</span>
        }
    ];
    return (
        <Grid style={{background: '#4c3c4c'}}>
            <Grid.Column>
                <Grid.Row style={{padding: '1.2em', margin: 0}}>
                    {/*App Header*/}
                    <Header inverted floated='left' as='h2'>
                        <Icon name='code'/>
                        <Header.Content>DevChat</Header.Content>
                    </Header>
                </Grid.Row>

                {/*User Dropdown*/}
                <Header style={{padding: '.25em'}} as='h4' inverted>
                    <Dropdown trigger={
                        <span>
                            <Image src={user.avatar} spaced='right' avatar/>
                            {user.displayName}
                        </span>
                    } options={dropdownOptions}/>
                </Header>
            </Grid.Column>
        </Grid>
    );
};

export default UserPanel;
