import React, { useState, useEffect } from 'react';
import io from 'socket.it-client';
import Message from './Message';

const socket = io('http://localhost:5000'); // Update with your server

const ChatBox = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', room);
        
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    const sendMessage = (e) => {
        e.preventDefault();
        const message = { room, text: input, sender: 'User' }; // Replace 'User' with actual user data
        socket.emit('chatMessage', message);
        setInput(''); 
    };

    return (
        <div>
            <div className="messages">
                {messsages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="type a message"
                    required
                    />
                    <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;