import React from 'react';
import {Icon, Menu} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import Spinner from '../../../Spinner/Spinner';

const ChannelsList = ({onSelect, loading, onOpenModal}) => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const channels = useSelector(state => state.channels.channels);
    React.useEffect(() => {
        console.log(currentChannel, channels);
        if (currentChannel === null && channels.length !== 0)
            onSelect(channels[0]);
    }, [channels]);

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
                                       onClick={() => onSelect(ch)}
                                       active={ch.id === currentChannel?.id}>
                                # {ch.name}
                            </Menu.Item>
                        ))
                        : loading ? <Spinner text='Loading Channels...'/> : null
                }
            </Menu.Menu>

        </>
    );
};

export default React.memo(ChannelsList, (prevProps, nextProps) => prevProps.loading !== nextProps.loading);
