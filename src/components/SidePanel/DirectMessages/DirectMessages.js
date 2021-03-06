import React from 'react';
import {Icon, Label, Menu} from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, userAddListener, userStatusChangeListener} from '../../../redux/user/user.actions';
import Spinner from '../../Spinner/Spinner';
import {selectChannel} from '../../../redux/channels/channels.actions';
import {newMessagesListener} from '../../../redux/messages/messages.actions';

const DirectMessages = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const isUsersFetching = useSelector(state => state.user.isUsersFetching);
    const notifications = useSelector(state => state.messages.notifications);
    const users = useSelector(state => state.user.users.sort((a, b) => a.status === 'online' ? -1 : 1));
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchUsers())
            .then(userss => {
                userss.forEach(user => dispatch(newMessagesListener(true, true, getChannelId(user.id))));
                dispatch(userAddListener(true));
                dispatch(userStatusChangeListener(true));
            });
        return () => {
            dispatch(newMessagesListener(false, true));
            dispatch(userStatusChangeListener(false));
            dispatch(userAddListener(false));
        };
    }, [dispatch]);

    const getNotificationsCount = channelId => notifications.filter(notification => notification.channelId === channelId).length;

    const getChannelId = userId => userId < currentUser.id ? `${userId}/${currentUser.id}` : `${currentUser.id}/${userId}`;

    const userClickHandler = user => {
        const channelId = getChannelId(user.id);
        const channelData = {
            name     : user.name,
            id       : channelId,
            isPrivate: true
        };
        dispatch(selectChannel(channelData));
    };

    const isUserActiveChannel = userId => {
        if (currentChannel) {
            const currentChannelId = currentChannel.id.split('/');
            return currentChannelId.length === 2 && (currentChannelId[0] === userId || currentChannelId[1] === userId);
        }
        return false;
    };

    return (
        <>
            {
                isUsersFetching ? <Spinner page text={'Loading Some Data ...'}/>
                    :
                    <Menu.Menu className='menu'>
                        <Menu.Item>
                <span>
                    <Icon name='mail'/> DIRECT MESSAGES
                </span>{` (${users.length})`}
                        </Menu.Item>
                        {
                            users.map(user => (
                                <Menu.Item key={user.id}
                                           style={{opacity: .7, fontStyle: 'italic'}}
                                           onClick={() => userClickHandler(user)}
                                           active={isUserActiveChannel(user.id)}>
                                    {`@ ${user.name}`}
                                    <Icon name='circle' color={user.status === 'online' ? 'green' : 'red'}/>
                                    {
                                        getNotificationsCount(getChannelId(user.id)) > 0 ?
                                            <Label color='red'>
                                                {getNotificationsCount(getChannelId(user.id))}
                                            </Label> : null
                                    }
                                </Menu.Item>
                            ))
                        }
                    </Menu.Menu>
            }
        </>
    );
};

export default DirectMessages;
