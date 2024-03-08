import React from 'react'
import { albumUrl } from '../constants/apiConstant'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { playPause, setActiveAlbum, setActiveSong } from '../redux/player/playerSlice'
import PlayPause from './PlayPause'

const AlbumCard = ({data, index, songs, isPlaying, activeSong}) => {
    //constante qui recupère l'image de l'album
    const imgPath = `${albumUrl}/${data.imagePath}`

    //on recupère le hook dispatch(sert à appler les fonction)
    const dispatch = useDispatch();

    //on redefinit des constantes pour les données de l'album
    const artistName = data?.artist?.name ?? 'artiste inconnu'
    const albumName = data?.title ?? 'album inconnu'
    const albumId = data?.id ?? 0 
    
    //on va definir la methode lors qu'on met pause 
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    //methode lorsqu'on met en lecture
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({songs, data, index}));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white_01 hover:bg-white_05 transition-all ease-out duration-500 animate-slideup rounded-lg cursor-pointer'>
        <div className='relative w-full h-56 flex flex-col group'>
            <Link to={`/detail/${albumId}`} state={{params:data}}>
                <img src={imgPath} alt={albumName} className='card-sh rounded-lg object-cover' />
            </Link>
            {/*on place notre composant playpause ici */}
            <div className={`absolute ${activeSong?.title === songs[index].title ? 'flex' : 'hidden'} group-hover:flex right-3 bottom-5`}>
                <div className='group-hover:animate-slideup2 bg-black outline-none rounded-full group-hover:duration-75 overflow-hidden'>
                    <PlayPause 
                    songs={songs}
                    handlePause={handlePauseClick}
                    handlePlay={()=> handlePlayClick(index)}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    index={index}
                    data={data}
                    />
                </div>
            </div>
            <Link to={`/detail/${albumId}`} state={{params:data}}>
                <div className='mt-4 flex flex-col'>
                    <p className='text-white text-xl truncate font-bold'>{albumName}</p>
                    <p className='text-sm truncate text-white'>{artistName}</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default AlbumCard