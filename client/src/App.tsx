import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import LoginForm from './componets/loginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/user';
import MainForm from './componets/MainForm';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ErrorForm from './componets/ErorForm'
import GameForm from './componets/GameForm'


interface MapContextType {
    map: string[][];
    setMap: React.Dispatch<React.SetStateAction<string[][]>>
}

interface MapProviderProps {
    children: ReactNode
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: FC<MapProviderProps> = ({ children }) => {
    const [map, setMap] = useState<string[][]>([
        ['l', 'k', 's', 'q', 'kr', 's', 'k', 'l'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['L', 'K', 'S', 'Q', 'KR', 'S', 'K', 'L']
    ]);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
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
        <Route path='*' element = {<ErrorForm/>}/>
        <Route path='/' element ={<MainForm/>}/>
        <Route path='/game' element={
          <MapProvider>
            <GameForm/>
          </MapProvider>}/>
      </Routes>
    </Router>
  )
}

export default observer (App);

