import React, { FC, useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';


const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const {store} = useContext(Context)
    return (
        <div>
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
            <input
                onChange={e => setUser(e.target.value)}
                value={user}
                type= "text"
                placeholder='emmail or username'
                ></input>
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type= "text"
                placeholder='password'
                ></input>
            <button onClick={() => store.login(user, password)}>Авторизация</button>
        </div>
    );
};

export default observer (LoginForm);