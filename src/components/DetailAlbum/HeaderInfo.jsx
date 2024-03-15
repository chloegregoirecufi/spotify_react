import React, { useEffect, useState } from 'react'
import { albumUrl, artistUrl } from '../../constants/apiConstant'
import PageLoader from '../Loader/PageLoader';
import { Link } from 'react-router-dom';


const HeaderInfo = ({dataAlbum}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])
//on recupère la photo d'artiste si elle existe sinon photo album
const imgPath = dataAlbum?.artist?.imagePath ? `${artistUrl}/${dataAlbum?.artist?.imagePath}` :`${albumUrl}/${dataAlbum?.imagePath}`

//on format la date de sortie (on ne recupère que l'année)
const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear()

//on definit le nombre de titre par album
const nbTitle = dataAlbum?.songs ? dataAlbum?.songs.length > 1 
? dataAlbum?.songs.length + ' titres' 
: dataAlbum?.songs.length + ' titre'
: 'Aucun titre pour cet album'

//petit element graphique pour faire un point 
const Dot = () => (
    <p>&#8226;</p>
)

//traitement pour la durée de l'album
const durationAlbum = () => {
    //on va calculer le nombre de second pour tous les titres
    const totalSecond = dataAlbum?.songs && dataAlbum?.songs.map(function(num){
        return parseInt(num.duration)
    }).reduce(function(a, b){
        return a+b
    });

    //on va formater les secondes en heure,min,sec
    const hours = Math.floor(totalSecond / 3600);
    const minutes = Math.floor((totalSecond % 3600) / 60);
    const seconds = totalSecond % 60;
    
    //on va retourner une string sous la forme 1h15min30s
    return hours > 0 
    ? `${hours}h ${minutes}min ${seconds}s` 
    : `${minutes}min ${seconds}s`

}



  return (
    isLoading ? <PageLoader /> : 
    dataAlbum &&
    <div className='flex items-center'>
        <Link to={`/artist-detail/${dataAlbum?.artist?.id}`}>
        <img src={imgPath} alt={dataAlbum?.artist?.name ?? 'photo artiste'} className='w-10 h-10 rounded-full object-cover' />
        </Link>
        <p className='font-bold text-base p-1'>{dataAlbum?.artist?.name}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{releaseDate}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{nbTitle}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{durationAlbum()}</p>
    </div>
  )
}

export default HeaderInfo