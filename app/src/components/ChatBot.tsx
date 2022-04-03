import React, {Component, useEffect, useState, SetStateAction} from 'react';
import socketIOClient from "socket.io-client"
import {IonInput} from "@ionic/react";
import './ChatBot.css'

const socket = socketIOClient("http://localhost:3001")

function send() {

    let message = (document.getElementById('messageInput') as HTMLInputElement).value
    if (message.length !== 0) {
        socket.emit("chat", {message: message});
        (document.getElementById('messageInput') as HTMLInputElement).value = ""
    }
}

setInterval(function () {
    socket.on("chat", data => {
        (document.getElementById('output') as HTMLInputElement).insertAdjacentHTML('beforeend', '<p>' + data.user + '</p>');
        (document.getElementById('output') as HTMLInputElement).insertAdjacentHTML('beforeend', '<p>' + data.server + '</p>');
    })
}, 5000)


function ChatBot() {

    return (
        <div id="wrap">
            <div id="window">
                <div id="output"></div>
            </div>

            <input type="text" id="messageInput" placeholder="message"/>
            <button type="submit" id="submit" onClick={send}>Gönder</button>
        </div>

    );
};

export default ChatBot;