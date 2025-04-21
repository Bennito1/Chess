import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { socket } from "../App";
import "../styels/chat.css"

const ChatForm: FC<{ window: string }> = ({ window }) => {

    const [message, setMessage] = useState<string>('')
    const [messageHistory, setMessageHistory] = useState<string[]>([])
    const [connectionState, setConnectionState] = useState<boolean>(false)
    const [valideError, setValideError] = useState<boolean>(false)
    const [errorMess, setErrorMess] = useState<string>("введите сообщение")
    const [selectedSticker, setSelectedSticker] = useState<string | null>(null)

    const brinza = require('../images/stikers/brinza.jpg')
    const pony_1 = require('../images/stikers/pony_1.jpg')

    const stickers = [
        { id: 1, src: pony_1 },
        { id: 2, src: brinza }
    ]

    if(window == "main" && connectionState == false){
        connectMainChat()
    }

    //if(window == "game" && connectionState == false){
    //    connectGameChat()
    //}

    //function connectGameChat(){

    //}


    function connectMainChat(){
        if(socket.id != null && connectionState == false){
            setConnectionState(true)
            const id = socket.id
            return socket.emit("mainChatConnect", id, localStorage.getItem("name"))
        }
        else if (connectionState == false){
            setTimeout(() => connectMainChat(), 1000)
        }
    }

    socket.on("newMessage", (newMessage:string[]) =>{
        setMessageHistory([...messageHistory, ...newMessage])
    })

    useEffect(() => {
        historyRender()
    },[messageHistory])
    
    function sendMessage(){
        if(message.length == 0){
            setValideError(true)
            setErrorMess("невозможно отправить пустое сообщение")
            setTimeout(() => {setValideError(false), setErrorMess("введите сообщение")}, 1500)
            return
        }
        console.log("отправлено")
        socket.emit('sendMessage', localStorage.getItem("name"), message, window)
        setMessage('')
    }

    function stickerSend(sticker:string){
        socket.emit('sendMessage', localStorage.getItem("name"), sticker, window)
    }

    function historyRender(){
        console.log(messageHistory)
        const rows = []
        for(let i =0; i < ((messageHistory.length/2)); i++){
            const sender = messageHistory[i * 2];
            const content = messageHistory[i * 2 + 1]
            if(sender == "sr"){
                rows.push(
                    <div className="messange">
                        <div>{content}</div>
                    </div>
                ) 
            }
            else{
                const userMessage = sender == localStorage.getItem("name")
                const isSticker = stickers.find(sticker => sticker.src == content)
                const messageContent = isSticker ? (
                    <img src={content} className="sticker" alt="Sticker" />
                ) : (
                    content
                )
                rows.push(
                    <div key={i} className={`messange ${isSticker ? "sticker-div" : ""} ${userMessage ? "mine" : ""}`}>
                        <div className ="">{sender}: {messageContent}</div>
                    </div>
                )
            }
        }
        return rows
}
    return(
        <div className="chat_border">
                <div className="mes_bord">
                    {historyRender()}
                </div>
                <div className="int_bord">
                    <input 
                        className={valideError ? "input_masendge red" : "input_masendge"}
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        type= "text"
                        placeholder={`${errorMess}`}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    ></input>
                    <button className ={
                        valideError ? "enter_but " : "enter_but"
                    }
                        onClick={() => sendMessage()}
                    >
                        Отправить
                    </button>
                    <div className="sticker-vale">
                    {stickers.map(sticker => (
                        <img
                            key={sticker.id}
                            src={sticker.src}
                            alt={`Sticker ${sticker.id}`}
                            onClick={() => {stickerSend(sticker.src)}}
                            style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                        />
                    ))}
                </div>
                </div>
        </div>
    )
}

export default observer(ChatForm)