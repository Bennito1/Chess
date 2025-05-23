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
import CheckMate from "../gameScripts/mate"
import Check from "../gameScripts/check";
import useSound from "use-sound";
import ChatForm from "./ChatForm";

const checkMate = new CheckMate
const change = new Change
const vale = new Vale
const check = new Check

const GameForm: FC = () => {   


    const {map, ID, gameColor, moveColor, setMap} = useMapContext()
    const [valeFigure, setValeFigure] = useState<boolean>(false)
    const [stateVale, setVale] = useState<number[]>([])
    const [stateTake, setTake] = useState<number[]>([])
    const [kingCheck, setkingCheck] = useState<number>()
    const [gameEnd, setGameEnd] = useState<boolean>(false)
    const [hodStatus, setHodStatus] = useState<string>("Белые ходят")
    const [endGameState, setGameState] = useState<string>("none")
    const [enemyName, setEnemyName] = useState<string>('enemy loading')
    
    useEffect(() => {
        if(localStorage.getItem("enemyName")){
            mapStore.setGetId(true)
            socket.emit('resaveId', localStorage.getItem("name"))
        }
        
        if (!mapStore.getID) {
            socket.emit('idGame', localStorage.getItem("name"))
        }

        const handleGiveID = (gameID: number) => {
            mapStore.setGetId(true) 
            mapStore.setID(gameID)
            socket.emit('giveColor', mapStore.ID)
            socket.emit('getEnemyName', mapStore.ID, localStorage.getItem('name'))
        }

        const handelEnemyName = (enemyName:string) =>{
            localStorage.setItem("enemyName", enemyName)
            setEnemyName(enemyName)
        }

        const setNewData = (ID:number, moveColor:string, color:string, newMap:string[][]) =>{
            mapStore.setID(ID)
            mapStore.setGameColor(color)
            mapStore.setMoveColor(moveColor)
            mapStore.setMap(newMap)
            if(check.isCheck(newMap)){
                const kingPos = check.findKr(newMap, mapStore.gameColor)
                if(kingPos != null){
                    setkingCheck(kingPos[0]*10 + kingPos[1] +11)
                }
            }
            else{
                setkingCheck(1000)
            }
            if(checkMate.checkMate() == true){
                return(null)
            }
            console.log("мат")
            endGame()
        }

        const handleBoardState = (newMap: string[][]) => {
            mapStore.setMap(newMap)
            if(check.isCheck(newMap)){
                const kingPos = check.findKr(newMap, mapStore.gameColor)
                if(kingPos != null){
                    setkingCheck(kingPos[0]*10 + kingPos[1] +11)
                }
            }
            else{
                setkingCheck(1000)
            }
            if(checkMate.checkMate() == true){
                return(null)
            }
            localStorage.removeItem("enemyName")
            console.log("мат")
            endGame()
        };

        const handleGameColor = (color: string) => {
            mapStore.setGameColor(color)
        };

        const handleHodColor = (color: string) => {
            mapStore.setMoveColor(color)
            if(color == "white"){
                return setHodStatus("Белые ходят")
            }
            setHodStatus("Черные ходят")
        }

        const win = () =>{
            localStorage.removeItem("enemyName")
            setGameEnd(true)
            if(mapStore.gameColor == "white"){
                setHodStatus("Белые победили")
                setGameState("win")
            }
            setHodStatus("Черные победили")
            setGameState("win")
        }

        socket.on('enemyName', handelEnemyName)
        socket.on('giveID', handleGiveID)
        socket.on('boardState', handleBoardState)
        socket.on('gameColor', handleGameColor)
        socket.on('hodColor', handleHodColor)
        socket.on('win', win)
        socket.on('newData', setNewData)
        return () => {
            socket.off('giveID', handleGiveID);
            socket.off('boardState', handleBoardState);
            socket.off('gameColor', handleGameColor);
            socket.off('hodColor', handleHodColor);
            socket.off('win', win)
        };
    }, [ID, setMap]);

    useEffect(() => {
        setTake([]);
        setVale([]);
        renderBoard();
    }, [map]);

    function endGame(){
        if (gameEnd != true){
            socket.emit("endGame", ID)
            setGameEnd(true)
            if (mapStore.gameColor == "white"){
                setHodStatus("Черные победили")
                setGameState("lose")
            }
            setHodStatus("Белые победили")
            setGameState("lose")
        }
    }

    const spawnSqare= (y:number, x:number) =>{
        const cord = (y+1)*10 + (x+1)
        const color = (x+y)%2 == 0 ? "white" : "black"
        return(
            <div id={`${cord}`} className={kingCheck == cord ? `sqare ${color} red` : `sqare ${color}`}>
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
        if (color != gameColor || color != moveColor || gameEnd == true){
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
                className ={gameColor== "white" ? `figure ${change.changeFigure(figure)} ${change.changeColorFigure(figure)} size_figure ` : `figure ${change.changeFigure(figure)} ${change.changeColorFigure(figure)} size_figure rotate`} 
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

   
    /*if (CanPlay == true){
      playMusic()
    }*/
    

    return(
        <div>

            <div className={gameColor== "white" ? "board" : "board rotate"}>
                {renderBoard()}
            </div>
            <div className="gameStatus">{hodStatus}</div>
            <div className={gameEnd ? "window" : "hidden"}>{endGameState == "win" ? "Вы победили" : "Вы поиграли"}</div>
            <div className="main">
                <div>{localStorage.getItem("name")}</div>
                <div>{enemyName}</div>
            </div>

        </div>
    )
}

export default observer(GameForm)