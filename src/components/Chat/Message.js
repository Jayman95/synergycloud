import React from 'react';

const Message = ({ message }) => {
    return (
        <div className={`message ${message.sender === 'User' ? 'own' : ''}`}>
            <p>{message.text}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
    );
};

export default Message;