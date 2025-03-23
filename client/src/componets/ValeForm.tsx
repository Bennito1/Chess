import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import GetMove from "../gameScripts/getMove";
import { useMapContext } from "../App";

const getMove = new GetMove


const ValeForm:FC <{cord:number, newId:number, map:string[][]}> = ({cord, newId, map}) =>{

    const {setMap} =useMapContext()

    return(
        <button id = {`${newId}`} 
            className={`vale`} 
            onClick={() => {setMap(getMove.move(cord, newId, map))
                console.log(map)
            }}
            ></button>

    )

} 

export default observer(ValeForm)