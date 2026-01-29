class GameConstruct{
    constructor(gameId, player1, player2) {
        this.id = gameId;
        this.player1 = player1; 
        this.player2 = player2;
        
        // Начальная позиция
        this.board = [
            ['l','k','s','q','kr','s','k','l'],
            ['p','p','p','p','p','p','p','p'],
            ['0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0'],
            ['P','P','P','P','P','P','P','P'],
            ['L','K','S','Q','KR','S','K','L']
        ];
        
        // Состояние игры
        this.currentTurn = 'white';
        this.moves = []; 
        this.status = 'active'; 
        this.result = null; 
        this.winner = null; 
        
        this.whiteTime = 600000; 
        this.blackTime = 600000;
        
        // Чат игры
        this.chat = [];
        
        this.spectators = new Set();
        
        // История позиций (для правила 50 ходов)
        this.positionHistory = [];
    }

    setGameColor(){
        if (Math.floor(Math.random() * 2) == 1){
                this.player1.changeGameColor("white");
                this.player1.changeGameColor("black");
        }
        else{
                this.player1.changeGameColor("black");
                this.player1.changeGameColor("white");
        }
    }

    startGame(){
        this.player1.socket.emit("startGame")
        this.player2.socket.emit("startGame")
    }
}