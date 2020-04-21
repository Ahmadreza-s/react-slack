import React from 'react';
import {Button, Form, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const initialState = {
    username            : '',
    email               : '',
    password            : '',
    passwordConfirmation: '',
    errors              : [],
    loading             : false,
    usersRef            : firebase.database().ref('users')
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'START_REGISTER':
            return {
                ...state,
                loading: true,
                errors : []
            };
        case 'ERROR_REGISTER':
            return {
                ...state,
                loading: false,
                errors : state.errors.concat(action.errors)
            };
        case 'SUCCESS_REGISTER':
            return {
                ...state,
                loading: false
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: state.errors.concat(action.errors)
            };
        case 'SET_USER_INPUT':
            return {
                ...state,
                [action.key]: action.value
            };
    }
};

const Register = () => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const isFormValid = () => {
        if (isFormEmpty()) {
            dispatch({type: 'SET_ERRORS', errors: [{message: 'Fill in all fields.'}]});
            return false;
        }
        else if (!isPasswordValid()) {
            dispatch({type: 'SET_ERRORS', errors: [{message: 'Password is invalid.'}]});
            return false;
        }
        else {
            return true;
        }
    };
    const displayErrors = () => state.errors.map((err, i) => <p key={i}>{err.message}</p>);

    const isPasswordValid = () => state.password.length < 6 || state.passwordConfirmation.length < 6 ? false : state.password !== state.passwordConfirmation ? false : true;

    const isFormEmpty = () => !state.username || !state.email || !state.password || !state.passwordConfirmation;

    const handleSubmit = e => {
        e.preventDefault();
        const {username, email, password} = state;
        if (isFormValid()) {
            dispatch({type: 'START_REGISTER'});
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(u => {
                    u.user.updateProfile({
                        displayName: username,
                        photoURL   : `http://gravatar.com/avatar/${md5(u.user.email)}?d=identicon`
                    })
                        .then(() => {

                            saveUser(u)
                                .then(() => dispatch({type: 'SUCCESS_REGISTER'}))
                                .catch(e => dispatch({type: 'ERROR_REGISTER', errors: e}));

                        })
                        .catch(e => dispatch({type: 'ERROR_REGISTER', errors: e}));
                    console.log('userForm created', u);
                })
                .catch(e => dispatch({type: 'ERROR_REGISTER', errors: e}));
        }
    };
    const handleChange = e => {
        dispatch({type: 'SET_USER_INPUT', key: [e.target.name], value: e.target.value});
    };

    const saveUser = user => {
        return state.usersRef.child(user.user.uid).set({
            name  : user.user.displayName,
            avatar: user.user.photoURL
        });
    };

    return (
        <Grid textAlign='center'
              className='app'
              verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h1'
                        color='orange'
                        textAlign='center'
                        icon>
                    <Icon name='puzzle piece'
                          color='orange'/>
                    Register for DevChat
                </Header>
                <Form size='large'
                      onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid
                                    name='username'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    type='text'
                                    value={state.username}
                                    onChange={handleChange}/>


                        <Form.Input fluid
                                    name='email'
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-Mail'
                                    type='email'
                                    value={state.email}
                                    className={state.errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''}
                                    onChange={handleChange}/>

                        <Form.Input fluid
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={state.password}
                                    className={state.errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                                    onChange={handleChange}/>


                        <Form.Input fluid
                                    name='passwordConfirmation'
                                    icon='repeat'
                                    iconPosition='left'
                                    placeholder='Password Confirmation'
                                    type='password'
                                    value={state.passwordConfirmation}
                                    className={state.errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                                    onChange={handleChange}/>

                        <Button fluid
                                disabled={state.loading}
                                className={state.loading ? 'loading' : ''}
                                color='orange'
                                size='large'>
                            Submit
                        </Button>
                    </Segment>
                </Form>
                {
                    state.errors.length > 0 ?
                        <Message error>
                            <h3>Error</h3>
                            {
                                displayErrors()
                            }
                        </Message>
                        : null
                }
                <Message>Already a user? <Link to='/login'>Login</Link></Message>
            </Grid.Column>
        </Grid>
    );
};

export default Register;
