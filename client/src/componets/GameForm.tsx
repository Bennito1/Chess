import { observer } from "mobx-react-lite";
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import "../styels/chess.css"
import FigureForm from "./FigureForm";
import Change from "../gameScripts/change";
import Vale from "../gameScripts/vale";
import ValeForm from "./ValeForm";
import { socket, useMapContext } from "../App";
import TakeForm from "./TakeForm";
import { mapStore } from "../store/mapStore";

const change = new Change
const vale = new Vale
let getID = false


const GameForm: FC = () => {   


    const {map, ID, gameColor, setMap, setGameColor} = useMapContext()
    const [stateVale, setVale] = useState<number[]>([])
    const [stateTake, setTake] = useState<number[]>([])
    const [moveColor, setMoveColor] = useState<string>("white")

    useEffect(() => {
        if (!mapStore.getID) {
            socket.emit('idGame');
        }

        const handleGiveID = (gameID: number) => {
            mapStore.setGetId(true) 
            mapStore.setID(gameID)
            socket.emit('giveColor', ID)
        };

        const handleBoardState = (newMap: string[][]) => {
            setMap(newMap)
        };

        const handleGameColor = (color: string) => {
            setGameColor(color)
        };

        const handleHodColor = (color: string) => {
            setMoveColor(color)
        };

        socket.on('giveID', handleGiveID);
        socket.on('boardState', handleBoardState);
        socket.on('gameColor', handleGameColor);
        socket.on('hodColor', handleHodColor);

        return () => {
            socket.off('giveID', handleGiveID);
            socket.off('boardState', handleBoardState);
            socket.off('gameColor', handleGameColor);
            socket.off('hodColor', handleHodColor);
        };
    }, [ID, setMap]);

    useEffect(() => {
        setTake([]);
        setVale([]);
        renderBoard();
    }, [map]);

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
                {stateTake.includes(cord) && <TakeForm
                    cord = {stateTake[stateTake.indexOf(cord)-1] /10}
                    newId={cord} 
                    />}
            </div>
        )
    }
    

    const getVale = (cord:number, figure:string, color:string) =>{
        if (color != gameColor || color != moveColor){
            return
        }
        if (figure =="p"){
            const returnVale = vale.pGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
        if (figure =="k"){
            const returnVale = vale.kGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
        if (figure =="s"){
            const returnVale = vale.sGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
        if (figure =="l"){
            const returnVale = vale.lGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
        if (figure =="kr"){
            const returnVale = vale.krGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
        if (figure =="q"){
            const returnVale = vale.qGo(map, cord, color);
            if (JSON.stringify(stateVale) === JSON.stringify(returnVale.returnVale)) {
                setVale([])
            }
            else{
                setVale(returnVale.returnVale) 
            } 
            if (JSON.stringify(stateTake) === JSON.stringify(returnVale.take)) {
                setTake([])
            }
            else{
                setTake(returnVale.take)
            }
        }
    }

    const spawnFigure = (figure:string, cord:number) =>{
        if (figure == '0'){
            return null
        }
        return(
            <button id ={`${cord}`} 
                className ={`figure ${change.changeFigure(figure)} ${change.changeColorFigure(figure)} size_figure`} 
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