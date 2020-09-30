import React from 'react';
import { Avatar, IconButton }  from '@material-ui/core';
import DounutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


function Sidebar(props) {

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={props.user?.photoURL} />
                <div className="sidebar__right">
                    <IconButton>
                    <DounutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input  type="text" placeholder="Search or start new chat..."/>
            </div>
            </div>
            <div className="sidebar__chat">
            <SidebarChat addNewChat />
            {props.rooms && props.rooms.map(room => (
                <SidebarChat key={room.id} id={room.id} name={room.name} />
            ))}
            </div>
        </div>
    )
}

export default compose(firestoreConnect([{ collection:'rooms' }]),
    connect((state,props) =>({
        rooms:state.firestore.ordered.rooms,
        user:state.auth.user
    }))
)(Sidebar);
