import { observe } from "mobx";
import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import "../styels/main_window.css"
import { IUser } from "../models/user";
import { Context } from "..";
import LoginForm from "./loginForm";
import { socket } from "../App";
import { mapStore } from "../store/mapStore";
import "../styels/play_sound.css"

import useSound from 'use-sound'
import ChatForm from "./ChatForm";

const MainForm: FC = () =>{
    const {store} = useContext(Context)

    const[menuHidden, setmNenuState] = useState(true)
    const[endTimeOit, setEndTimeOit] = useState(true)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [isSearch, setIsSearch] = useState(localStorage.getItem("searchState"))
    const [enemyName, setEnemyName] = useState(localStorage.getItem("enemyName"))
    const[showProfillMode, setTorF] = useState(true)
    const[faundMod, setFgm] = useState(true)

    const soundBut = require("../sound/soundName_01.mp3")
    const [playSound_but] = useSound(soundBut, { volume: 0.7 })

    const soundStF = require("../sound/wargoal_meloboom.mp3")
    const [playSound_StF] = useSound(soundStF, { volume: 0.7 })

    
    const main_Pony_music = require("../music/Pony_theme/The_Stars_Will_Aid_Her_Escape.mp3")
    const main_SVO_music = require("../music/SVO_theme/AMOR_ED.mp3")
    const [PlayMainPonyMusic, { stop: stopMPM }] = useSound(main_Pony_music, { volume: 0.15 })
    const [PlayMainSVOMusic, { stop: stopMSM }] = useSound(main_SVO_music, { volume: 0.15 })
    const [mainMusicState, setMainMusicState] = useState(false)
    const [StatPlayMus, setStatPlayMus] = useState(true)
    const [PonyState, setPonyState] = useState(true)
    const [PlayerSettingsOp, setPlayerSettingsOp] = useState(true)

    function playerOp(){
        setPlayerSettingsOp(!PlayerSettingsOp)
    }

    function SwitchMusic(){
        setMainMusicState(!mainMusicState)
    }

    function SwitchThemeMusic(){
        setPonyState(!PonyState)
        console.log("ueban")
    }

    function startMusMinPony(){
        PlayMainPonyMusic()
        setStatPlayMus(false)
        console.log("PonyState",PonyState)
        setTimeout(()=>{
            if (PonyState == true){
                stopMPM(), startMusMinPony(), console.log("PonyState",PonyState)
            }
        }, 10000/*195600*/)
    }

    function startMusMinSVO(){
        PlayMainSVOMusic()
        setStatPlayMus(false)
        setTimeout(()=>{stopMSM(), startMusMinSVO()}, 132200)
    }

    if ((mainMusicState == true) && (StatPlayMus == true)){
        if (PonyState == true){
            startMusMinPony()
        }
        else {
            startMusMinSVO()
        }
        console.log("PonyState",PonyState)
        console.log("mainMusicState", mainMusicState)
        console.log("StatPlayMus", StatPlayMus)
    }
    else if ((mainMusicState == false) && (StatPlayMus == false)){ 
        stopMPM()
        stopMSM()
        setStatPlayMus(true)
        console.log("mainMusicState", mainMusicState)
        console.log("StatPlayMus", StatPlayMus)
    }

    if(store.isAuth == true){
        localStorage.setItem("name", store.user.username)
    }
    else if(store.isAuth == false){
        if (localStorage.getItem("name")){
        }
        else{
            console.log(localStorage)
            localStorage.setItem("name", ("user " + Math.floor(Math.random()*1000)))
        }
    }
    function hiddenNo (){
        setEndTimeOit(false)
        setmNenuState(!menuHidden)
        setTimeout(() => {setEndTimeOit(true)}, 450)
        playSound_but()
    }

    function startFg(){
        playSound_StF()
        //setFgm(!faundMod)
        setmNenuState(!menuHidden)
        setEndTimeOit(false)
        setTimeout(() => {setEndTimeOit(true)}, 450)
        const id = socket.id
        if(store.isAuth){
            localStorage.setItem("searchState", "true")
            setIsSearch(localStorage.getItem("searchState"))
        }
        else{
            localStorage.setItem("searchState", "true")
            setIsSearch(localStorage.getItem("searchState"))
        }
        localStorage.removeItem("enemyName")
        socket.emit('playerReady', id)
    }


    function profil_mode(){
        setTorF(!showProfillMode)
        
    }

    function stopSerch(){
        localStorage.removeItem("searchState")
        setIsSearch(localStorage.getItem("searchState"))
        console.log(localStorage)
        const id = socket.id
        socket.emit("stopSerch", id)
    }

    function backGame(){
        window.location.href = '/game'
    }

    function login(){
        playSound_but()
        setTimeout(() => {window.location.href = "/reg"}, 150)
    }
    socket.on('startGame', () => {
        window.location.href = '/game'
    })
    

    return(
        <div>

            <div className='player_mus_main' onClick={playerOp}></div>

                <div className={PlayerSettingsOp?"hidden help_main_mus":"help_main_mus"}>
                    <div className="circle_main_left"></div>
                    <div className="circle_main_right"></div>
                    <div className="but_switch_music" onClick={SwitchMusic}>play/stop</div>
                    <div className="but_switch_theme_music" onClick={SwitchThemeMusic}>switch</div>
            </div>
            
            <button  onClick={() => {localStorage.removeItem("enemyName")}}>del enemyName</button>
            <div className="profile">

                <div className="user_name">{store.isAuth ? store.user.username : <button onClick={() => login()}>Войти</button>}</div>
                <div className="mmr">mmr: {store.isAuth ? store.user.mmr : ''}</div>
                <div className="show_profill" onClick={profil_mode}></div>

                <div className={showProfillMode?"profile_mode hidden":"profile_mode"}>

                    <div className="prof">

                        <div className="icon_prof"></div>
                        <div className="name_icon">profil</div>

                    </div>
                    <div className="friends">

                        <div className="icon_friends"></div>
                        <div className="name_icon">friends</div>

                    </div>

                    <div className="masendges">

                        <div className="icon_masendges"></div>
                        <div className="name_icon">masendges</div>

                    </div>

                    <button className={store.isAuth ? "out" : "hidden"} onClick={() => store.logout()}>Выйти</button>
                    
                </div>

            </div>     
                
            <menu className= {menuHidden ? ( endTimeOit ? "hidden" : "posiv" ) : (endTimeOit ? "active" : "active" )}>
                
                <li className="menu="><span className="menu_runced">menu1</span></li>
                <li className="menu="><span className="menu_unranced">menu2</span></li>
                <button className="play_h" onClick={startFg}>play</button>
                <button className="but_cl_menu" onClick={() => hiddenNo()}>Назад</button>

            </menu>

            <div className={menuHidden ? ( endTimeOit ? "but_chous" : "but_chous posiv" ): (endTimeOit ? "hidden" : "but_chous active" )}>
                {
                    isSearch?
                        enemyName?
                            <button className="but_op_menu" onClick={backGame}>вернуться в игру</button>:
                            <button className="but_op_menu" onClick={stopSerch}>отменить поиск</button>
                        :
                        enemyName?
                        <button className="but_op_menu" onClick={backGame}>вернуться в игру</button>:
                        <button className="but_op_menu" onClick={hiddenNo}>ИГРАТЬ</button>
                }

            </div>
                <ChatForm
                    window="main"
                />
            <div className={faundMod?"game_search hidden" : "game_search"} >

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

