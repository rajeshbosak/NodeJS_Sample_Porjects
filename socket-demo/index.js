const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Add this line

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
// app.use(cors()); // Add this line

app.use(cors({
    origin: '*'
}))

// Serve static files from the "public" directory
// app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    io.emit('server_message', "client connected successfully ");

    // Listen for chat messages
    socket.on('client_message', (message) => {
        console.log('Message: ' + message);
        // Broadcast the message to all connected clients
        io.emit('server_message', "message from server " + message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});