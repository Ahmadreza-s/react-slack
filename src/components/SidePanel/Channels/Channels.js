import React from 'react';
import firebase from '../../../firebase';
import {useDispatch, useSelector} from 'react-redux';
import {channelAddListener, fetchChannels, selectChannel} from '../../../redux/channels/channels.actions';
import ChannelsList from './ChannelsList/ChannelsList';
import ChannelsModal from './ChannelsModal/ChannelsModal';
import Spinner from '../../Spinner/Spinner';

const channelsRef = firebase.database().ref('channels');

const Channels = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const channelsLoading = useSelector(state => state.channels.isLoading);
    const dispatch = useDispatch();
    const [modalState, setModalState] = React.useState(false);
    const [channel, setChannel] = React.useState({name: '', details: ''});


    const [submitNewChannelLoading, setSubmitNewChannelLoading] = React.useState(true);

    React.useEffect(() => {
        dispatch(fetchChannels());
        dispatch(channelAddListener(true));
        return () => dispatch(channelAddListener(false));
    }, []);

    const handleChange = e => {
        const channelInput = {
            [e.target.name]: e.target.value
        };
        setChannel(prevState => ({
            ...prevState,
            ...channelInput
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (channel.name.trim() && channel.details.trim()) {
            setSubmitNewChannelLoading(true);
            const key = channelsRef.push().key;
            const data = {
                id       : key,
                name     : channel.name.trim(),
                details  : channel.details.trim(),
                createdBy: {
                    name  : currentUser.displayName,
                    avatar: currentUser.avatar,
                    id    : currentUser.id
                }
            };
            channelsRef
                .child(key)
                .update(data)
                .then(() => {
                    setChannel({name: '', details: ''});
                    closeModal();
                }).catch(e => console.log(e))
                .finally(() => setSubmitNewChannelLoading(false));
        }
    };

    const closeModal = () => setModalState(false);

    const openModal = () => setModalState(true);

    const changeChannel = channel => dispatch(selectChannel(channel));

    return (
        <>
            {
                channelsLoading ? <Spinner page text={'Channels is Loading ...'}/> :
                    <>
                        <ChannelsList onSelect={changeChannel} onOpenModal={openModal}/>

                        <ChannelsModal onSubmit={handleSubmit}
                                       loading={submitNewChannelLoading}
                                       onChange={handleChange}
                                       onClose={closeModal}
                                       open={modalState}/>

                    </>
            }
        </>

    );
};

export default Channels;
