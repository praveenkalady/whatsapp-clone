import React,{ useRef } from 'react';
import { useState,useEffect } from 'react';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertImoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


function Chat(props) {
    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const messageEnd = useRef();
    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000))
        scrollToBottom();
    },[props.match.params.roomId])
    const handleMessage = (e) => {
        e.preventDefault();
        const { firestore,user } = props;
        const { roomId } = props.match.params;
        firestore.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firestore.FieldValue.serverTimestamp()
        });
        scrollToBottom();
        setInput('');
    }
    const { user,messages }= props;
    const scrollToBottom = () => {
        messageEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat__headerInfo">
                <h3>{ props.room && props.room.name }</h3>
                <p>Last Seen at{' '}{messages && new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat__body">
                {props.messages && props.messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciever' }`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                <div style={{ float:"left", clear: "both" }} ref={messageEnd}>
                </div>
            </div>
            <div className="chat__footer">
                <InsertImoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <IconButton type="submit" onClick={handleMessage}><SendIcon/></IconButton>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default compose(
    firestoreConnect(props => [
        { collection:'rooms', storeAs:'room', doc:props.match.params.roomId },
        { collection:`rooms/${props.match.params.roomId}/messages`, storeAs:'messages', orderBy:['timestamp','asc'] }
    ]),
    connect(({ auth,firestore:{ ordered } }, props) =>({
        room:ordered.room && ordered.room[0],
        messages:ordered.messages,
        user:auth.user
    }))
)(Chat);
