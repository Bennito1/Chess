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
let playersColor = []
let moveColor = []
let gamePlayers =[]
let gameID = 0
let inMainChat = []

app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)


app.get("/", (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', "index.html" ))
})
app.get("/game", (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', "game.html" ))
})

io.on('connection', (socket) => {
    socket.on("mainChatConnect", (id, name) =>{
        console.log(id)
        inMainChat.push(name)
        inMainChat.push(id)
        for(let i = 0; i < inMainChat.length/2; i++){
            const user = io.sockets.sockets.get(inMainChat[i*2 +1])
            user.emit("newMessage", ["sr", `${name} присоеденился!`])
            console.log(inMainChat)
        }
    })
    socket.on('sendMessage', (name, message, window) =>{
        if(window == "main"){
            const newMessage = [name, message]
            for(let i = 0; i < inMainChat.length/2; i++){
                const user = io.sockets.sockets.get(inMainChat[i*2 +1])
                user.emit("newMessage", newMessage)
                console.log(i)
            }
        }
    })
    socket.on('playerReady', id =>{
        players.push(socket) // перезаход надо 
        console.log(`user connected ${id}`, players, players.length);
            if (players.length >= 2){
                const player1 = players.shift();
                const player2 = players.shift();
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
                playersColor.push("none")
                playersColor.push("none")
                moveColor.push("white")
                player1.emit('startGame') 
                player2.emit('startGame')
            }
    })

    socket.on('stopSerch', id =>{
        players.shift(id)
        console.log(players)
    })
    socket.on('idGame', (name)=>{
        gamePlayers.push(socket.id)
        gamePlayers.push(name)
        console.log('idgame', gamePlayers)
        if(gamePlayers.length <= 4){
            gameID = 0
        }
        else{
            gameID = Math.floor((gamePlayers.length -1) /4)
        }
        socket.emit('giveID', gameID)
    })
    socket.on('getEnemyName', (ID, name) =>{
        if(Math.floor((gamePlayers.indexOf(name)+2)/4) == ID){
            socket.emit('enemyName', gamePlayers[gamePlayers.indexOf(name)+2])
        }
        else{
            socket.emit('enemyName', gamePlayers[gamePlayers.indexOf(name)-2])
        }
    })

    socket.on('resaveId', (name) =>{
        gamePlayers[gamePlayers.indexOf(name)-1] = socket.id
        const ID = Math.floor((gamePlayers.indexOf(name))/4)
        const getMoveColor = moveColor[ID]
        if(Math.floor((gamePlayers.indexOf(name)+1)/4) == ID){
            const getColor = playersColor[ID]
            socket.emit('newData', ID, getMoveColor, getColor, games[ID])
        }
        else{
            const getColor = playersColor[ID+1]
            socket.emit('newData', ID, getMoveColor, getColor, games[ID])
        }
    })

    socket.on('getBoard', (id) => {
        socket.emit('boardState', games[id]);
    });
    socket.on('move', (board, id, color) => {  
        games[id] = board;
        const player1Id = gamePlayers[id * 4];
        const player2Id = gamePlayers[id *4 + 2];

        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);

        player1.emit('boardState', games[id]);
        player2.emit('boardState', games[id]);
        if (color == "white"){
            moveColor[id] = "black"
            player1.emit('hodColor', "black");
            player2.emit('hodColor', "black");
        }
        else{
            moveColor[id] = "white"
            player1.emit('hodColor', "white");
            player2.emit('hodColor', "white");
        }

    });
    socket.on('giveColor', (id) =>{
        const player1Id = gamePlayers[id * 4];
        const player2Id = gamePlayers[id * 4 + 2];
        console.log(player1Id, player2Id)
        console.log(id)
        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);
        if (gamePlayers.length % 4 == 0){
            if (Math.floor(Math.random() * 2) == 1){
                playersColor[id] = "white"
                playersColor[id+1] = "black"
                player1.emit('gameColor', "white")
                player2.emit('gameColor', "black")
            }
            else{
                playersColor[id] = "black"
                playersColor[id+1] = "white"
                player1.emit('gameColor', "black")
                player2.emit('gameColor', "white")
            }
        }
        else{

        }
    })
    socket.on('endGame', (id) =>{
        const player1Id = gamePlayers[id * 4];
        const player2Id = gamePlayers[id * 4 + 2];
        const player1 = io.sockets.sockets.get(player1Id);
        const player2 = io.sockets.sockets.get(player2Id);
        if (player1 == socket){
            player2.emit('win')
            gamePlayers[id*4] = 'NONE'
            gamePlayers[id*4+1] = 'NONE'
            gamePlayers[id*4+2] = 'NONE'
            gamePlayers[id*4+3] = 'NONE'
        }
        else{
            player1.emit('win')
            gamePlayers[id*4] = 'NONE'
            gamePlayers[id*4+1] = 'NONE'
            gamePlayers[id*4+2] = 'NONE'
            gamePlayers[id*4+3] = 'NONE'
        }
    })
    socket.on('disconnect', () => {
        console.log('User  disconnected:', socket.id);
        players = players.filter((id) => id !== socket)
        if(inMainChat.indexOf(socket.id)!= -1){
            const name = inMainChat[inMainChat.indexOf(socket.id)-1]
            inMainChat = inMainChat.filter((id) => id !== socket.id)
            inMainChat = inMainChat.filter((id) => id !== name)
            for(let i = 0; i < inMainChat.length/2; i++){
                const user = io.sockets.sockets.get(inMainChat[i*2 +1])
                user.emit("newMessage", ["sr", `${name} пока!`])
                console.log(inMainChat)
            }
        }
        console.log(inMainChat)
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
