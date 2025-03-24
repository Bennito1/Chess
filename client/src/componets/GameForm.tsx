import { observer } from "mobx-react-lite";
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import "../styels/chess.css"
import FigureForm from "./FigureForm";
import Change from "../gameScripts/change";
import Vale from "../gameScripts/vale";
import ValeForm from "./ValeForm";
import { useMapContext } from "../App";


const change = new Change
const vale = new Vale

const GameForm: FC = () => {
    const {map, setMap} = useMapContext()

    const [stateVale, setVale] = useState<number[]>([])

    useEffect(() => {
        setVale([])
        renderBoard()
    }, [map])

    const spawnSqare= (y:number, x:number) =>{
        const cord = (y+1)*10 + (x+1)
        const color = (x+y)%2 == 0 ? "white" : "black"
        return(
            <div id={`${cord}`} className={`sqare ${color}`}>
                {spawnFigure(map[y][x], cord)}
                {stateVale.includes(cord) && <ValeForm
                    cord = {stateVale[stateVale.indexOf(cord)-1] /10}
                    newId={cord} 
                    />}
            </div>
        )
    }
    

    const getVale = (cord:number, figure:string, color:string) =>{
        if (figure =="p"){
            const returnVale = vale.pGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale)) {
                return setVale([])
            } 
            return setVale(returnVale);
        }
        if (figure =="k"){
            const returnVale = vale.kGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale)) {
                return setVale([])
            } 
            return setVale(returnVale);
        }
        if (figure =="s"){
            const returnVale = vale.sGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale)) {
                return setVale([])
            } 
            return setVale(returnVale);
        }
    }

    const spawnFigure = (figure:string, cord:number) =>{
        if (figure == '0'){
            return null
        }
        return(
            <button id ={`${cord}`} 
                className ={`figure ${change.changeFigure(figure)} ${change.changeColorFigure(figure)}`} 
                onClick={() =>getVale(cord, change.changeFigure(figure), change.changeColorFigure(figure))}
            >
                <FigureForm
                    figure = {change.changeFigure(figure)}
                    color = {change.changeColorFigure(figure)}
                />
            </button>
        )
    }
    const renderBoard = () =>{
        console.log(map)
        const rows = []
        for(let y = 0; y<8; y++){
            const cells = []
            for(let x = 0; x<8; x++){
                cells.push(spawnSqare(y, x))
            }
            rows.push(
                <div key={`${y}`} className="board-row">
                    {cells}
                </div>
            );
        }
        return rows
    }

    return(
            <div className="board">
                {renderBoard()}
            </div>
    )
}

export default observer(GameForm)