import React, { useState } from 'react'
import { dataAlbumNav, dataUserNav, imgLogo, styleIcon } from '../constants/appConstant'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import NavLinks from './Navlinks'


const Sidebar = () => {
    const [mobileMenu, isMobilMenu] = useState(false);

  return (
    <>
    {/* navbar pour la ue au dessus de 768px */}
        <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black'>
            <img src={imgLogo} alt="Logo Spotify" className='w-full h-14 object-contain' />
            <NavLinks data={dataAlbumNav} marginTop={'mt-10'}/>
            <NavLinks data={dataUserNav} marginTop={'mt-5'}/>

        </div>
        {/* gestion des icones pour ouvrir/fermer le menu en petit ecran*/}
        <div className='absolute md:hidden block top-6 right-3'>
            {mobileMenu ? (
                <RiCloseLine style={styleIcon} className='text-white mr-2' onClick={()=> isMobilMenu(false)}/>
            ) : (
                <HiOutlineMenu 
                 style={styleIcon} className='text-white mr-2' onClick={()=> isMobilMenu(true)}
                />
            )}
        </div>

        {/* navbar pour la vue en dessous de 768px */}
        <div className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white_01 to-black backdrop-blur-lg p-6 md:hidden smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}>
        <img src={imgLogo} alt="Logo Spotify" className='w-full h-14 object-contain' />
        <NavLinks data={dataAlbumNav} marginTop={'mt-10'} handleClick={() => isMobilMenu(false)} />
        <NavLinks data={dataUserNav} marginTop={'mt-5'} handleClick={() => isMobilMenu(false)}/>

        </div>
    </>

    )
}

export default Sidebar