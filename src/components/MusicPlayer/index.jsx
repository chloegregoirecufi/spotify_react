import React, { useEffect, useState } from 'react'
import Track from './Track'
import { useDispatch, useSelector } from 'react-redux'
import Controls from './Controls'
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice'
import VolumeBar from './VolumeBar'
import SeekBar from './SeekBar'
import Player from './Player'

const MusicPlayer = () => {
    //on recupère toutes les données du slice player
    const{activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying} = useSelector((state) => state.player);

    //on déclare nos states
    const[shuffle, setShuffle] = useState(false)//etat pour le mode aléatoire
    const [repeat, setRepeat] = useState(false)//etat pour le mode repetition
    const [volume, setVolume] = useState(0.3)//etat pour volume
    const [duration, setDuration] = useState(0) //durer de la chanson
    const [seekTime, setSeekTime] = useState(0)//recup la position de la barre
    const [ appTime, setAppTime ] = useState(0)//temps actuel de la chanson

    //on recupère les hooks
    const dispatch = useDispatch();

    useEffect(() => {
        //si le score contient un tableau de chansons, on dispatch playPause à true 
        if(currentSongs.length) dispatch(playPause(true))
    }, [currentIndex])//si currentIndex change => on reload le composant

    //on créer nos méthodes
    //méthode pour gérer l'état de play/pause
    const handlePlayPause = () => {
        //si aucune chanson active, on return 
        if(!isActive) return;
        
        //si une chanson est active
        isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
    }

    //méthode pour avancer à la chanson suivante
    const handleNextSong = () => {
        //si on est pas en mode aléatoire
        if(!shuffle){
            dispatch(nextSong((currentIndex + 1) % currentSongs.length))
        }else{
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
        }
    }

    //méthode pour reculer à la chanson precedente
    const handlePrevSong = () => {
        if(currentIndex === 0){
            //si l'index est à 0 on recupere le dernier index du tableau
            dispatch(prevSong(currentSongs.length - 1))
        }else if(shuffle){
            //si on est en mode aléatoire
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
        }else{
            //sinon on recule de 1
            dispatch(prevSong(currentIndex -1))
        }
    } 



  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
        <Track 
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
        />
        <div className='flex flex-1 flex-col items-center justify-center'>
            <Controls 
            isPlaying={isPlaying}// savoir si le titre est en cour de lecture
            isActive={isActive}//savoir si une musique est active
            currentSongs={currentSongs}//tableau de chanson
            handlePlayPause={handlePlayPause}//methode pour changer l'etat de play/pause
            handlePrevSong={handlePrevSong}//pour chnager la chanson precedente
            handleNextSong={handleNextSong}//pour passer à une autre musique
            repeat={repeat}//pour changer l'etat de repetition
            setRepeat={setRepeat}//chager etat de repetition
            shuffle={shuffle}//si on est en mode aleatoire
            setShuffle={setShuffle}//pour chnager état aleatoire
            />
            <SeekBar 
            value={appTime}//valeur actuelle de la lecture
            min="0"//valeur minimum
            max={duration}//valeur max(temps de la musique)
            onInput={(event)=> setSeekTime(event.target.value)}//pour récupere la position de la barre de lecture
            setSeekTime={setSeekTime}//on change la position de la barre de lecture
            appTime={appTime} //pour récupérer la position réel de lecture
            />
            <Player 
            activeSong={activeSong}//chanson activé
            volume={volume}//recup le volume
            isPlaying={isPlaying}//pour savoit si titre en cour de lecture
            seekTime={seekTime}//pour recup la position de la barre de lecture
            repeat={repeat}//si on est en mode repeat
            currentIndex={currentIndex}//recup index chanson
            onEnded={handleNextSong}//pour passer à la chanson suivante une fois la chanson actuel terminé
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}//pour recup le temps actuel de la chanson
            onLoadedData={(event) => setDuration(event.target.duration)}
            />

        </div>
        <VolumeBar 
        value={volume}//valeur réel du volume
        min="0"//valeur min
        max="1"//valeur max
        onChange={(event) => setVolume(event.target.value)}//recup la position de la barre de volume
        setVolume={setVolume}//pour changer le volume
        />
    </div>
  )
}

export default MusicPlayer