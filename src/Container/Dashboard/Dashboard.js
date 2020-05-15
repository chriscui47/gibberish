import React , {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Store, {CTX} from './Store';
import { useTimer as useTimer1 } from 'use-timer';
import { useTimer as useTimer2 } from 'use-timer';
import Time1 from './Time1';
import Timer from 'react-compound-timer';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles=makeStyles(theme=> ({
    root: {
      margin: '50px',
      padding: theme.spacing(3,2),
    },
    flex:{
      display: 'flex',
      alignItems: 'center',


    },
    scoreWindow:{
      width: '35%',
      height: '500px',

      borderRight: '2px solid grey'
    },
    chatWindow:{
      width: '60%',
      height: '500px',
      padding: '20px'

    },
    chatBox:{
      width:'60%',
      height: '500px',


    },
    questionWindow:{
      width: '80%',
      borderRight: '2px solid grey',
      height: '500px',
     alignSelf: 'center'

    },
    textfield:{
      position: 'absolute',
      width: '40%',
      top: '650px'
    },
    button:{
      width: '15%'
    }
  }));




export default function Dashboard() {
  const { allChats, sendChatAction} = React.useContext(CTX);
  let user = localStorage.getItem('name');

  let activeServer=parseInt(localStorage.getItem('server'));

    const classes=useStyles();
    const rooms = Object.keys(allChats);


   // const [activeServer, changeActiveServer] = React.useState(userserver);
    const [textValue, changeTextValue] = React.useState('');
    const [score, changeScoreValue] = React.useState(0);
    const [word, changeWord] = React.useState(allChats.servers[activeServer].word);
    var host = false; 
    
const isLargeNumber = (element) => !(element.name).localeCompare(user);
const userIndex= allChats.servers[activeServer].scores.findIndex(isLargeNumber);
  //handle send chat message using enter key
    const onKeyPress = (e) => {
      if(e.which === 13) {
        sendChatAction({from:user, msg:textValue, server:activeServer,type: "RECEIVE_MESSAGE"});
        changeTextValue('');

          
        if(!textValue.localeCompare(word.answer))
        sendChatAction({from:user, msg:textValue, server:activeServer,type: "RECEIVE_SCORE"})
          
        }
    }
    //for the current word to guess
    //for the spaces to fill
    var spaceCount = (allChats.servers[activeServer].word.answer.split(" ").length - 1);

    var spaces="";
    for(var i=0;i<allChats.servers[activeServer].word.answer.length;i++){
      if(allChats.servers[activeServer].word.answer[i]===" "){

        spaces=spaces+'\xa0\xa0\xa0  ';
      }
      else{
        spaces=spaces.concat(" _");
      }
    }


/*
    useEffect(()=>{
      localStorage.setItem('score',JSON.stringify(score))
    },[score]
*/
//only want win and chagne to next screen if everyone gets answer or time runs out 
  const [winCondition, changeWin] = React.useState(0);
  
  let arrlength=allChats.servers[activeServer].messages.length;
  if (arrlength>15){
    sendChatAction({from:user, msg:textValue, server:activeServer,type:"DELETE_MESSAGE"});  

  }

  const nextWord= ()=>{
    sendChatAction({from:user, msg:time2, server:activeServer,type:"CHANGE_WORD"});
  }
 // if(!allChats[activeTopic].messages[arrlength-1].msg.localeCompare(word.answer)){
  //  allChats[activeTopic].splice(arrlength-1,1);
    //changeWin(1);
 // }

 const { time, start, pause, reset, isRunning } = useTimer1({
  initialTime: 25,
  timerType: 'DECREMENTAL',
});



React.useEffect(()=>{
  sendChatAction({from:user, msg:time, server:activeServer,type:"UPDATE_TIME"});  
});
//this is the non host timer, al users except host see it. it is the server time
var time2=allChats.servers[activeServer].time;

React.useEffect(()=>{
  time2=allChats.servers[activeServer].time;
});


React.useEffect(()=>{
  
  if((host && allChats.servers[activeServer].roundEnd)){
    
    if(time===0){
    sendChatAction({from:user, msg:textValue, server:activeServer,type: "ROUND_START"})};

    reset();    
    start();
  }  

},[allChats.servers[activeServer].roundEnd]);



//check if the user is the host
if(userIndex ===0){  
  host=true;
}
else{

  host=false;

}

  if(!allChats.servers[activeServer].roundEnd && host){
    start();
  }
  
//THE answer was!

  if((time===0 && host && allChats.servers[activeServer].roundEnd)){
    nextWord();
    sendChatAction({from:user, msg:textValue, server:activeServer,type: "ROUND_START"})
    reset();
    
  }  
  

  if(time===1 && host && !allChats.servers[activeServer].roundEnd){
    reset();
    pause();
    sendChatAction({from:user, msg:textValue, server:activeServer,type: "ROUND_END"})
  }
  
React.useEffect(()=>{
  
  if((host && !allChats.servers[activeServer].roundEnd)){
    reset();    
    start();
    if(time===0){
    sendChatAction({from:user, msg:textValue, server:activeServer,type: "ROUND_END"})};

  }  

},[allChats.servers[activeServer].roundEnd]);
  return (
      
    <div>

      
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button>
      <Paper className={classes.root} elevation={3} >
        <Typography variant="h4" component="h4">
          Server {activeServer}
        </Typography>
        <Typography variant="h5" component="h5">
          {activeServer}
        </Typography>
        <div className={classes.flex}>
            <div className={classes.scoreWindow}>
              <h1>CURRENT SCORE:{
                allChats.servers[activeServer].scores.map(item=>(
                  <div style={{backgroundColor: allChats.servers[activeServer].scores[userIndex].answered?"green":"white"}}>{(item.name)}: {item.score}</div>
                ))
                
                }</h1>
              <List>
                {
                  rooms.map(server=>(
                    <div style={{color: "red",}}>
                    <ListItem>
                        <ListItemText primary={server}/>
                    </ListItem></div>
                  ))
                }
              </List>
            </div>         
            <div className={classes.questionWindow} id="timer">

            <Paper className={classes.root} elevation={6} >
                            
                        
                      <strong>time1:{host?time:time2}</strong>

              <center>

                <h1>{allChats.servers[activeServer].word.question} </h1>
              {allChats.servers[activeServer].roundEnd && 
              <div>The answer was:<h1> {allChats.servers[activeServer].word.answer}</h1>
              <Button variant="contained" color="primary"
              onClick={()=>{
                nextWord();
                sendChatAction({from:user, msg:textValue, server:activeServer,type: "ROUND_START"})
                reset();
                start();

              }}
              
              
              >Next Word</Button>  </div>}

              <h1>{!allChats.servers[activeServer].roundEnd
              && spaces}</h1></center>

                </Paper>
              </div>   
            <div className={classes.chatWindow}>
  

                {              
                        allChats.servers[activeServer].messages.map(function (element, index, array) {
                          //if (array.indexOf(element)-18>=0 || arrlength<18) {
                              if(!element.msg.localeCompare(word.answer))
                              {
                                //win condition!
                                   return( <div className={classes.flex} key={index}>
                                    <Chip className={classes.chip}/>

                                <Typography variant="body5">PLAYER  GUESSED WORD RIGHT!</Typography>
                                    
                                    </div>    )  
                                  

                              }
                              else{return (
                                    <div className={classes.flex} key={index}>
                                    <Chip label={element.from} className={classes.chip}/>
                                <Typography variant="body5">{element.msg}</Typography>
                                    </div>          

                              )
                        
                             }

                          
                          
                      } )


                }
                <div className={classes.textfield}>
                 {!allChats.servers[activeServer].roundEnd && <TextField
              label="Send answer"
              className={classes.chatBox}
              value={textValue}
              onChange={e=>changeTextValue(e.target.value)}
              onKeyPress={onKeyPress}
                 /> }

{!allChats.servers[activeServer].roundEnd &&
                <Button 
                variant="contained" 
                color="primary"
                className={classes.button}
                type="submit"
                 onClick={()=>{
                   console.log(host);
                  sendChatAction({from:user, msg:textValue, server:activeServer,type: "RECEIVE_MESSAGE"});
                   
                   changeTextValue('');
                if(!textValue.localeCompare(allChats.servers[activeServer].word.answer)){
                sendChatAction({from:user, msg:textValue, server:activeServer,type: "RECEIVE_SCORE"})
                }

                            
                //check if everyone got round answer

           //     changeWord(prevState => ({...prevState, question: allChats[activeServer].word.question,answer:allChats[activeServer].word.answer,hint:allChats[activeServer].word.hint}));


              }}
              

                >
                  Send
                </Button>}
                </div>
            </div>       

        </div>


      </Paper>
    </div>
    
  );
}

