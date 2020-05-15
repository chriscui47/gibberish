import {produce} from 'immer';
import Button from '@material-ui/core/Button';

import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
export const CTX = createContext();



/**

  initState = {
    topic1: [
      {form: "", msg: "hi"}
    ]
  }

 */

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_SCORE = "RECEIVE_SCORE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const CREATE_PLAYER = "CREATE_PLAYER";
export const ROUND_START="ROUND_START";
export const ROUND_END="ROUND_END";
export const UPDATE_TIME="UPDATE_TIME";
export const CHANGE_WORD="CHANGE_WORD";
export const  DELETE_PLAYER="DELETE_PLAYER";
export const CREATE_LOBBY = "CREATE_LOBBY";

const wordarr=[{question:"secondword",answer:"bye",hint:"123"},

{question:"stirrup oak her",answer:"strip poker",hint:"naked games"},
{question:"bud dish hots",answer:"body shots",hint:"belly button"},
{question:"parr grr all",answer:"bar crawl",hint:"on to the next"},
{question:"mails drip her",answer:"male stripper",hint:"dollar bills"},
{question:"hug cup called sure",answer:"hookup culture",hint:"sleeping around"},
{question:"bod dull hope inner",answer:"bottle opener",hint:"cork"},
{question:"met tickle mayor won huh",answer:"medical marijuana",hint:"anxiety"},
{question:"half dare bar tee",answer:"after party",hint:"round 2"},
{question:"trunk cog holes",answer:"drunk goggles",hint:"tipsy eyes"},
{question:"way camp ache",answer:"wake and bake",hint:"off to a good start"},
{question:"pod pro niece",answer:"pot brownies",hint:"chill chocolate"},
{question:"diss sicken ate it rif e her",answer:"designated driver",hint:"the real MVP tonight"},
{question:"ford went he",answer:"4/20",hint:"national holiday"},
{question:"pup of as",answer:"puff puff pass",hint:"joint instructions"},
{question:"may get train",answer:"make it rain",hint:"good weather"},
{question:"past hutch owe ain't",answer:"pass the joint",hint:"split the pot"},
{question:"shod game ink appear",answer:"shotgunning a beer",hint:"quick drink"},
];



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

  {
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "34234" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    []
  
,  deck:0,
roundEnd:false,  
word:{question: 'xdthzsdrght', answer:'bye',hint:'aa'},
time:10


}
,

  { 
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "hello" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    [{}]
  
,  deck:0,
roundEnd:false,
word:{question: 'hello', answer:'bye',hint:'aa'}


}
,

  {
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "hello" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    [{}]
  
,  deck:0,
roundEnd:false
}
,

  {
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "hello" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    [{}]
  
,  deck:0,
roundEnd:false

}
,

{
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "hello" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    [{}]
  
,  deck:0,
roundEnd:false

}
,

 {
    messages:[
    { from: "123", msg: "hi" },
    { from: "12323", msg: "hello" },
    { from: "3132", msg: "I’d like you to…" }
  ],
  scores:
    [{}]
  
,  deck:0,
roundEnd:false

}]
};




  /*const { from, msg, topic } = action.payload;
  const scores="scores";
  switch (action.type) {
      case RECEIVE_MESSAGE:
        return {
          ...state,
          [topic]: ...state[topic].scores,messages:[...state[topic].messages, { from, msg }]
        };
      break;  

      case RECEIVE_SCORE:
      return {...state, [scores]:state.scores.map(function(item){
          if(item.from===from){
          return {
            ...item,
            score: item.score+10,
          };
          }
          return item
       // return item
      })}
      break;
      default:
        return state

  }
}*/


function GetSortOrder(score) {    
  return function(a, b) {    
      if (a[score] > b[score]) {    
          return -1;    
      } else if (a[score] < b[score]) {    
          return 1;    
      }    
      return 0;    
  }    
}    

