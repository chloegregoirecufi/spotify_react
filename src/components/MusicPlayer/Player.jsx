import React, { useEffect, useRef } from 'react'
import { musicUrl } from '../../constants/apiConstant';

const Player = ({activeSong,volume,isPlaying,seekTime,repeat,onEnded,onTimeUpdate,onLoadedData}) => {

    const ref = useRef(null);

    if(ref.current){
        if(isPlaying){
        ref.current.play();//permet de mettre en pause la musique
    }else{
        ref.current.pause();
    }
    }
    //permet d'affilier le volume à notre player
    useEffect(() => {
        ref.current.volume = volume;
    }, [volume])

    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime])

  return (
    <audio 
    src={`${musicUrl}/${activeSong?.filePath}`}
    ref={ref}
    loop={repeat}
    onEnded={onEnded}
    onTimeUpdate={onTimeUpdate}
    onLoadedData={onLoadedData} 
    />

  )
}

export default Player