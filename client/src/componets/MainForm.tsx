import { observe } from "mobx";
import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import "../styels/main_window.css"
import { IUser } from "../models/user";
import { Context } from "..";
import LoginForm from "./loginForm";
import { socket } from "../App";
import { mapStore } from "../store/mapStore";

const MainForm: FC = () =>{
    const {store} = useContext(Context)

    const[menuHidden, setmNenuState] = useState(true)
    const[endTimeOit, setEndTimeOit] = useState(true)
    const [showLoginForm, setShowLoginForm] = useState(false) 
    

    function hiddenNo (){
        setEndTimeOit(false)
        setmNenuState(!menuHidden)
        setTimeout(() => {setEndTimeOit(true)}, 450)
    }


    function login(){
        window.location.href = "/reg"
    }

    function startGame(){
        const id = socket.id
        socket.emit('playerReady', id)
        mapStore.setGetId(false)
    }
    socket.on('startGame', () => {
        window.location.href = '/game'
    })
    
    return(
        <div>
            <div className="profile">
                <div className="user_name">{store.isAuth ? store.user.username : <button onClick={() => login()}>Войти</button>}</div>
                <div className="">mmr: {store.isAuth ? store.user.mmr : ''}</div>
                <div className="show_profill"> </div>  
            </div> 
            <button className={store.isAuth ? "" : "hidden"} onClick={() => store.logout()}>Выйти</button>
            <menu className= {menuHidden ? ( endTimeOit ? "hidden" : "posiv" ) : (endTimeOit ? "active" : "active" )}>
                <li className="menu="><span className="menu_runced">menu1</span></li>
                <li className="menu="><span className="menu_unranced">menu2</span></li>
                <button className="play_h" onClick={startGame}>play</button>
                <button className="but_cl_menu" onClick={hiddenNo}>Назад</button>
            </menu>

            <div className={menuHidden ? ( endTimeOit ? "but_chous" : "but_chous posiv" ): (endTimeOit ? "hidden" : "but_chous active" )}>
                <button className="but_op_menu" onClick={hiddenNo}>ИГРАТЬ</button>
            </div>

            <div className="game_search hidden">
                <div className="text_saerch">Game search</div>
                <div className="time_search">00:00</div>
            </div>

            <div className={showLoginForm? ``:`hidden`}>
                <LoginForm/>
            </div>

            <div id="zv"></div>
            <div className="animation"></div>
        </div>
    )
}

export default observer (MainForm)

