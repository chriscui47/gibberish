import React, { createContext, useReducer } from "react";
import io from "socket.io-client";


export default function WinCondition() {
    const nextWord= ["hello your ass is mine","pineapple apple pen"]
    return(
            <div>
                <h1>{nextWord[0]}</h1>
            </div>
    )
}
