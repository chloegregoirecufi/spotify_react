import React, { useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import SearchView from '../../components/SearchView'
import { useDispatch, useSelector } from 'react-redux'
import { selectAlbumsData } from '../../redux/album/albumSelector'
import PageLoader from '../../components/Loader/PageLoader'
import { fetchResetSearch } from '../../redux/album/albumSlice'

const Search = () => {
  const {loading} = useSelector(selectAlbumsData)
  const dispatch = useDispatch()
  useEffect(() =>{
   
    
    return() => {
      dispatch(fetchResetSearch())
    }
  },[])
  return (
    loading ? <PageLoader /> :
  <>
  <SearchBar />
  <SearchView />
  
  </>
    

  )
}

export default Search