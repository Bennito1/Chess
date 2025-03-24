import Change from "./change"

const change = new Change

class Vale{

    pGo(map:string[][], cord:number, color:string){
        const y = Math.floor(cord/10)-1 
        const x = cord - (y+1)*10 - 1
        let returnVale = []
        if (color == 'white') {
            if (map[y - 1][x] == '0' ) {
                const newId = cord - 10
                returnVale.push(cord *10, newId)
            }
            if (y == 6 && map[y - 1][x] == '0' && map[y - 2][x] == '0' ) {
                const newId = cord - 20
                returnVale.push(cord *10, newId)
            }
            if (x > 0 && map[y - 1][x - 1] != '0' && change.changeColorFigure(map[y - 1][x - 1]) == 'black')  {
                const newId = cord - 11;
                returnVale.push(cord *10, newId)
            }
            if (x < 7 && map[y - 1][x + 1] != '0' && change.changeColorFigure(map[y - 1][x + 1]) == 'black') {
                const newId = cord - 9;
                returnVale.push(cord *10, newId)
            }
            return returnVale
        }
        if (map[y + 1][x] == '0' ) {
            const newId = (y+1)*10 + x+1 + 10;
            returnVale.push(cord *10, newId)
        }
        if (y == 1 && map[y + 1][x] == '0' && map[y + 2][x] == '0') {
            const newId = (y+1)*10 + x+1 + 20;
            returnVale.push(cord *10, newId)
        }
        if (x > 0 && map[y + 1][x - 1] != '0' && change.changeColorFigure(map[y + 1][x - 1]) == 'white') {
            const newId = (y+1)*10 + x+1 + 9;
            returnVale.push(cord *10, newId)
        }
        if (x < 7 && map[y + 1][x + 1] != '0' && change.changeColorFigure(map[y + 1][x + 1]) == 'white') {
            const newId =(y+1)*10 + x+1 + 11;
            returnVale.push(cord *10, newId)
        }
        return returnVale
    }

    kGo(map:string[][], cord:number, color:string){
        const y = Math.floor(cord/10)-1
        const x = cord - (y+1)*10 - 1
        const moves = [
            [-2, -1], [-2, 1], 
            [-1, -2], [-1, 2], 
            [1, -2], [1, 2],  
            [2, -1], [2, 1]    
        ]
        let returnVale =[]
        for (let move of moves) {
            let newY = y + move[0];
            let newX = x + move[1];
            if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) { 
                if (map[newY][newX] == '0') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    returnVale.push(cord *10, newId)
                } 
                else if (change.changeColorFigure(map[newY][newX]) != color) { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    returnVale.push(cord *10, newId)
                }
            }
        }
        return returnVale
    }

    sGo(map:string[][], cord:number, color:string){
        const y = Math.floor(cord/10)-1 
        const x = cord - (y+1)*10 - 1
        let a_stop = 0
        let b_stop = 0
        let c_stop = 0
        let d_stop = 0
        let returnVale = []
        for(let i = 1; i<9; i++){
            if((y+i) <=7 && (x+i) <=7 && a_stop == 0){
                if(map[y+i][x+i] == '0'){
                    const newId = (y+1+i)*10 + x+1+i
                    returnVale.push(cord *10, newId)
                }
                else if(change.changeColorFigure(map[y+i][x+i]) != color)  {
                    const newId = (y+1+i)*10 + x+1+i
                    returnVale.push(cord *10, newId)
                    a_stop = 1
                }
                else{
                    a_stop = 1 
                }
            }
            if((y+i) <=7 && (x-i)>=0 && b_stop == 0){
                if(map[y+i][x-i] == '0'){
                    const newId = (y+1+i)*10 + x+1-i
                    returnVale.push(cord *10, newId)
                }
                else if(change.changeColorFigure(map[y+i][x-i]) != color){
                    const newId = (y+1+i)*10 + x+1-i
                    returnVale.push(cord *10, newId)
                    b_stop = 1
                }
                else{
                    b_stop = 1 
                }
            }
            if((y-i) >=0 && (x+i)<=7 && c_stop == 0 ){
                if(map[y-i][x+i] == '0'){
                    const newId = (y+1-i)*10 + x+1+i
                    returnVale.push(cord *10, newId)
                }
                else if(change.changeColorFigure(map[y-i][x+i]) != color){
                    const newId = (y+1-i)*10 + x+1+i
                    returnVale.push(cord *10, newId)
                    c_stop =1
                }
                else{
                    c_stop = 1 
                } 
            }
            if((y-i) >=0 && (x-i) >=0 && d_stop == 0){
                if(map[y-i][x-i] == '0' ){
                    const newId = (y+1-i)*10 + x+1-i
                    returnVale.push(cord *10, newId)
                }
               else if(change.changeColorFigure(map[y-i][x-i]) != color){
                    const newId = (y+1-i)*10 + x+1-i
                    returnVale.push(cord *10, newId)
                    d_stop = 1
                }
                else{
                    d_stop = 1 
                }
            }
        }
        return returnVale
    }
   
}


export default Vale