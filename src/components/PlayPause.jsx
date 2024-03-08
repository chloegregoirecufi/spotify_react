import React from 'react'
import { BsPlayCircleFill, BsPauseCircleFill} from 'react-icons/bs'

const PlayPause = ({
    size = '60px', //permet de definir la taille du btn
    isPlaying, //gère l'etat si on est en lecture ou en pause
    songs, //tableau de chanson
    activeSong, //chanson en cour de lecture
    handlePause, //fonction pour mettre en pause
    handlePlay, //fontion pour mettre en lecture
    index // index du song dans le tableau
}) => {
  return (
    //on check si on est en mode play && si le titre de la chanson en cours de lecture est == le titre de la chanson du tableau à l'index donné
    isPlaying && activeSong?.title === songs[index].title ?
    //si vrai: on retourne l'icon pause avec la methode handlepause
    <BsPauseCircleFill 
        size={size}
        className='text-green shadow-md'
        onClick={handlePause}
    />
    :
    <BsPlayCircleFill 
        size={size}
        className='text-green shadow-md'
        onClick={handlePlay}
    />
    )
}

export default PlayPause