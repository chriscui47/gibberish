import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Room = ({ location }) => {
    
    const [users, setUsers] = useState('');
    
  const ENDPOINT = 'http://gibb47.herokuapp.com/';



  const initState = {servers:[
    {
      messages:[
      { from: "bitch", msg: "hi" },
      { from: "use2", msg: "hello" },
      { from: "use3", msg: "I’d like you to…" }]
    ,
    scores:
      [
      ]
    ,
    deck:0,
    roundEnd:false,
    word:{question: 'firstword', answer:'bye',hint:'aa'},
    time:10
  
  
  
    }
  ,  


  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div>
    </div>
  );
}

export default Chat;
