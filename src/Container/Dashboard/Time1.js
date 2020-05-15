
import React from 'react';
import { useTimer} from 'use-timer';
import Timer from 'react-compound-timer';


export default class Timer1 extends React.Component {

    constructor(props) {
        super(props);        
        const { time, start, pause, reset, isRunning } = useTimer();
        this.state={
            timer:time
        }
      }
    startTimer1(){

       
    }

    render() {
      return (<div>
          <strong>{this.state.timer}</strong>
      </div>
      )
    }
  }