function reducer(state, action) {
  const { from, msg, server } = action.payload;
 
    // produce takes the existing state, and a function
    // It'll call the function with a "draft" version of the state
  switch(action.type){
    case RECEIVE_MESSAGE:
    return produce(state, draft => {
      // Modify the draft however you want
      draft.servers[server].messages.push({ from, msg });
  
      // The modified draft will be
      // returned automatically.
      // No need to return anything.
    });

    break;
    case DELETE_MESSAGE:
      return produce(state, draft => {
        // Modify the draft however you want
        draft.servers[server].messages.splice(0,1);
    
        // The modified draft will be
        // returned automatically.
        // No need to return anything.
      });
    break;

    case RECEIVE_SCORE:
      var index=0;
      //give the player who sent the message a point
      for(var i=0;i<state.servers[server].scores.length;i++)
      {
        if(!state.servers[server].scores[i].name.localeCompare(from)){
          index=i;
          break;
        }
      }
      //check if all palyers got answer right! If so, end the round
      var answeredIndex=0;
      for(answeredIndex;answeredIndex<state.servers[server].scores.length;answeredIndex++)
      {
        if(!state.servers[server].scores[answeredIndex].answered===0){
          break;
        }
      }
      return produce(state, draft => {
        // Modify the draft however you want
        
        draft.servers[server].scores[i].score+=10;
        draft.servers[server].scores[i].answered=1;
        draft.servers[server].scores.sort(GetSortOrder("score")); //Pass the attribute to be sorted on    



        if(answeredIndex===draft[server].scores.length){
          draft.servers[server].roundEnd=true;
          //exit out
          return;
        }
        // The modified draft will be
        // returned automatically.
        // No need to return anything.
      });
    break;

      
    case CREATE_PLAYER:
      return produce(state, draft => {
        // Modify the draft however you want
        draft.servers[server].scores.push({name:from,score:0,answered:0});
        // The modified draft will be
        // returned automatically.
        // No need to return anything.
      });
      break;


      case DELETE_PLAYER:
        return produce(state, draft => {
          // Modify the draft however you want
          draft.servers[server].scores=draft[server].scores.splice(0,1);
          
      
          // The modified draft will be
          // returned automatically.
          // No need to return anything.
        });
        break;


    case ROUND_START:
      return produce(state, draft => {
        // Modify the draft however you want
        for(var i=0;i<state[server].scores.length;i++)
        {
          draft.servers[server].scores[i].answered=0;
          draft.servers[server].roundEnd=false
        }
        
        // The modified draft will be
        // returned automatically.
        // No need to return anything.
      });
      break;
      case UPDATE_TIME:
        return produce(state, draft => {
          // Modify the draft however you want
          draft.servers[server].time=msg;
          // The modified draft will be
          // returned automatically.
          // No need to return anything.
        });
        break;
  
        case CHANGE_WORD:
          var randomnumber = Math.floor(Math.random() * (wordarr.length-1 - 0 + 1)) + 0;
          return produce(state, draft => {
            // Modify the draft however you want
            draft.servers[server].word=wordarr[randomnumber];
          });

          break;


          case ROUND_END:
            return produce(state, draft => {
              // Modify the draft however you want
              draft.servers[server].roundEnd=true;
              // The modified draft will be
              // returned automatically.
              // No need to return anything.
            });
            break;
      
            case CHANGE_WORD:
              return produce(state, draft => {
                // Modify the draft however you want
                draft.servers[server].word=wordarr[0];
              });
    
              break;
    
    default:
      return state

  }
}

let socket;

let user;
user = localStorage.getItem('name');
export function sendChatAction(value) {
  socket.emit("chat message", value);
  
}

const Store = props => {
  const [allChats, dispatch] = useReducer(reducer, initState,()=>{

    const localData=localStorage.getItem('allChats');
    return localData? JSON.parse(localData) :initState;

  });

  React.useEffect(()=>{
    localStorage.setItem('allChats',JSON.stringify(allChats))
  },    [allChats.servers]

  );
  
  

 


  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: msg.type, payload: msg });
    });

  } 

  return (
    <CTX.Provider value={{ allChats, sendChatAction}}>
      {props.children}
    </CTX.Provider>
  );
};
export default Store;
