import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import LoginForm from './componets/loginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/user';
import MainForm from './componets/MainForm';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ErrorForm from './componets/ErorForm'
import GameForm from './componets/GameForm'
import { mapStore } from './store/mapStore';
import { io } from "socket.io-client";
import RegMainForm from './componets/RegMainForm';
const URL = 'http://192.168.120.8:500'

export const socket = io(`${URL}`)

const MapContext = createContext(mapStore);

export const useMapContext = () => {
    return useContext(MapContext)
}

const App: FC = ()=>{
  const {store} = useContext(Context)
  
  useEffect(() => {
    const token = localStorage.getItem('refreshToken');

    if (token) {
      store.checkAtho();
    }
  }, [store]);

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <Router>
      <nav>
      </nav>
      <Routes>
      <Route path='/reg' element = {<RegMainForm/>}/>
        <Route path='*' element = {<ErrorForm/>}/>
        <Route path='/' element ={<MainForm/>}/>
        <Route path='/game' element={
          <MapContext.Provider value={mapStore}>
            <GameForm/>
          </MapContext.Provider>}/>
      </Routes>
    </Router>
  )
}

export default observer (App);

