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
    const yOld = Math.floor(cord/10)-1 
    const xOld = cord - (y+1)*10 - 1
    if(mapStore.map[y][x] != '0'){
        return(null)
    }
    
    return(
        <button id = {`${cord}`} 
            className={`vale_size`} 
            onClick={() => {
                if((mapStore.map[yOld][xOld] == "p" || mapStore.map[yOld][xOld] == "p") && (y == 7 || y ==0)){
                    const sPath = require(`../images/s${mapStore.gameColor}.png`)
                    const qPath = require(`../images/q}${mapStore.gameColor}.png`)
                    const lPath = require(`../images/l${mapStore.gameColor}.png`)
                    const kPath = require(`../images/k${mapStore.gameColor}.png`)
                    return(
                        <div className = "window">
                            <button className="chose" onClick={() =>{
                                const newMap = getMove.vale(cord, newId, "k")
                                mapStore.setMap(newMap)
                                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
                            }}>
                                <img src={kPath} className="size_figure"></img>
                            </button>
                            <button className="chose" onClick={() =>{
                                const newMap = getMove.vale(cord, newId, "s")
                                mapStore.setMap(newMap)
                                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
                            }}>
                                <img src={sPath} className="size_figure"></img>
                            </button>
                            <button className="chose" onClick={() =>{
                                const newMap = getMove.vale(cord, newId, "l")
                                mapStore.setMap(newMap)
                                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
                            }}>
                                <img src={lPath} className="size_figure"></img>
                            </button>
                            <button className="chose" onClick={() =>{
                                const newMap = getMove.vale(cord, newId, "q")
                                mapStore.setMap(newMap)
                                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
                            }}>
                                <img src={qPath} className="size_figure"></img>
                            </button>
                        </div>
                    )
                }
                if(getMove.castling(cord, newId, mapStore.map[yOld][xOld]) != mapStore.map){
                    const newMap = getMove.castling(cord, newId, mapStore.map[yOld][xOld])
                    if (newMap != undefined){
                        console.log(newMap)
                        mapStore.setMap(newMap)
                        mapStore.setKmove(true)
                        return socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
                    }
                }

                const newMap = getMove.move(cord, newId, mapStore.map)
                console.log(newMap)
                mapStore.setMap(newMap)
                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
            }}
            ><div className="vale"></div></button>
    )

} 

export default observer(ValeForm)