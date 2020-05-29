import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Scoreboard from '../Scoreboard/Scoreboard';
import Chatwindow from '../Chatwindow/Chatwindow';
import Toolbarapp from '../Toolbar/Toolbarapp';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TransverseLoading	 } from 'react-loadingg';
import './Chat.css';
import Questionwindow from "../Questionwindow/Questionwindow";
import { Redirect } from 'react-router';

let socket;
const useStyles=makeStyles(theme=> ({
  root: {
    margin: '50px',
    padding: theme.spacing(3,2),
  },
  flex:{
    display: 'flex',
  //  marginLeft: '5%',
    width:'100%',
    marginTop:'5%',
justifyContent:'space-evenly',


  },
  scoreWindow:{
    width: '15%',
    height: '70vh',
    border:'0.1vw solid grey',
    borderRadius:'1vw',
    backgroundColor: 'white',
    marginLeft:'5vw'


  },
  chatWindow:{
    width: '30%',
    height: '70vh',
    
    border:'0.1vw solid grey',
    borderRadius:'1vw',
    backgroundColor:'white'

  },
  chatBox:{
    width:'60%',
    height: '40vh',

  },
  
heading: {
  color: 'white',
  fontSize: '2.5rem',
  paddingBottom: '10px',
  borderBottom: '2px solid white'
},
toolbar:{

  background: 'black',
  color: 'white',
}
,  questionWindow:{
    width: '20%',
    height: '20vh',

  
  },
  button:{
    width: '15%'
  }
}));
const Chat = ({ location }) => {

  
  const [deck,setDeck]=useState(0);
  const [gameLength,setGameLength]=useState(30);
  const [name, setName] = useState('');
  const [host, setHost] = useState(0);
  const [error, setError] = useState(false);

const [mm,setMM]=useState(false);
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [winner,setWinner]=useState(false);
  const [game,setGame]=useState({
      users:[],
      time:30,
      roundEnd:0,
      roundAmount:10,
      deck:'',
      word:{question:'',answer: '',hint:''},
      roomname: ''
    
  });
  const classes=useStyles();

  const ENDPOINT = 'https://gibb47.herokuapp.com/';

  useEffect(() => {
    var {name,room,type,host } = queryString.parse(location.search);
  socket = io((ENDPOINT));
    room=room.toUpperCase();
    setName(name);
    setRoom(room);
    console.log(room);
    
    setHost(parseInt(host));
    socket.emit('join', { name, room }, (error) => {
      if(error){
          alert(error);
          console.log(error.length);
          setError(true);
      }

    });
    if(type==="mm"){
        setMM(true);
        socket.emit('joinMM', { name }, (error) => {
            
        });
    }



  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      message.text=message.text.trim();
      setMessages(messages => [ ...messages,message
      ]);
      console.log(JSON.stringify(message));
      
    });
    
    socket.on("roomData", ({ room,users,game }) => {
      setUsers(users);
      setGame(game);
      setRoom(room);
    });
    socket.on("winner", (msg) => {
      setWinner(1);

    });

    socket.on("restart", (msg) => {
      setWinner(0);

    });
    
    socket.on("matchFound", (msg) => {
      setMM(false);

    });

}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message,room,game.roundEnd,name, () => setMessage(''));
    }
  }

  return (
    
<div style={{width:'100%',minHeight:'100vh'}}>
  {error&&<Redirect to={`/`} />}
      <Toolbarapp name={name}></Toolbarapp>
{game.roundEnd==-1 &&
     <Alert severity="info" style={{marginTop:'2vh'}}>  <center> <AlertTitle>
                              Waiting for players to join before starting!</AlertTitle></center>
                              The host will press start when ready.</Alert>

  
}

{!!mm&& <div style={{
  position: 'fixed',
  marginLeft: '40vw'}}><TransverseLoading size="large" 	/>
  
  <h2 style={{marginRight: '15vw'}}>Finding Game</h2>
  </div>


}

    <div style={{backgroundColor: '#F4F4F4', width: '100vw',height: '100vh',display:'flex'}}>
        <div className={classes.flex}>
          <div className={classes.scoreWindow}>
     <span style={{display: 'flex',alignItems:'center',justifyContent:'space evenly',marginTop:'1vh',border:"2px solid #EDF7ED",borderRadius:'1vw'}}>   <span style={{width:'100%'}}> <Alert severity="success"><span style={{marginRight:'1vw'}}> Room Code: </span>  <span style={{alignSelf:'flex-end'}}><Chip label={room} variant="outlined"   color="primary" className={classes.chip}/></span></Alert></span></span>
          <Scoreboard users={users}/>



          </div>

          <div className={classes.questionWindow}>

        <center> <strong><span style={{fontSize:'2vh',marginRight:'0.1vw'}}>Round</span> <span style= {{fontSize:'2vh'}}>{game.roundCurrent}</span></strong></center>
           <center>
             
             {winner?<div><h5 style={{fontSize:'50px'}}>WINNER IS {game.users[0].name}</h5>
           
        <Button 
        variant="contained" 
        color="primary"
        type="submit"
        onClick={
          ()=>{
          socket.emit('playAgain', game.roomname);
          setGame(game);
          }
        }
        >Play again</Button>

      </div>
           
           :
  
            <Questionwindow
            word={game.word}
            game={game}
            host={host}
            socket={socket}
            mm={mm}
            />}
</center> 


          </div>


          <div className={classes.chatWindow}>
            
                  <Chatwindow messages={messages} 
                  name={name}
                  sendMessage={sendMessage}
                  message={message}
                  answer={game.word.answer}
                  setMessage={setMessage}
                  roundEnd={game.roundEnd}
                  />

           </div>
           
      </div>

    </div></div>
  );
}

export default Chat;