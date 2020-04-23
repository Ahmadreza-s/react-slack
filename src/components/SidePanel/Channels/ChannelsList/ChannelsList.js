import React from 'react';
import {Icon, Menu} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const ChannelsList = ({onSelect, onOpenModal}) => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const channels = useSelector(state => state.channels.channels);

    const selectChannel = channel => {
        if (!currentChannel || channel.id !== currentChannel.id)
            onSelect(channel);
    };

    return (
        <>
            <Menu.Menu style={{paddingBottom: '2em', paddingTop: '1.2em'}}>
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
