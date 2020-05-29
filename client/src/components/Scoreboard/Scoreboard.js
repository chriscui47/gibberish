import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './Scoreboard.css';

const Scoreboard = ( {users} ) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
              <h2>


{users.map(({name,answered,score},index) => (
  <div key={name} className="activeItem" style={{backgroundColor:answered===1?"#177d00":"#E0EEE0",color:'black',}}>
                      <img alt="Online Icon" src={onlineIcon}/> <span style={{width:'20%'}}>#{index+1}</span> <span style={{width:'70%'}}> {name.length > 10 ? 
                    name.substring(0, 10) + "..." : 
                    name} 
                      
                      
                      
                      
                      
                      </span> <span style={{width:'auto'}}> {score} </span>
                      
                  </div>
                ))}
              </h2>
          </div>
        )
        : null
    }
  </div>
);

export default Scoreboard;