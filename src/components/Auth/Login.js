import React from 'react';
import firebase from '../../firebase';
import {Button, Form, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const initialState = {
    email   : '',
    password: '',
    errors  : [],
    loading : false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'START_LOGIN':
            return {
                ...state,
                loading: true,
                errors : []
            };
        case 'ERROR_LOGIN':
            return {
                ...state,
                loading: false,
                errors : state.errors.concat(action.errors)
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
        default:
            return state;
    }
};

const Login = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const isFormValid = () => {
        if (isFormEmpty()) {
            dispatch({type: 'SET_ERRORS', errors: [{message: 'Fill in all fields.'}]});
            return false;
        }
        else {
            return true;
        }
    };
    const displayErrors = () => state.errors.map((err, i) => <p key={i}>{err.message}</p>);

    const isFormEmpty = () => !state.email || !state.password;

    const handleSubmit = e => {
        e.preventDefault();
        const {email, password} = state;
        if (isFormValid()) {
            dispatch({type: 'START_LOGIN'});
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(e => dispatch({type: 'ERROR_LOGIN', errors: e}));
        }
    };
    const handleChange = e => {
        dispatch({type: 'SET_USER_INPUT', key: [e.target.name], value: e.target.value});
    };

    return (
        <Grid textAlign='center'
              className='app'
              verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h1'
                        color='violet'
                        textAlign='center'
                        icon>
                    <Icon name='code branch'
                          color='violet'/>
                    Login to Changiz Chat
                </Header>
                <Form size='large'
                      onSubmit={handleSubmit}>
                    <Segment stacked>

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

                        <Button fluid
                                disabled={state.loading}
                                className={state.loading ? 'loading' : ''}
                                color='violet'
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
                <Message>Don't have an account <Link to='/register'>Register</Link></Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;
