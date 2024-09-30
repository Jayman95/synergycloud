import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = e => setFile(e.target.files[0]);

    const onSubmit = async e => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token'); // Adjust based on your auth implementation
            const res = await axios.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorisation': `Bearer ${token}`
                }
            });
            setMessage('File upload failed');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onChange} required />
            <button type="submit">Upload</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Upload;