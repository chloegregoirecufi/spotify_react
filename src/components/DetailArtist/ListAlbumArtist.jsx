import React from 'react'
import { useSelector } from 'react-redux'
import AlbumCard from '../AlbumCard'

const ListAlbumArtist = ({dataArtist}) => {

  //on recupère les données du slice player
  const {isPlaying, activeSong} = useSelector(state => state.player);
  const albums = dataArtist?.albums ?? [];

  return (
    <>
    <div className='flex flex-wrap'>
      {albums && albums.map((data, index) => {
        return(
        <div className='m-3'>
        <AlbumCard 
        key={index}
        data={data}
        songs={data?.songs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        index={0}
        artist={dataArtist?.name}
        />
        </div>
      )})}
    </div>
    </>
  )
}

export default ListAlbumArtist