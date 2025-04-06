import { mapStore } from "../store/mapStore"
import Change from "./change"

const change = new Change

class GetMove {
    move(cord:number, newId:number, map:string[][]){
        const newMap= map.map(row => row.map(String))
        const yf = Math.floor(cord/10) -1
        const xf = cord - ((yf+1)*10) - 1
        const yid = Math.floor(newId/10) -1
        const xid = newId - ((yid+1)*10) - 1
        const f = newMap[yf][xf]
        if (f == "kr" || f == "KR"){
            mapStore.setKmove(true)
        }
        if ((f == "l" && cord == 18) || f == "L" && cord == 81){
            mapStore.setLleftmove(true)
        }
        if ((f == "l" && cord == 11) || f == "L" && cord == 88){
            mapStore.setLRightmove(true)
        }
        newMap[yf][xf] = '0'
        newMap[yid][xid] = f
        return newMap

    }

    vale(cord:number, newId:number, figure:string){
        const newMap= mapStore.map.map(row => row.map(String))
        const yf = Math.floor(cord/10) -1
        const xf = cord - ((yf+1)*10) - 1
        const yid = Math.floor(newId/10) -1
        const xid = newId - ((yid+1)*10) - 1
        const f = change.changeName(figure, mapStore.gameColor)
        if(f){
            newMap[yf][xf] = '0'
            newMap[yid][xid] = f
        }
        return newMap
    }

    castling(cord:number, newId:number, figure:string){
        if(newId == 17 && figure == "kr" && mapStore.K_Move == false && mapStore.L_leftMove == false){
            mapStore.K_Move = true
            mapStore.L_leftMove = true
            const newMap= mapStore.map.map(row => row.map(String))
            newMap[0][4] = "0"
            newMap[0][7] = "0"
            newMap[0][5] = "l"
            newMap[0][6] = "kr"
            return newMap
        }
        if(newId == 13 && figure == "kr" && mapStore.K_Move == false && mapStore.L_rightMove == false){
            mapStore.K_Move = true
            mapStore.L_rightMove = true
            const newMap= mapStore.map.map(row => row.map(String))
            newMap[0][4] = "0"
            newMap[0][0] = "0"
            newMap[0][3] = "l"
            newMap[0][2] = "kr"
            return newMap
        }
        if(newId == 83  && figure == "KR" && mapStore.K_Move == false && mapStore.L_leftMove == false){
            mapStore.K_Move = true
            mapStore.L_leftMove = true
            const newMap= mapStore.map.map(row => row.map(String))
            newMap[7][4] = "0"
            newMap[7][0] = "0"
            newMap[7][3] = "L"
            newMap[7][2] = "KR"
            return newMap
        }
        if(newId == 87 && figure == "KR" && mapStore.K_Move == false && mapStore.L_rightMove == false){
            mapStore.K_Move = true
            mapStore.L_rightMove = true
            const newMap= mapStore.map.map(row => row.map(String))
            newMap[7][4] = "0"
            newMap[7][7] = "0"
            newMap[7][5] = "L"
            newMap[7][6] = "KR"
            return newMap
        }
    }
}

export default GetMove