import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../../redux/album/albumSlice'
import { selectAlbumsData } from '../../redux/album/albumSelector'
import PageLoader from '../../components/Loader/PageLoader';

const Home = () => {
  //on recupere le hook useDispatch de react-redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAlbums())//dispatch exectue les methode avec redux, permet de maj les states albums et loading de albumsSlice
    }, [])
    
    //on recupère notre selector pour avoir accès au données
    const {albums, loading} = useSelector(selectAlbumsData);
    const dataAlbum = albums['hydra:member']
    console.log('data albums', dataAlbum);




  return (
    <div>Home </div>
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