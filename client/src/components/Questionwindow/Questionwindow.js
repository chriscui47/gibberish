
 import React from 'react';
 import Button from '@material-ui/core/Button';
 import Paper from '@material-ui/core/Paper';
 import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
 import redIcon from './redicon.png';
 import yellowIcon from './yellowIcon.png';
 import blueIcon from './blueIcon.png';
 import greenIcon from './greenIcon.png';
 import black from './black.jpg';
 import { Alert, AlertTitle } from '@material-ui/lab';


           
const useStyles=makeStyles(theme=> ({
  root: {
    margin: '50px',
    padding: theme.spacing(3,2),
    borderBottom: '30px solid navy '
  },
  flex:{
    display: 'flex',
    alignItems: 'center',
    width:'1900px'

  },
  scoreWindow:{
    width: '35%',
    height: '700px',

  },
  chatWindow:{
    width: '60%',
    height: '700px',
    padding: '20px'

  },
  chatBox:{
    width:'60%',
    height: '700px',


  },
  questionWindow1:{
    width: '100%',
    height: '55vh',
   alignSelf: 'flex-start',
   borderRadius:'15px',
   backgroundSize:'100%'
  },
  text:{
    marginTop:'10%',
    marginLeft:'8%',
    marginRight:'8%',
    textAlign:'left',
    fontSize:'2vw'
    
  },
  textfield:{
    position: 'absolute',
    width: '40%',
    top: '650px'
  },
  time:{
    fontSize:'2vh',
    marginTop:'1vh'
  },
  button:{
    width: '15%'
  }
}));
    const Questionwindow = ( {word,game,host,socket,mm} ) => {
      const classes=useStyles();

      var spaceCount = (game.word.answer.split(" ").length - 1);
      var spaces="";
      for(var i=0;i<game.word.answer.length;i++){
        if(game.word.answer[i]===" "){
    
          spaces=spaces+'\xa0\xa0\xa0  ';
        }
        else{
          spaces=spaces.concat(" _");
        }
      }          
            

return(   
            <Paper elevation={6} className={classes.questionWindow1}  style={{backgroundImage:`url(${game.deck == 'Mix of all decks (recommended)' ?
             greenIcon : game.deck === 'Yellow (Pop Culture)' ? yellowIcon : game.deck==='Blue (Party)'?blueIcon:game.deck==='Red (Kinky)'?redIcon:greenIcon
          
          }) `,          }}   
            >      <center>

              <div>
                            <div className={classes.time}> <strong >{game.time}</strong></div>
</div>



              {!!game.roundEnd==0 &&  <h1 className={classes.text}> <strong>{word.question}
              </strong> </h1>}


                              
              {(!!host&&game.roundEnd==-1) && 

<Button 
variant="contained" 
size="large"
color="primary"
onClick={
  ()=>
  socket.emit('startGame', game.roomname)
}

>Start Game</Button>
}


              {game.roundEnd==1 && 
              <div className={classes.text}> The answer was:<h2> <strong>{word.answer}</strong></h2>
             </div>}
              <h1 className={classes.text} style={{marginTop:'20%'}} >{!game.roundEnd
              && spaces}
                            {(game.time<=8&&!game.roundEnd)&&
                            <div>Hint: {word.hint}</div>
                            
                            }

              
              
              </h1></center>

                </Paper>
    );
              }

      export default Questionwindow;