import { mapStore } from "../store/mapStore";
import Change from "./change";

const change = new Change


class Check{
    imit(Id:number, fcord:number){
        console.log("imit")
        const fmap = JSON.parse(JSON.stringify(mapStore.map))
        const yf = Math.floor(fcord/10) -1
        const xf = fcord - ((yf+1)*10) - 1
        const yid = Math.floor(Id/10) -1
        const xid = Id - ((yid+1)*10) - 1
        const f = fmap[yf][xf]
        console.log(fmap)
        fmap[yf][xf] = '0'
        fmap[yid][xid] = f
        console.log(mapStore.map, this.isCheck(fmap))
        return(this.isCheck(fmap))
    }

    isCheck(map:string[][]) {
        const kingPosition = this.findKr(map, mapStore.gameColor)
        if (!kingPosition) return false

        const [kingY, kingX] = kingPosition
        
        return(
            this.checkLQ(map, kingY, kingX) || this.checkSQ(map, kingY, kingX) ||this.checkK(map, kingY, kingX)
            || this.checkP(map, kingY, kingX) || this.checkKr(map, kingY, kingX)
        )
    }

    findKr(map:string[][], kingColor:string) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (map[y][x] === (kingColor === 'white' ? 'KR' : 'kr')) {
                    return [y, x]
                }
            }
        }
        return null;
    }

    checkLQ(map:string[][], kingY:number, kingX:number){
        let a = 0
        let b = 0
        let c = 0
        let d = 0

        for (let i = 1; i < 8; i++){
            if(a !=1){
                if ( (kingY - i) >=0 ){
                    if(map[kingY - i][kingX] == change.changeName("l", mapStore.enemyColor) || map[kingY - i][kingX] == change.changeName("q", mapStore.enemyColor)){
                        return true  
                    }
                    else if ((kingY - i) >=0 && (map[kingY - i][kingX] == "0") ){
    
                    }
                    else {
                       a = 1 
                    }     
                }
            }
            
            if( b !=1){
                if ( (kingX - i) >=0){
                    if (map[kingY][kingX-i] == change.changeName("l", mapStore.enemyColor) || map[kingY][kingX-i] == change.changeName("q", mapStore.enemyColor)){
                        return true  
                    }
                    else if ((kingX - i) >=0 &&(map[kingY][kingX-i] == "0") ){
                    }
                    else{
                        b = 1
                    }
                }
            }
            if( c !=1){
                if ( (kingY + i) <=7){
                    if(map[kingY+i][kingX] == change.changeName("l", mapStore.enemyColor) || map[kingY+i][kingX] == change.changeName("q", mapStore.enemyColor)){
                        return true
                    }
                    else if ((kingY + i) <=7 &&(map[kingY+i][kingX] == "0") ){
                    }
                    else{
                        c = 1
                    }
                }
            }
            if( d !=1){
                if ((kingX + i) <=7){
                    if (map[kingY][kingX+i] == change.changeName("l", mapStore.enemyColor) || map[kingY][kingX+i] == change.changeName("q", mapStore.enemyColor)){
                        return true    
                    }
                    else if ((kingX + i) <=7 &&(map[kingY][kingX+i] == "0") ){
                    }
                    else{
                        d = 1
                    }
                }
            }
        }
        return false
    
    }
    checkSQ(map:string[][], kingY:number, kingX:number){
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        for (let i = 1; i < 8; i++){
            if (a == 0){
                if((kingY + i) <=7  && (kingX +i) <= 7){
                    if (map[kingY +i][kingX +i] == change.changeName("s", mapStore.enemyColor) || map[kingY +i][kingX +i] == change.changeName("q", mapStore.enemyColor)){
                        return true
                    }
                    else if ((kingY + i) <=7 && (kingX +i) <= 7 && (map[kingY +i][kingX +i] == "0")){
                    }
                    else{
                        a = 1
                    }
                }
            }
            if (b == 0){
                if((kingY + i) <=7 && (kingX -i) >=0){
                    if (map[kingY +i][kingX -i] == change.changeName("s", mapStore.enemyColor) || map[kingY +i][kingX -i] == change.changeName("q", mapStore.enemyColor)){
                        return true
                    }
                    else if ((kingY + i) <=7 && (kingX -i) >=0 && (map[kingY +i][kingX -i] == "0")){
                    }
                    else{
                        b =1
                    }
                }
            }
            if (c == 0){
                if((kingY -i) >=0 && (kingX +i) <= 7){
                    if (map[kingY -i][kingX +i] == change.changeName("s", mapStore.enemyColor) || map[kingY -i][kingX +i] == change.changeName("q", mapStore.enemyColor)){
                        return true
                    }
                    else if ((kingY -i) >=0 && (kingX +i) <= 7 && (map[kingY -i][kingX +i] == "0")){
                    }
                    else{
                        c =1
                    } 
                }
            }
            if (d == 0){
                if((kingY -i) >=0 && (kingX -i) >=0){
                    if(map[kingY -i][kingX -i] == change.changeName("s", mapStore.enemyColor) || map[kingY -i][kingX -i] == change.changeName("q", mapStore.enemyColor)){
                        return true
                    }
                    else if ((kingY -i) >=0 && (kingX -i) >= 0 && (map[kingY -i][kingX -i] == "0")){
                    }
                    else{
                        d =1
                    }
                }
            }
        }
        return false
    }
    checkK(map:string[][], kingY:number, kingX:number){
        const moves = [
            [-2, -1], [-2, 1], 
            [-1, -2], [-1, 2], 
            [1, -2], [1, 2],  
            [2, -1], [2, 1]    
        ]
        for (const move of moves){
            if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
                if  (map[kingY +move[0]][kingX +move[1]] == change.changeName("k", mapStore.enemyColor)){
                    return true
                }
            }
        }
        return false
    }
    checkP(map:string[][], kingY:number, kingX:number){
        const moves = [
            [-1,-1], [-1,1],
            [1,-1], [1, -1]
        ]
        for (const move of moves){
            if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
                if  (map[kingY +move[0]][kingX +move[1]] == change.changeName("p", mapStore.enemyColor)){
                    return true
                }
            }
        }
        return false
    }
    checkKr(map:string[][], kingY:number, kingX:number){
        const moves =[
            [1,1], [1,-1], [1,0],
            [0,1],[0,-1],
            [-1,1],[-1,0],[-1,-1]
    
        ]
        for (const move of moves){
            if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
                if  (map[kingY +move[0]][kingX +move[1]] == change.changeName("kr", mapStore.enemyColor)){
                    return true
                }
            }
        }
        return false
    }
}

export default Check