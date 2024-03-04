import React, { useState } from 'react'
import { dataAlbumNav, dataUserNav, imgLogo, styleIcon } from '../constants/appConstant'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'

const NavLinks = (handleClick) => (
    <>
    <div className="mt-10">
        {/* on va mapper sur dataAlbumNav*/ }
        {dataAlbumNav.map((item)=> (
            <NavLink
            key={item.title}
            to={item.path}
            end
            className="flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"
            onClick={()=>handleClick && handleClick()}
            >
            <item.icon style={styleIcon} className='mr-2'/>
            {item.title}
            </NavLink>
        ))}
    </div>
    <div className="mt-5">
        {/* on va mapper sur dataAlbumNav*/ }
        {dataUserNav.map((item)=> (
            <NavLink
            key={item.title}
            to={item.path}
            end
            className="flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"
            onClick={()=>handleClick && handleClick()}
            >
            <item.icon style={styleIcon} className='mr-2'/>
            {item.title}
            </NavLink>
        ))}
    </div>

    </>
)

const Sidebar = () => {
    const [mobileMenu, isMobilMenu] = useState(false);

  return (
    <>
    {/* navbar pour la ue au dessus de 768px */}
        <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black'>
            <img src={imgLogo} alt="Logo Spotify" className='w-full h-14 object-contain' />
            <NavLinks />
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
        <NavLink handleClick={() => isMobilMenu(false)} />
        </div>
    </>

    )
}

export default Sidebar