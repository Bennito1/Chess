import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import GetMove from "../gameScripts/getMove";
import { socket, useMapContext } from "../App";
import { mapStore } from "../store/mapStore";
import Change from "../gameScripts/change";
import ReactDOM from 'react-dom'

const getMove = new GetMove
const change = new Change

const TakeForm:FC <{cord:number, newId:number}> = ({cord, newId}) =>{
        const y = Math.floor(newId / 10) - 1
        const x = newId - (y + 1) * 10 - 1
        const yOld = Math.floor(cord / 10) - 1
        const xOld = cord - (yOld + 1) * 10 - 1
   
        const [showOptions, setShowOptions] = useState(false)
   
        const handleClick = () => {
            console.log(yOld, xOld)
            if ((mapStore.map[yOld][xOld] === "P" || mapStore.map[yOld][xOld] === "p") && (y === 7 || y === 0)) {
                setShowOptions(!showOptions)
                return
            }
            if(showOptions == false){
                const newMap = getMove.move(cord, newId, mapStore.map)
                console.log(newMap)
                mapStore.setMap(newMap)
                socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
           }
        };
   
        const handleOptionClick = (type: string) => {
            const newMap = getMove.vale(cord, newId, type)
            mapStore.setMap(newMap);
            socket.emit('move', mapStore.map, mapStore.ID, mapStore.gameColor)
            setShowOptions(false)
        };
   
        return (
            <>
                <button id={`${cord}`} className={`take_size`} onClick={handleClick}>
                    <div className="take"></div>
                </button>
                {showOptions && ReactDOM.createPortal(
                    <div className="window">
                        <button className="chose" onClick={() => handleOptionClick("k")}>
                            <img src={require(`../images/k${change.changeColorFigure(mapStore.map[yOld][xOld])}.png`)} className="size_figure" alt="Королева" />
                        </button>
                        <button className="chose" onClick={() => handleOptionClick("s")}>
                            <img src={require(`../images/s${change.changeColorFigure(mapStore.map[yOld][xOld])}.png`)} className="size_figure" alt="Слон" />
                        </button>
                        <button className="chose" onClick={() => handleOptionClick("l")}>
                            <img src={require(`../images/l${change.changeColorFigure(mapStore.map[yOld][xOld])}.png`)} className="size_figure" alt="Ладья" />
                        </button>
                        <button className="chose" onClick={() => handleOptionClick("q")}>
                            <img src={require(`../images/q${change.changeColorFigure(mapStore.map[yOld][xOld])}.png`)} className="size_figure" alt="Ферзь" />
                        </button>
                    </div>,
                    document.body
                )}
            </>
       )
} 

export default observer(TakeForm)