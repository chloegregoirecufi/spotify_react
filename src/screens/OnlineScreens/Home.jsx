import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../../redux/album/albumSlice'
import { selectAlbumsData } from '../../redux/album/albumSelector'
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/AlbumCard';

const Home = () => {
  //on recupere le hook useDispatch de react-redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAlbums())//dispatch exectue les methode avec redux, permet de maj les states albums et loading de albumsSlice
    }, [dispatch])
    
    //on recupère notre selector pour avoir accès au données
    const {albums, loading} = useSelector(selectAlbumsData);
    const dataAlbum = albums['hydra:member']




  return (
    loading ? <PageLoader /> : 
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Tous les albums
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {/*on va devoir mapper dataAlbum pour parcourir chaque album */}
        {dataAlbum && dataAlbum.map((data, index)=>{
          return(
            <AlbumCard 
            //on passe key en parmètre pour que chaque enfant soit unique
            key={index}
            //on lui passe data comme props de l'album
            data={data}
            />
          )
        })}
      </div>
    </div>








  //   loading ? <PageLoader/> :

  //     dataAlbum && dataAlbum.map((album, index) => (
  //   <div key={index}>
  //     <h1>{album?.title}</h1>
  //     <p>{album?.artist?.biography}</p>
  //   </div>
  // )
  // ) 
 )
}

export default Home