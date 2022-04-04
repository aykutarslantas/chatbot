import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client"
import './ChatBot.css'

const socket = socketIOClient("http://localhost:3001")
console.log("here i am");

function send() {
    let message = (document.getElementById('messageInput') as HTMLInputElement).value
    if (message.length !== 0) {
        socket.emit("chat", {message: message});
        (document.getElementById('messageInput') as HTMLInputElement).value = ""
    }
}

function ChatBot() {
    let [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.on("chat", data => {
            setMessages(messages => [...messages, data]);
        })
    }, [])
    console.log(messages);
    return (
        <div id="wrap">
            <div id="window">
                <div id="output">
                    {messages && messages.map((m, index) =>
                        <div key={m.index}>
                            <p dangerouslySetInnerHTML={{__html:m.user}}></p>
                            <p dangerouslySetInnerHTML={{__html:m.server}}></p>
                    </div>)}
                </div>
            </div>

            <input type="text" id="messageInput" placeholder="message"/>
            <button type="submit" id="submit" onClick={send}>Gönder</button>
        </div>

    );
};

export default ChatBot;