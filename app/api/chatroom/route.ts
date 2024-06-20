const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Example user data
const users = [
    { username: 'user1' },
    { username: 'user2' },
    { username: 'user3' },
];

io.on('connection', (socket:any) => {
    console.log('New client connected');

    socket.on('sendMessage', (message:any) => {
        io.emit('message', message); // Broadcast message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
