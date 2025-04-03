import "../styels/registration.css"
import { socket } from "../App";
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "..";



const RegMainForm: FC = () =>{
    const {store} = useContext(Context);
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [showReq, setShowReq] = useState(false) 

    if (store.isAuth == true){
        window.location.href = "/"
    }
  
    function getShowReq(){
        setShowReq(!showReq)
    }

    return(

        <div className="MainReg">
            
            <div className="enter_login">
                
                <div className={showReq ? "but_log hidden" : "but_log"}>

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
                        <button className="login" onClick={() => store.login(user, password)}>Авторизация</button>
                    </div>

                </div>

                <div className={showReq ? "but_req" : "but_req hidden"}>   
                    <input
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        type= "text"
                        placeholder='username'
                        ></input>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type= "text"
                        placeholder='email'
                        ></input>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type= "text"
                        placeholder='password'
                        ></input>
                    <button onClick={() => store.registration(username, email, password)}>Регистрация</button>
                </div> 

            </div>
            
            <div className="reg_log">
                <button className={showReq ? "but_reg hidden" : "but_reg"} onClick={getShowReq}>Регистрация</button>
                <button className={showReq ? "but_log" : "but_log hidden"} onClick={getShowReq}>Войти</button>
            </div> 
        </div>

    )

}

export default observer (RegMainForm);