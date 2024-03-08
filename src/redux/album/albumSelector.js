import { createSelector } from "@reduxjs/toolkit";
import { setAlbumDetail } from "./albumSlice";

//on recupère les données du slice que l'on met dans des constantes
const selectAlbums = state => state.albums.albums;
const selectLoading = state => state.albums.loading;
const selectAlbumDetail = state => state.albums.albumDetail;
//on crée le selector 
export const selectAlbumsData = createSelector(
    [selectAlbums, selectLoading, selectAlbumDetail], 
    //on effectue une destructuration des données
    (albums, loading, albumDetail)=>({albums, loading, albumDetail})
);