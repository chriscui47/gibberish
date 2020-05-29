import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import cards from './cards.png';
import lobbyscreen from './lobbyscreen.png'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import tongue from './tongue.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [currentScrollHeight, setcurrentScrollHeight] = useState(0);

  window.onscroll =()=>{
   const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
   if (currentScrollHeight != newScrollHeight){
    setcurrentScrollHeight( newScrollHeight);
   }
 }

 let opacity1 = Math.min(100 / (currentScrollHeight)  , 1);
 if(opacity1<0.18){
   opacity1=0;
 }

const opacity2=1-opacity1;
console.log(opacity1);
  return ( <div>
    


   <div style={{position:'fixed', top: '0', backgroundColor:'#1A1A1D',opacity:'1',height:'100vh',zIndex:'-1', width: '100%'}}>
   </div>


    <div className="joinOuterContainer" style={{opacity:opacity1, zIndex:'1'}}>

      <div className="joinInnerContainer">

        <div style={{display:'flex',alignItems:'center',width:'100%',color:'white',fontWeight:'bold',fontSize:'5.6vw',marginBottom:'0vw'}}>
          
         <span style={{marginRight:'0.65vw'}}>GIBBERISH</span>         <img src={tongue} style={{height:'4vw',width:'8vw',marginRight:'0.3vw'}}/>    
</div>
<h2> <div style={{marginBottom: '10vh',color:'white'}}> The popular Instagram game meets Cards Against Humanity!</div>
      </h2>

        <div style={{width:'100%'}}>


              <input placeholder="Enter your username" style={{
                borderRadius: '0',
                width:'100%',height:'5vh',
                border:'2px solid grey',marginBottom:'3vw'
              }}

                type="text" onChange={(event) => setName(event.target.value)} />


        </div>


        <div style={{width:'100%',display:'flex'}}>

                        <input placeholder="Room Code of existing game" style={{
                        borderRadius: '0',border:'2px solid grey',
                        width:'80%',height:'6vh',marginRight:'2vw',
                        marginBottom:'2vw',alignSelf:'flex-end'
                      }} type="text" onChange={(event) => setRoom(event.target.value)} />
                    
                      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&type=join&host=0`}>
                      <button style={{backgroundColor:'#40E0D0',border:'0px solid grey',color:'#1A1A1D',fontWeight:'bold',borderRadius:'0.2vw',padding:'0.8vw',width:'8vw'}} type="submit">JOIN GAME</button>

                      </Link>

                </div>


              <div style={{width:'100%', display:'flex'}}>



              <Link onClick={e => {
                if(!name){
              e.preventDefault();
              alert("Enter your username before creating lobby");
                }else{
                  return null;
                }
            
              }}
                to={`/chat?name=${name}&room=${room}&type=mm&host=1`}>
                <button type="submit" style={{ backgroundColor:'#40E0D0',border:'0px solid grey',color:'#1A1A1D',fontWeight:'bold',borderRadius:'0.2vw',padding:'0.7vw',width:'19vw',marginRight:'2vw'}}>FIND A RANDOM GAME</button>
              </Link>

                          <Link onClick={e => {
                            
                            if(!name){
                          e.preventDefault();
                          alert("Enter your username before creating lobby");
                            }else{
                              return null;
                            }

                          }}
                            to={`/lobby?name=${name}`}>
                            <button style={{ backgroundColor:'#40E0D0',border:'0px solid grey',color:'#1A1A1D',fontWeight:'bold',borderRadius:'0.2vw',padding:'0.7vw',width:'19vw',marginBottom:'17vh'}} type="submit">CREATE NEW GAME</button>
                          </Link>
              </div>
              <center><ExpandMoreIcon className="bounce" style={{color:'white',fontSize:'8vh'}}/></center>



       </div>

            
</div>

    <div style={{height:'100vh',  backgroundColor:'#1A1A1D', width: '100%',marginTop:'100vh',display:'flex',justifyContent:'center'}}>
    <span style={{fontSize:'5vh',color:'white',width:'80%',marginTop:'4vh',display:'flex',flexDirection:'column',alignContent:'center',justifyContent:'center'}}>

      <center> <h1 style={{fontSize:'7vh',marginBottom:'4vh'}}>How To Play</h1> </center> 
      <div>
        <h2> 

          <ul>
        <li>Each card has a couple of random gibberish syllables on the front side.</li> <br/>
        <li> However after saying this gibberish out loud, it actually sounds out a real phrase or word. </li>  <br/>
        <li>Compete against your friends in a race against time to find the hidden phrases!   <span role="img" aria-label="emoji">❤️</span></li>
      

      </ul>
      </h2>
      </div>
            <div>
            <img src={lobbyscreen} style={{height:'100%',width:'50%'}}/>
            <img src={cards} style={{height:'100%',width:'50%'}}/>
            </div>
            <br/>
            <p style={{fontSize:'2vh',color:'white'}}> The game this site is based on is Incohearant from What Do you Meme on Amazon,  all credit goes to them.</p>


            <p style={{fontSize:'1vh',color:'white'}}>PlayGibberish is not associated with What Do you Meme, LLC in any way. This site was simply built to gain knowledge about Javascript, HTML, and server creation and is non profit.
            </p>

        </span>



    </div>



    </div>
  );
}
