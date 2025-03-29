import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import GetMove from "../gameScripts/getMove";
import { socket, useMapContext } from "../App";
import { mapStore } from "../store/mapStore";
import Change from "../gameScripts/change";

const getMove = new GetMove
const change = new Change

const ValeForm:FC <{cord:number, newId:number}> = ({cord, newId}) =>{
    const y = Math.floor(newId/10)-1 
    const x = newId - (y+1)*10 - 1
    if(mapStore.map[y][x] != '0'){
        return(null)
    }
    return(
        <button id = {`${cord}`} 
            className={`vale_size`} 
            onClick={() => {
                const newMap = getMove.move(cord, newId, mapStore.map)
                console.log(newMap)
                mapStore.setMap(newMap)
                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
            }}
            ><div className="vale"></div></button>
    )

} 

export default observer(ValeForm)