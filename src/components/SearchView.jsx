import React from 'react'
import { useSelector } from 'react-redux'
import { selectAlbumsData } from '../redux/album/albumSelector'
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';

const SearchView = () => {

    //on recupère les infos du slice album
    const {searchAlbum, searchArtist, searchTitle} = useSelector(selectAlbumsData);
    //on recupère les infos du slicePlayer pour alimenter le composant albumCard
    const {isPlaying, activeSong} = useSelector(state => state.player)
    //on recupère le tableau de données de searchAlbum
    const dataAlbum = searchAlbum['hydra:member'];
    //on recupère le tableau de donnée de searchArtist
    const dataArtist = searchArtist['hydra:member'];
    //o recupere le tableau de données de serachtitle
    const dataTitle = searchTitle['hydra:member'];

  return (
    <>
    {dataAlbum && dataAlbum.length === 0 && dataArtist && dataArtist.length === 0 && dataTitle && dataTitle.length === 0 && 
    (<h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Aucun résultat trouvé</h2>)}
    {/*partie album */}
    {dataAlbum && dataAlbum.length > 0
    ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des albums</h2>
    : null
    }
    <div className='flex flex-wrap'>
        {dataAlbum && dataAlbum.map((data, index)=>(
            <div key={`album_${index}`} className='p-3 m-3'>
                <AlbumCard 
                data={data}
                songs={data?.songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                index={0}
                />
            </div>
        ))}
    </div>

    {/*Partie artiste */}
    {dataArtist && dataArtist.length > 0
    ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des artistes</h2>
    : null
    }
    <div className='flex flex-wrap'>
        {dataArtist && dataArtist.map((data, index)=>(
            <div key={`artist_${index}`} className='p-3 m-3'>
                <ArtistCard dataArtist={data}/>
            </div>
        ))}
    </div>
        

    {/*partie title/chanson */}
    {dataTitle && dataTitle.length > 0
    ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des titre de chanson</h2>
    : null
    }
    <div className='flex flex-wrap'>
        {dataTitle && dataTitle.map((data, index)=>(
            <div key={`title_${index}`} className='p-3 m-3'>
                <AlbumCard 
                data={data}
                songs={data?.songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                index={0}
                />
            </div>
        ))}
    </div>

    </>
  )
}

export default SearchView