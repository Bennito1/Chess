import "../styels/registration.css"
import { socket } from "../App";
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "..";
import useSound from 'use-sound'


const RegMainForm: FC = () =>{
    const {store} = useContext(Context);
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [showReq, setShowReq] = useState(false) 

    const soundBut = require("../sound/soundName_01.mp3")
    const [playSound_but] = useSound(soundBut, { volume: 0.7 })

    const loginSound = require("../sound/login_sound.mp3")
    const [playSound_log] = useSound(loginSound)

    const logFaile = require("../sound/logFaile.mp3")
    const [playSound_logFaile] = useSound(logFaile, { volume: 0.7})

    const registSound = require("../sound/regist_sound.mp3")
    const [playSound_reg] = useSound(registSound)
  
    function getShowReq(){
        setShowReq(!showReq)
        playSound_but()
    }

    function kostil_1(){
        window.location.href = "/"
    }

    if (store.isAuth == true){
        playSound_log()
        setTimeout(kostil_1, 2500)
    }

    function kostil(){
        if(store.isAuth == false){
            playSound_logFaile()         
        } 
    }

    function login(user:string, password:string){
        store.login(user, password)
        setTimeout(kostil, 1000)
    }
    function outB(){
        playSound_but()
        setTimeout(kostil_1, 150)
    }

    return(

        <div>

            <div className={store.authError ? "window" : (store.regError ? "window" : "")}>
                {store.authError ? store.authMassengeError : ""}
                {store.regError ? store.reqMassengeError : ""}
            </div>

            <div className="outB" onClick={outB}>out</div>

            <div className="MainReg">
            
                <div className="enter_login">
                
                    <div className={showReq ? "hidden" : ""}>

                        <div className="li_1">
                            <input
                                className="usORem_name"
                                onChange={e => setUser(e.target.value)}
                                value={user}
                                type= "text"
                                placeholder='emmail or username'
                                ></input>
                        </div>
               
                        <div className="li_2">
                            <input
                                className="password_bloc"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type= "text"
                                placeholder='password'
                                ></input>
                        </div>
                
                        <div className="li_3">
                            <button className="login" onClick = {() => login(user, password)}>Авторизация</button>
                        </div>

                    </div>

                    <div className={showReq ? "" : " hidden"}>   
                        <div className="li_4">
                            <input
                                className="usORem_name"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                type= "text"
                                placeholder='username'
                                ></input>
                        </div>  

                        <div className="li_5">      
                            <input
                                className="usORem_name"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type= "text"
                                placeholder='email'
                                ></input>
                        </div>

                        <div className="li_6">
                            <input
                                className="usORem_name"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type= "text"
                                placeholder='password'
                                ></input>
                        </div>
                    
                        <div className="li_7">
                            <button className="usORem_name" onClick={() => store.registration(username, email, password)}>Регистрация</button>
                        </div>
                    
                    </div> 

                </div>
            
                <div className="reg_log">
                    <button className={showReq ? "but_reg hidden" : "but_reg"} onClick={getShowReq}>Регистрация</button> 
                    <button className={showReq ? "but_log" : "but_log hidden"} onClick={getShowReq}>Войти</button> 
                </div> 

            </div>

        </div>

    )

}

export default observer (RegMainForm);