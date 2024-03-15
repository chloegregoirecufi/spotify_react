import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArtistDetail } from '../../redux/artist/artistSlice';
import { selectArtistData } from '../../redux/artist/artistSelector';
import PageLoader from '../Loader/PageLoader';
import HearderDetail from './HearderDetail';
import BiographyArtist from './BiographyArtist';
import ListAlbumArtist from './ListAlbumArtist';


const DetailArtist = () => {

  const params = useParams();
  const dispatch = useDispatch();
  //on recupère l'id de l'artiste(depuis l'url)
  const id = params.id;


    useEffect(()=>{
        dispatch(fetchArtistDetail(id))
    },[])



    const {artistDetail, loading} = useSelector(selectArtistData)
    console.log('artisteDetail', artistDetail);
  return (
    loading ? <PageLoader /> : 
    <>
    <HearderDetail dataArtist={artistDetail}/>
    <BiographyArtist dataArtist={artistDetail}/>
    <ListAlbumArtist dataArtist={artistDetail} />
    </>
  )
}

export default DetailArtist