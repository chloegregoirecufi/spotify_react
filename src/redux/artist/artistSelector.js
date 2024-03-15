import { createSelector } from "@reduxjs/toolkit";

//on recupère les données du slice que l'on met dans des constantes
const selectLoading = state => state.albums.loading;
const selectArtistDetail = state => state.albums.albumDetail;
//on crée le selector 
export const selectAlbumsData = createSelector(
    [selectLoading, selectArtistDetail], 
    //on effectue une destructuration des données
    (loading, artistDetail,)=>({loading, artistDetail})
);