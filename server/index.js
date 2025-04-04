require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); 
const pg = require('pg')
const router = require('./router/index')
const client = require('./config/db');
const errorMiddleware = require('./middleware/error-middleware')


const PORT =process.env.PORT || 5000
const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
})

let players = []
let games =[]

let gamePlayers =[]
let gameID = 0


app.use(express.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use("/client", express.static(path.dirname(__dirname)+ "/client"))
app.use(errorMiddleware)


app.get("/", (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', "index.html" ))
})
app.get("/game", (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', "game.html" ))
})

io.on('connection', (socket) => {
    socket.on('playerReady', id =>{
        players.push(socket)
        console.log(`user connected ${id}`, players, players.length);
            if (players.length >= 2){
                const player1 = players.shift();
                const player2 = players.shift();
                const gameId = games.length;
                games.push([
                    ['l','k','s','q', 'kr','s', 'k','l'], 
                    ['p','p','p','p', 'p', 'p', 'p','p'],
                    ['0','0','0','0', '0', '0', '0','0'],
                    ['0','0','0','0', '0', '0', '0','0'],
                    ['0','0','0','0', '0', '0', '0','0'],
                    ['0','0','0','0', '0', '0', '0','0'],
                    ['P','P','P','P', 'P', 'P', 'P','P'],
                    ['L','K','S','Q', 'KR','S', 'K','L']
                ])
                player1.emit('startGame') 
                player2.emit('startGame')
            }
    })
    socket.on('idGame', ()=>{
        gamePlayers.push(socket.id)
        console.log('idgame', gamePlayers)
        gameID = Math. floor((gamePlayers.length-1) /2)
        socket.emit('giveID', gameID)
    })
    socket.on('getBoard', (id) => {
        socket.emit('boardState', games[id]);
    });
    socket.on('move', (board, id, color) => {  
        games[id] = board;
        const player1Id = gamePlayers[id + id];
        const player2Id = gamePlayers[id + id + 1];

        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);

        player1.emit('boardState', games[id]);
        player2.emit('boardState', games[id]);
        if (color == "white"){
            player1.emit('hodColor', "black");
            player2.emit('hodColor', "black");
        }
        else{
            player1.emit('hodColor', "white");
            player2.emit('hodColor', "white");
        }

    });
    socket.on('giveColor', (id) =>{
        const player1Id = gamePlayers[id + id];
        const player2Id = gamePlayers[id + id + 1];
        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);
        if (gamePlayers.length % 2 == 0){
            if (Math.floor(Math.random() * 2) == 1){
                player1.emit('gameColor', "white")
                player2.emit('gameColor', "black")
            }
            else{
                player1.emit('gameColor', "black")
                player2.emit('gameColor', "white")
            }
        }
        else{

        }
    })
    socket.on('endGame', (id) =>{
        const player1Id = gamePlayers[id + id];
        const player2Id = gamePlayers[id + id + 1];
        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);
        if (player1 == socket){
            player2.emit('win')
        }
        else{
            player1.emit('win')
        }
    })
    socket.on('disconnect', () => {
        console.log('User  disconnected:', socket.id);
        players = players.filter((id) => id !== socket)
    });
})

const start = async () =>{
    try{
        server.listen(PORT, () => console.log(`server started on port: ${PORT}`))
        await client.connect()
            .then(() => {
                console.log('Connected to PostgreSQL')
                return client.query('SELECT NOW()');
            })
            .then(res => {
                console.log('Текущая дата и время:', res.rows[0]);
              })
            .catch(err => console.error('Connection error', err.stack));
    }
    catch(e){
        console.log(e)
    }
}

start()
