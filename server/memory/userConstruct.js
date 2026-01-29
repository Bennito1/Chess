class UserConstruct {
    constructor(socket, userDate){
        this.socket = socket;
        this.socketID = socket.id;

        this.userID = userDate.id;
        this.username = userDate.username;
        this.mmr = userDate.mmr || 100;

        this.isOnline = router;
        this.currentGameID = null;
        this.isSearch = false;

        this.gameColor = "none";
    }
    
    startSearch(){
        this.isSearch = true;
        this.currentGameID = null;
    }

    changeGameColor(color){
        this.gameColor = color;
        this.socket.emit('gameColor', color);
    }

}