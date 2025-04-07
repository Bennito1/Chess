import "../styels/profile.css"
import { socket } from "../App";
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "..";
import useSound from 'use-sound'

const ProfileForm: FC = () =>{

    const {store} = useContext(Context)

    const soundBut = require("../sound/soundName_01.mp3")
    const [playSound_but] = useSound(soundBut, { volume: 0.7 })

    const [profileState, setProfileState] = useState(true)
    const [friendState, setFriendState] = useState(false)
    const [settingsState, setSettingsState] = useState(false)

    function outBut(){
        playSound_but()
        setTimeout(() => {window.location.href = "/"}, 150)
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

                </div>~

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
                            <div className="prof_name_text">name</div>
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
    )

    


}

export default observer (ProfileForm);