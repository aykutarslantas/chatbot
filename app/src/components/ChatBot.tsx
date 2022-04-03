import React, {Component, useEffect, useState} from 'react';
import socketIOClient from "socket.io-client"
import {IonInput} from "@ionic/react";

const BASE_URL = "http://localhost:3001"

function ChatBot() {

    useEffect(() => {
        send()
    }, [])

    function send() {
        let message = (document.getElementById('messageInput') as HTMLInputElement).value

        const socket = socketIOClient(BASE_URL)
        socket.on("chat", data => {
            console.log(data)
        })
        socket.emit("chat", {message: message})
    }

    return (
        <div>
            <div id="messagesAll">a</div>
            <input type="text" id="messageInput"/>
            <button type="submit" onClick={send}>Gönder</button>
        </div>
    );

}

export default ChatBot;

