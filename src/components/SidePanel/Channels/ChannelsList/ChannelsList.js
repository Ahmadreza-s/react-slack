import React from 'react';
import {Icon, Label, Menu} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const ChannelsList = ({onSelect, onOpenModal}) => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const channels = useSelector(state => state.channels.channels);
    const notifications = useSelector(state => state.messages.notifications);

    const selectChannel = channel => {
        if (!currentChannel || channel.id !== currentChannel.id)
            onSelect(channel);
    };

    const getNotificationsCount = channelId => notifications.filter(notification => notification.channelId === channelId).length;

    return (
        <>
            <Menu.Menu className='menu' style={{paddingTop: '1.2em'}}>
                <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span> {' '}
                    {` (${channels.length})`} <Icon name='add' onClick={onOpenModal}/>
                </Menu.Item>
                {

                    channels.length > 0 ? channels.map(ch => (
                            <Menu.Item key={ch.id}
                                       name={ch.name}
                                       style={{opacity: .7, cursor: 'pointer'}}
                                       onClick={() => selectChannel(ch)}
                                       active={ch.id === currentChannel?.id}>
                                {
                                    getNotificationsCount(ch.id) > 0 ?
                                        <Label color='red'>
                                            {getNotificationsCount(ch.id)}
                                        </Label> : null
                                }
                                # {ch.name}
                            </Menu.Item>
                        ))
                        : null
                }
            </Menu.Menu>

        </>
    );
};

export default ChannelsList;
