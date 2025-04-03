import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import GetMove from "../gameScripts/getMove";
import { socket, useMapContext } from "../App";
import { mapStore } from "../store/mapStore";

const getMove = new GetMove


const TakeForm:FC <{cord:number, newId:number}> = ({cord, newId}) =>{
    
    const y = Math.floor(newId/10)-1 
    const x = newId - (y+1)*10 - 1
    const yOld = Math.floor(cord/10)-1 
    const xOld = cord - (y+1)*10 - 1

    return(
        <button id = {`${cord}`} 
            className={`take_size`} 
            onClick={() => {
                if((mapStore.map[yOld][xOld] == "p" || mapStore.map[yOld][xOld] == "p") && (y == 8 || y ==0)){
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
                const newMap = getMove.move(cord, newId, mapStore.map)
                console.log(newMap)
                mapStore.setMap(newMap)
                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
            }}
        ><div className="take"></div></button>
    )
} 

export default observer(TakeForm)