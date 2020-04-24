import React from 'react';
import {Accordion, Header, Icon, Image, List, Segment} from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const MetaPanel = () => {
    const currentChannel = useSelector(state => state.channels.currentChannel);
    const isFetchingMessages = useSelector(state => state.messages.isFetching);
    const messages = useSelector(state => state.messages.messages);

    const [activeIndex, setActiveIndex] = React.useState(-1);
    const setActiveIndexHandler = (event, titleProps) => {
        const {index} = titleProps;
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    const topPosters = [];
    if (!isFetchingMessages && messages) {
        const uniqueUsers = [];
        messages.map(msg => msg.user).forEach(user => {
            if (!uniqueUsers.find(u => u.id === user.id))
                uniqueUsers.push(user);
        });
        uniqueUsers.forEach(user => {
            topPosters.push(({
                ...user,
                messagesCount: messages.filter(msg => msg.user.id === user.id).length
            }));
        });
        topPosters.sort((a, b) => a.messagesCount > b.messagesCount ? -1 : 1);
    }
    return (
        <Segment>
            <Header as='h3' attached='top'>About # {currentChannel.name}</Header>
            <Accordion styled attached='true'>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={setActiveIndexHandler}>
                    <Icon name='dropdown'/>
                    <Icon name='info'/>
                    Channel Details
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    {currentChannel.details}
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={setActiveIndexHandler}>
                    <Icon name='dropdown'/>
                    <Icon name='user circle'/>
                    Top Posters
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    {
                        isFetchingMessages ?
                            <Icon name='spinner' loading/> :
                            <List>
                                {
                                    topPosters.slice(0, 5).map(tp => (
                                        <List.Item key={tp.id}>
                                            <Image avatar src={tp.avatar}/>
                                            <List.Content>
                                                <List.Header as='a'>{tp.name}</List.Header>
                                                <List.Description>{`${tp.messagesCount} post${tp.messagesCount > 1 ? 's' : ''}`}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    ))
                                }
                            </List>
                    }
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={setActiveIndexHandler}>
                    <Icon name='dropdown'/>
                    <Icon name='pencil alternate'/>
                    Created By
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <Header as='h3'>
                        <Image circular src={currentChannel.createdBy.avatar}/>
                        {currentChannel.createdBy.name}
                    </Header>
                </Accordion.Content>
            </Accordion>
        </Segment>
    );
};

export default MetaPanel;
