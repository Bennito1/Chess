import { observe } from "mobx";
import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import "../styels/main_window.css"
import { IUser } from "../models/user";
import { Context } from "..";
import LoginForm from "./loginForm";
import { socket } from "../App";
import { useRef } from 'react';
import "../styels/play_sound.css"

import useSound from 'use-sound'
import { request } from "axios";
import ChatForm from "./ChatForm";



const MainForm: FC = () =>{

    const {store} = useContext(Context)

    const[menuHidden, setmNenuState] = useState(true)
    const[endTimeOit, setEndTimeOit] = useState(true)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const[hindBut, sethindBut] = useState(true)
    const [userName, setUserName] = useState(localStorage.getItem("name"))
    const [enemyName, setEnemyName] = useState(localStorage.getItem("enemyName"))
    const[showProfillMode, setTorF] = useState(true)
    const[faundMod, setFgm] = useState(true)

    const main_Pony_music = require("../music/Pony_theme/The_Stars_Will_Aid_Her_Escape.mp3")
    const main_SVO_music = require("../music/SVO_theme/AMOR_ED.mp3")
    const [PlayMainPonyMusic, { stop: stopMPM }] = useSound(main_Pony_music, { volume: 0.15 })
    const [PlayMainSVOMusic, { stop: stopMSM }] = useSound(main_SVO_music, { volume: 0.15 })
    const [mainMusicState, setMainMusicState] = useState(false)
    const [StatPlayMus, setStatPlayMus] = useState(true)
    const [PonyState, setPonyState] = useState(true)
    const [PlayerSettingsOp, setPlayerSettingsOp] = useState(true)
    const [serchState, setSerchState] = useState<boolean>(false)
    
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
            if (PonyState == false){
                stopMPM(), startMusMinPony(), console.log("PonyState",PonyState)
            }
        }, 195600)
    }

    function startMusMinSVO(){
        PlayMainSVOMusic()
        setStatPlayMus(false)
        setTimeout(()=>{
            if (PonyState == true){
                stopMSM(), startMusMinSVO()
            }
        }, 132200)
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

    const soundBut = require("../sound/soundName_01.mp3")
    const [playSound_but] = useSound(soundBut, { volume: 0.7 })

    const soundStF = require("../sound/wargoal_meloboom.mp3")
    const [playSound_StF] = useSound(soundStF, { volume: 0.7 })

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
        console.log("1")
        //setFgm(!faundMod)
        setmNenuState(!menuHidden)
        setEndTimeOit(false)
        setTimeout(() => {setEndTimeOit(true)}, 450)
        const id = socket.id
        setSerchState(true)
        localStorage.removeItem("enemyName")
        socket.emit('playerReady', id)
    }

    function stopSerch(){
        setSerchState(false)
        console.log(localStorage)
        const id = socket.id
        socket.emit("stopSerch", id)
    }

    function backGame(){
        window.location.href = '/game'
    }

    function profil_mode(){
        setTorF(!showProfillMode)
        playSound_but()
    }

    const [ProfOpenClous, setProfOpenClous] = useState(true)
    const [ProfOpen, setProfOpen] = useState(true)
    const [ProfClous, setProfClous] = useState(true)

    function profClick(){
        playSound_but()
        setProfOpen(false)
        setProfOpenClous(true)
        setProfClous(true)
    }

    function freienClick(){
        playSound_but()
    }

    function masClick(){
        playSound_but()
    }

    function login(){
        playSound_but()
        setTimeout(() => {window.location.href = "/reg"}, 150)
    }

   
    socket.on('startGame', () => {
        window.location.href = '/game';
    })

    const [profileState, setProfileState] = useState(true)
    const [friendState, setFriendState] = useState(false)
    const [settingsState, setSettingsState] = useState(false)

    function outBut(){
        playSound_but()
        setTimeout(() => {setProfClous(false)}, 1000)
        setProfOpen(true)
        setProfOpenClous(false)
        
    }


    function pageProfile(){
        playSound_but()
    }

    function pageHist(){
        playSound_but()
    }

    function pageReward(){
        playSound_but()
    }

    function pegeFriends(){
        playSound_but()
    }

    function pegeMasendge(){
        playSound_but()
    }

    function pegeInvite(){
        playSound_but()
    }

    function pegeSettings(){
        playSound_but()
    }

    function pegeStyles(){
        playSound_but()
    }

    function prof_but(){
        playSound_but()
        setProfileState(true)
        setFriendState(false)
        setSettingsState(false)
    }

    function friend_but(){
        playSound_but()
        setProfileState(false)
        setFriendState(true)
        setSettingsState(false)
    }

    function setting_but(){
        playSound_but()
        setProfileState(false)
        setFriendState(false)
        setSettingsState(true)
    }    
    

    return(

        <div>
            <button onClick={() => {localStorage.removeItem("enemyName"), console.log(localStorage)}}>Удоли</button>
            <div className='player_mus_main' onClick={playerOp}></div>

            <div className={PlayerSettingsOp?"hidden help_main_mus":"help_main_mus"}>
                <div className="circle_main_left"></div>
                <div className="circle_main_right"></div>
                <div className="but_switch_music" onClick={SwitchMusic}>play/stop</div>
                <div className="but_switch_theme_music" onClick={SwitchThemeMusic}>switch</div>
            </div>
            

            <div className="profile">

                <div className="user_name">{store.isAuth ? store.user.username : <button className="loggin" onClick={() => login()}>Войти</button>}</div>
                <div className="mmr">mmr: {store.isAuth ? store.user.mmr : ''}</div>
                <div className="show_profill" onClick={profil_mode}></div>

                <div className={showProfillMode?"profile_mode hidden":"profile_mode"}>

                    <div className="prof" onClick={profClick}>

                        <div className="icon_prof"></div>
                        <div className="name_icon">profil</div>

                    </div>

                    <div className="friends" onClick={freienClick}>

                        <div className="icon_friends"></div>
                        <div className="name_icon">friends</div>

                    </div>

                    <div className="masendges" onClick={masClick}>

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
                    serchState?
                        enemyName?
                            <button className="but_op_menu" onClick={backGame}>вернуться в игру</button>:
                            <button className="but_op_menu" onClick={stopSerch}>отменить поиск</button>
                        :
                        enemyName?
                        <button className="but_op_menu" onClick={backGame}>вернуться в игру</button>:
                        <button className="but_op_menu" onClick={hiddenNo}>ИГРАТЬ</button>
                }

            </div>

            <div className={faundMod?"game_search hidden" : "game_search active"} >

                <div className="text_saerch">Game search</div>
                <div className="time_search">00:00</div>

            </div>

            <div className={showLoginForm? ``:`hidden`}>

                <LoginForm/>

            </div>

            <div id="zv"></div>

            <div className="animation"></div>

            <div>
                <ChatForm
                    window="main"
                />
            </div>


            <div className={ProfOpenClous?(ProfOpen?"darcned_screen hidden":"darcned_screen active"):(ProfClous?"darcned_screen posiv":"hidden")}>

                <div className="main_whindow">

                    <div className="help_bord">

                        <div className="profile_but" onClick={prof_but}>

                            <div className="profill_icon"></div>
                            <div className="text_hl_but">profile</div>

                        </div>

                        <div className="friends_but" onClick={friend_but}>

                            <div className="friends_icon"></div>
                            <div className="text_hl_but">friends</div>

                        </div>

                        <div className="settings_but" onClick={setting_but}>

                            <div className="sttings_icon"></div>
                            <div className="text_hl_but">settings</div>

                        </div>

                        <div className="out_button" onClick={outBut}>

                            <div className="out_name">out</div>

                        </div>

                
                    </div>

                    <div className="fix_bord_chous">

                        <div className={profileState? "profile_mod":"hidden"} >

                            <div className="profile_but_bord" onClick={pageProfile}>profile</div>
                            <div className="game_history" onClick={pageHist}>game history</div>
                            <div className="rewards" onClick={pageReward}>rewards</div>

                        </div>

                        <div className={friendState?"friends_mod":"hidden"}>

                            <div className="friends_but_bord" onClick={pegeFriends}>friends</div>
                            <div className="masendges_but_bord" onClick={pegeMasendge}>masendges</div>
                            <div className="invite_friends" onClick={pegeInvite}>invite friends</div>

                        </div>

                        <div className={settingsState?"settings_mod":"hidden"}>

                            <div className="settings_but_bord" onClick={pegeSettings}>settings</div>
                            <div className="styles_but_bord" onClick={pegeStyles}>styles</div>

                        </div>

                    </div>

                    <div className="whindow_show">

                        <div className="profile_info_whindow">

                            <div className="profile_info">

                                <div className="profile_bord">

                                    <div className="icon_prof_Fb"></div>
                                    <div className="prof_name_text">{store.isAuth? store.user.username : "гость"}</div>
                                    <div className="mmr_text">mmr {store.isAuth ? store.user.mmr : ''}</div>
                                    <div className="all_game_stat"></div>
                                    <div className="all_win_stat"></div>
                                    <div className="all_lose_stat"></div>
                                    <div className="all_draw_stat"></div>

                                </div>

                            </div>

                            <div className="game_history_info hidden">

                                <div></div>

                            </div>

                            <div className="reward_info hidden">

                                <div></div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default observer (MainForm)

