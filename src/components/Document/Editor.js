import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const socket = io('http://localhost:5000'); // Update with your server URL

const Editor = ({ documentId }) => {
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        const q = new Quill('#editor', { theme: 'snow' });
        setQuill(q);

        return () => {
            q.disable();
            q.setText('');
        };
    }, []);

    useEffect(() => {
        if (!quill) return;

        socket.emit('joinDocument', documentId);

        socket.on('loadDocument', (document) => {
            quill.setContents(document.content);
        });

        const handler = (delta) => {
            quill.updateContents(delta);
        };

        socket.on('receiveChanges', handler);

        const changeHandler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('sendChanges', { documentId, delta });
        };

        quill.on('text-change', changeHandler);

        return () => {
            socket.off('receiveChanges', handler);
            quill.off('text-change', changeHandler);
        };
    }, [quill, documentId]);

    return (
        <div id="editor" style={{ height: '500px' }}></div>
    );
};

export default Editor;
