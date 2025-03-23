import { observer } from "mobx-react-lite";
import React, { FC } from "react";


const ErrorForm: FC = () =>{
    return(
        <div>404 Страницы не существует</div>
    )
}

export default observer(ErrorForm)