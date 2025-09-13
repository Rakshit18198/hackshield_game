const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
const PokeWorld = require('./rooms/PokeWorld').PokeWorld;

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Authentication Backend!')
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

gameServer.define("poke_world", PokeWorld)
    .on("create", (room) => console.log("room created:", room.roomId))
    .on("dispose", (room) => console.log("room disposed:", room.roomId))
    .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
    .on("leave", (room, client) => console.log(client.id, "left", room.roomId));

app.use("/colyseus", monitor(gameServer));

const PORT = process.env.PORT || 5000;

gameServer.listen(PORT);
console.log(`Server running on port ${PORT}`);