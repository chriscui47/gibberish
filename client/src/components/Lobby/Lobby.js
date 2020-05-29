import React, { useState } from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import FormCheck from 'react-bootstrap/FormCheck';
import FormControl from 'react-bootstrap/FormControl'
import io from "socket.io-client";
import { Redirect } from 'react-router';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import './Lobby.css';
import Toolbarapp from '../Toolbar/Toolbarapp';


export default class Lobby extends React.Component{

  constructor(props){
    super(props);
    this.handleChangeControl=this.handleChangeControl.bind(this);
    this.sendResults=this.sendResults.bind(this);
    this.state={gameLength:0,deck:'',rounds:0,username:'',room:'',receivedData:false,disabled:true};

}
    handleChangeControl = ({ target }) => {
      
        this.setState({ [target.id]: target.value });


        
    }
    
   makeid = (length)=> {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 sendResults(){
  var body = {
      "gameLength": this.state.gameLength,
      "deck": this.state.deck,
      "rounds": this.state.rounds,
      "username": this.state.username,
      "room":this.state.room,
  }
  fetch('https://gibb47.herokuapp.com/create', {
       mode:'cors',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      },
    }).then(res => this.setState({receivedData: true})).then(data => this.setState({disabled: true}))

}

    componentDidMount(){
      var body = {
        "gameLength": this.state.gameLength,
        "deck": this.state.deck,
        "rounds": this.state.rounds,
        "username": this.state.username,
        "room":this.state.room,
    }
      const { name } = queryString.parse(this.props.location.search);
      this.setState({username:name})
      this.setState({room:this.makeid(5)})  
    
  }
    render(){

      if(this.state.receivedData) {
        return <Redirect to={`/chat?name=${this.state.username}&room=${this.state.room}&gameLength=${this.state.gameLength}&deck=${this.state.deck}&rounds=${this.state.rounds}&host=1`} />
    }

  return (            
  
  <div style={{width:'100%',minHeight:'100vh'}}>
  <Toolbarapp name={this.state.username}/>

    <div className="joinOuterContainer1">
      <div className="joinInnerContainer1">
        <div className="flexitem">
    <Form  > 
          <Form.Group as={Col}  controlId="gameLength">
            <Form.Label style={{fontWeight: 'bold',color:'black',fontSize:'2vh'}}>Guessing time in seconds   </Form.Label>
            <Form.Control size="lg" as="select" onChange={this.handleChangeControl} >
            <option value="" selected disabled>Please choose</option>

              <option>10 (Legendary)</option> 
              <option>15 (Expert) </option>
              <option>20 (Hard) </option>
              <option>25 (Medium,Recommended) </option>
              <option>30 (Easy)</option>
              <option>35 (You there?)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="rounds">
            <Form.Label style={{fontWeight: 'bold',color:'black',fontSize:'2vh'}}>Rounds</Form.Label>
            <Form.Control size="lg" as="select" onChange={this.handleChangeControl}>
            <option value="" selected disabled>Please choose</option>

              <option>5</option>
              <option>10</option>
              <option>15 (recommended)</option>
              <option>20</option>
              <option>25</option>

            </Form.Control>
          </Form.Group>
          
          <Form.Group as={Col} controlId="deck">
            <Form.Label style={{fontWeight: 'bold',color:'black',fontSize:'2vh'}}>Word deck category   </Form.Label>
            <Form.Control size="lg" as="select"  onChange={this.handleChangeControl}>
            <option value="" selected disabled>Please choose</option>
             <option>Mix of all decks (recommended)</option>
             <option>Yellow (Pop Culture)</option>
              <option>Blue (Party)</option>
              <option>Red (Kinky)</option>
            </Form.Control>
          </Form.Group>
          {/*
          <Form.Label style={{...{fontFamily:'Roboto'},...{fontWeight: 'bold'}}}>Custom Words (optional)   </Form.Label>
          <InputGroup size="sm">
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>        */  
    }
 <br/>
  </Form>
  <center>
        <Button 
        variant="contained" 
        color="primary"
        type="submit"
        fullWidth={true}
        onClick={this.sendResults}
        disabled={!this.state.gameLength||!this.state.deck||!this.state.rounds} 
        value="Create">CREATE
      </Button>

        </center>
  </div>
  <br/>
{!!(this.state.gameLength&&this.state.deck&&this.state.rounds)&&<center><strong>Room code will be: <br/><p style={{fontSize: '3vh'}}>{this.state.room}</p></strong></center>}
</div>

  </div>
</div>
  );

}
}
