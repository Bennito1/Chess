import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import GetMove from "../gameScripts/getMove";
import { useMapContext } from "../App";
import { mapStore } from "../store/mapStore";

const getMove = new GetMove


const TakeForm:FC <{cord:number, newId:number}> = ({cord, newId}) =>{

    return(
        <button id = {`${cord}`} 
            className={`take_size`} 
            onClick={() => {
                const newMap = getMove.move(cord, newId, mapStore.map)
                console.log(newMap)
                mapStore.setMap(newMap)
            }}
            ><div className="take"></div></button>
    )

} 

export default observer(TakeForm)