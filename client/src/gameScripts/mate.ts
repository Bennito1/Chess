import { mapStore } from "../store/mapStore"
import Vale from "./vale"
import Change from "./change"

const vale = new Vale
const change = new Change

class CheckMate{
    checkMate(){
        for (let y =0;y<=7;y++){
            for (let x =0; x<=7; x++){
                const id = (y+1)*10 +x +1
                if ((mapStore.map[y][x] == "p" || mapStore.map[y][x] == "P") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.pGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.pGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else if ((mapStore.map[y][x] == "K" || mapStore.map[y][x] == "k") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.kGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.kGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else if ((mapStore.map[y][x] == "L" || mapStore.map[y][x] == "l") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.lGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.lGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else if ((mapStore.map[y][x] == "S" || mapStore.map[y][x] == "s") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.sGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.sGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else if ((mapStore.map[y][x] == "Q" || mapStore.map[y][x] == "q") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.qGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.qGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else if ((mapStore.map[y][x] == "KR" || mapStore.map[y][x] == "kr") && mapStore.gameColor == change.changeColorFigure(mapStore.map[y][x])){
                    if (vale.krGo(mapStore.map, id, mapStore.gameColor).returnVale.length != 0 || vale.krGo(mapStore.map, id, mapStore.gameColor).take.length != 0) 
                        return true
                }
                else{
    
                }
            }
        }
    }
}

export default CheckMate