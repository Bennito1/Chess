import { observer } from "mobx-react-lite";
import React, {FC} from "react";

const FugureForm: FC <{ figure: string; color: string }> = ({ figure, color }) =>{
    const imagePath = require(`../images/${figure}${color}.png`)
    return(
        <img src={imagePath} className="size_figure"></img>
    )
}

export default observer(FugureForm)

