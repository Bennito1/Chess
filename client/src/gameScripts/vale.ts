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
                returnVale.push(newId)
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
}


export default Vale