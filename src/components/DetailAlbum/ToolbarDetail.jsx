import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import PlayPause from '../PlayPause';
import { selectAlbumsData } from '../../redux/album/albumSelector';

const ToolbarDetail = (dataAlbum) => {
    const data = dataAlbum
    const songs = dataAlbum?.songs;
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();

    //on récupère les données du slice
    const{isPlaying, activeSong} = useSelector(state => state.player);
    const {loading} = useSelector(selectAlbumsData);

    //methode lors qu'on met pause 
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
    loading ? <PageLoader /> :
    <div className='cursos-pointer ms-3'>
        <PlayPause
            songs={songs}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(index)}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            data={dataAlbum}
        />
    </div>
    )
}

export default ToolbarDetail