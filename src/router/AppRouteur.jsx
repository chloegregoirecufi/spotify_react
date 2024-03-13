import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import OfflineRouteur from './OfflineRouteur';
import OnlineRouteur from './OnlineRouteur';
import { RouterProvider } from 'react-router-dom';
import { USER_INFOS } from '../constants/appConstant';


//création d'un mini context pour la session
const SessionContext = createContext({
    inSession: false
});
//création du hook pour utiliser le context de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouteur = () => {
    //on déclare notre state session
    const[ inSession, setInSession] = useState(null);
    //on récupère les infos de notre authContext
    const { userId, setUserId, setEmail, setNickname } = useAuthContext();
    //on va regarder si on a des infos dans le local storage
    const getUserInfos = async () => {
        const user = JSON.parse(localStorage.getItem(USER_INFOS));
        if(user){
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.setNickname);
            setInSession(true);
        }else{
            setInSession(false);
        }
    };

    //On va appeller getUserInfos dès que l'on monte le composant
    useEffect(() => {
        getUserInfos();
    },[userId]);

    const value = {
        inSession
    }

  return (
    //on recup le context de session
    <SessionContext.Provider value={value}>
        {/*ici on appelle le bon routeur suivant le context de session */}
        <RouterProvider router={inSession ? OnlineRouteur : OfflineRouteur}/>
    </SessionContext.Provider>
    )
}

export default AppRouteur