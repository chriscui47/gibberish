import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Lobby from './components/Lobby/Lobby';
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Play Gibberish</title>
            </Helmet>
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/lobby" component={Lobby} />

    </Router>


</div>


  );
}

export default App;
