import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import GetMove from "../gameScripts/getMove";
import { useMapContext } from "../App";
import { mapStore } from "../store/mapStore";

const getMove = new GetMove


const ValeForm:FC <{cord:number, newId:number}> = ({cord, newId}) =>{

    const {setMap} =useMapContext()
    const {map} = useMapContext()

    return(
        <button id = {`${cord}`} 
            className={`vale`} 
            onClick={() => {
                const newMap = getMove.move(cord, newId, map)
                console.log(newMap)
                mapStore.setMap(newMap)
            }}
            ></button>
    )

} 

export default observer(ValeForm)