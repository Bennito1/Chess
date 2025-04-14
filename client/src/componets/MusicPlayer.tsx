import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useSound from 'use-sound'


const MusicPlayer: FC = ()=>{

    const [CanPlay, setCanPlay] = useState(true)
    let statePl = true
    let OrderStat = 0

    const MusPony0 = require("../music/Anti_Harmony.mp3")
    const MusPony1 = require("../music/Do_not_fear.mp3")
    const MusPony2 = require("../music/Catalyzing_conflict.mp3")
    const MusPony3 = require("../music/Bright_red_banners.mp3")


    const [play_music_pony0, {stop: st0}] = useSound(MusPony0, { volume: 0.2 })
    const [play_music_pony1, {stop: st1}] = useSound(MusPony1, { volume: 0.2 })
    const [play_music_pony2, {stop: st2}] = useSound(MusPony2, { volume: 0.2 })
    const [play_music_pony3, {stop: st3}] = useSound(MusPony3, { volume: 0.2 })


    function MP0(){
        setCanPlay(false)
        play_music_pony0()
        OrderStat += 1
        setTimeout( ()=>{setCanPlay(true), st0(), playMusic()}, 5000/* (60 * 4 + 44) * 1000 */)
    }

    function MP1(){
        setCanPlay(false)
        play_music_pony1()
        OrderStat += 1
        setTimeout( ()=>{setCanPlay(true), st1(), playMusic()}, 5000)
    }

    function MP2(){
        setCanPlay(false)
        play_music_pony2()
        OrderStat += 1
        setTimeout( ()=>{setCanPlay(true), st2(), playMusic()}, 5000)
    }

    function MP3(){
        setCanPlay(false)
        play_music_pony3()
        OrderStat += 1
        setTimeout( ()=>{setCanPlay(true), st3(), playMusic()}, 5000)
    }

    function OrderPlay(){
        if (OrderStat == 0){
            MP0()
        }
        else if (OrderStat == 1){
            MP1()
        }
        else if (OrderStat == 2){
            MP2()
        }
        else if (OrderStat == 3){
            MP3()
        }
    }

    function playMusic(){
        CanPlay? OrderPlay():""
    }
  
    function proba(){
        console.log("1")
        playMusic()
    }

    return(

        <button onClick={proba}> сосо</button>

    )


}


export default observer (MusicPlayer);