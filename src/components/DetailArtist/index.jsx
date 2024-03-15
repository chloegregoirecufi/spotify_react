import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailArtist = () => {

    //on recupère l'id de l'artiste(depuis l'url)
    const params = useParams();
    const id = params.id;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchArtistDetail(id))
    },[])
  return (
    <div>DetailArtist</div>
  )
}

export default DetailArtist