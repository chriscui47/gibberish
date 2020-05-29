
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles=makeStyles(theme=> ({
  root: {
    margin: '50px',
    padding: theme.spacing(3,2),
  },
  flex:{
    display: 'flex',
    alignItems: 'center'
  },
  chatWindow:{
    width: '100%',
    height:'70vh'


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
    display: 'flex',
    alignSelf:'flex-end',
    width:'500vw',
  },
  buttons:{
    width: '15%'
  }
}));

const Chatwindow = ( {messages,name,sendMessage,message,setMessage,roundEnd,answer} ) => {
  
  
  const classes=useStyles();

return(
<div>
<ScrollToBottom className={classes.chatWindow}>
{messages.map(( { text, user,answer }, i) =>{

        return(
              <div className={classes.flex} key={i}>              
                       <div style={{marginRight:'0.2vw',marginLeft:'0.2vw',backgroundColor:  answer?'#177d00':i%2 !=0 ? '#dedede' : i%2===0 ?'#F4F4F4':'#F4F4F4'
                       ,width:'100%',alignSelf:'center',height:'100%',width:'100%'}}><strong>{user}: </strong>
                    <Typography variant="body5">        {  text}  </Typography></div> 
      </div>   )  
      
    
})}

</ScrollToBottom>

        

<div className={classes.flex}>
           <TextField
            label="Send answer"
            className={classes.textfield}
            value={message}
           onChange={({ target: { value } }) => setMessage(value)}
           onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            /> }

            <Button 
            variant="outlined" 

            color="primary"
            type="submit"
            className={classes.buttons}
            onClick={
              (e) => sendMessage(e)
            }
            //check if everyone got round answer
            >
              Send
            </Button>
            </div>

            </div>

);
          }
export default Chatwindow;