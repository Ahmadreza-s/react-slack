import React from 'react';
import firebase from '../../../firebase';
import {useDispatch, useSelector} from 'react-redux';
import ChannelsList from './ChannelsList/ChannelsList';
import ChannelsModal from './ChannelsModal/ChannelsModal';
import {addChannel, selectChannel} from '../../../redux/channels/channels.actions';

const channelsRef = firebase.database().ref('channels');

const Channels = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [modalState, setModalState] = React.useState(false);
    const [channel, setChannel] = React.useState({name: '', details: ''});

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        addListeners();
        return () => channelsRef.off();
    }, []);

    const addListeners = () => {
        channelsRef.on('child_added', snap => {
            dispatch(addChannel(snap.val()));
            setLoading(false);
        });
    };
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
            setLoading(true);

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
                }).catch(e => {
                console.log(e);
            });
        }
    };

    const closeModal = () => {
        if (!loading)
            setModalState(false);
    };

    const openModal = () => setModalState(true);

    const changeChannel = channel => dispatch(selectChannel(channel));

    return (
        <>
            <ChannelsList onSelect={changeChannel} loading={loading} onOpenModal={openModal}/>

            <ChannelsModal onSubmit={handleSubmit}
                           loading={loading}
                           onChange={handleChange}
                           onClose={closeModal}
                           open={modalState}/>

        </>
    );
};

export default Channels;
