import React from 'react';
import './SidebarChat.css';
import Avatar from '@material-ui/core/Avatar';
import { useState,useEffect } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';



function SidebarChat({ addNewChat,name,id, firestore,history}) {
    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState('');
    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000));
       if(id){
        firestore.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
       }
    },[id])

    const createChat = () => {
        const roomName = prompt('Please Enter The Room Name ?');
        if(roomName){
            firestore.add({ collection:'rooms' }, { name:roomName })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) :
         (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default firestoreConnect()(SidebarChat);
