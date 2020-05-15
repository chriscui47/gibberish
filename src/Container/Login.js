import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CTX} from './Dashboard/Store';
import sendChatAction from './Dashboard/Store';
import changeUser from './Dashboard/Store';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Swal from "sweetalert2";  

const useStyles = makeStyles({
        root: {
          width: '500px',
          heightAuto: false,
          popup: 'popup-class',
          confirmButton: 'join-button-class',
          cancelButton: 'join-button-class'
    
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
export default function Login(){
        const classes = useStyles();

        const {allChats,sendChatAction, user} = React.useContext(CTX);
        const [redirect,changeRedirect]=React.useState(0);
const onKeyPress = (e) => {
         if(e.which === 13) {
                 changeUsername('');
         }
         console.log(allChats);
}
const [username,changeUsername]=React.useState("");
const [server,changeServer]=React.useState(0);
const [type,changeType]=React.useState("")
const onPressJoin = (e) => {
        Swal.fire({
          position: 'top',
          input: 'text',
          allowOutsideClick: false,
          inputPlaceholder: 'Enter the server number!',
          showCancelButton: true,
          confirmButtonColor: 'rgb(208,33,41)',
          confirmButtonText: 'OK',
          width: 275,
          padding: '0.7em',
          customClass: {
            heightAuto: false,
            popup: 'popup-class',
            confirmButton: 'join-button-class',
            cancelButton: 'join-button-class'
          } 
        }).then((result) => {
          // Check if the user typed a value in the input field
          if(result.value){
        localStorage.setItem('name',username)
        localStorage.setItem('server',result.value)
        sendChatAction({from:username, msg:'', server:parseInt(result.value),type: "CREATE_PLAYER"})
        changeRedirect(1);
          }
        })
      }

        return(
        <div><div>
        <TextField
     label="Enter your username!"
     value={username}
     onChange={e=>changeUsername(e.target.value)}
     onKeyPress={onKeyPress}
       />



        <Button path="/game" renderAs={Link}
                variant="contained" 
                color="primary"
                type="submit"
                 onClick={
                        (e) => onPressJoin()}

                 >
                         JOIN</Button>
                         
                        
                         
        
}

{redirect?<Redirect to="/game" />:null}

        <Link to="/game">
        <Button path="/game" renderAs={Link}
                variant="contained" 
                color="primary"
                type="submit"
                 onClick={()=>{
                        localStorage.setItem('name',username)
                        localStorage.setItem('server',server)
                        
                        sendChatAction({from:username, msg:'', server:server,type: "CREATE_PLAYER"})
                 }}>
                         CREATE</Button>
                         
                         </Link>
                         </div>
       
        <div>
        {
                !type.localeCompare("join") 
                
                
                && 
                
                <center>
            <Card className={classes.root}>
            <CardContent>
                                        
                                <TextField
                                label="Enter the server number you wish to join!"
                                value={server}
                                type="number"
                                onChange={e=>changeServer(e.target.value)}
                                onKeyPress={onKeyPress}
                                />
        
            </CardContent>
            <Link to="/game">
        
              <Button variant="contained" color="primary" size="small" path="/game" renderAs={Link}  onClick={()=>{
               
               localStorage.setItem('name',username);
               localStorage.setItem('server',server);   
               sendChatAction({from:username, msg:'', server:server,type: "CREATE_PLAYER"})
        
              }}>OK</Button> </Link>
              
        
          </Card>
          </center>
               
               }
               </div>
               </div>
               
               );
}