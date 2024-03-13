import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { useAuthContext } from './contexts/AuthContext'
import {useNavigate } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant'
import { checkUser } from './services/userService'
import { useSelector } from 'react-redux'
import MusicPlayer from './components/MusicPlayer'

const App = () => {

  //on recupère les données d'utilisateur depuis le localstorage
  const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
  
  const fetchUser = async () => {
    const user = await checkUser(userInfo);
    if(user){
      return;
    }else{
      signOut();
      navigate('/')
    }
  }

  const { signOut } = useAuthContext(); 
  //on recupère le hook de nav
  const navigate = useNavigate();

  //on recupere activeSong du slice player
  const {activeSong} = useSelector((state) => state.player);

  useEffect(() => {
    fetchUser();
  }, [userInfo])



  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-b from-black to-[rgba(18,18,18,1)]'>
        <Topbar />
        <div className='h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
            <div className='flex-1 h-fit pb-40 text-white'>
              <Outlet />
            </div>
          </div>
      </div>
      {activeSong?.title && (
        <div className='absolute h-28 bottom-0 left-0 right-0 animate-slideup bg-gradient-to-br from-white_01 to-black backdrop-blur-lg rounded-t-3xl z-10'>
          <MusicPlayer />
        </div>
      )}
    </div>
    )
}

export default App