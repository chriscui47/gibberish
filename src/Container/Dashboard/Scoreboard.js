
import {CTX} from './Store';


import React, { createContext, useReducer } from "react";



export default function Scoreboard() {

    const { allChats, sendChatAction, user,allScores,sendScoreAction } = React.useContext(CTX);



    return(
            <div>
                <h1></h1>
            </div>
    )
}
