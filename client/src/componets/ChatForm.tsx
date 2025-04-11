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

    if(window == "main" && connectionState == false){
        connectMainChat()
    }

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

    function historyRender(){
        const rows = []
        for(let i =0; i < ((messageHistory.length/2)); i++){
            console.log(i, messageHistory.length, messageHistory)
            if(messageHistory[i*2] == "sr"){
                rows.push(
                    <div>
                        <div>{messageHistory[i*2 +1]}</div>
                    </div>
                ) 
            }
            else if(messageHistory[i*2] == localStorage.getItem("name")){
                rows.push(
                    <div>
                        <div className="red">{messageHistory[i*2]}: {messageHistory[i*2 +1]}</div>
                    </div>
                )
            }
            else{
                rows.push(
                    <div>
                        <div>{messageHistory[i*2]}: {messageHistory[i*2 +1]}</div>
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
                        valideError ? "red " : ""
                    }
                        onClick={() => sendMessage()}
                    >
                        Отправить
                    </button>
                </div>
        </div>
    )
}

export default observer(ChatForm)