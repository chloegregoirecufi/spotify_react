import { createSelector } from "@reduxjs/toolkit";

//on recupère les données du slice que l'on met dans des constantes
const selectLoading = state => state.artist.loading;
const selectArtistDetail = state => state.artist.artistDetail;
//on crée le selector 
export const selectArtistData = createSelector(
    [selectLoading, selectArtistDetail], 
    //on effectue une destructuration des données
    (loading, artistDetail,)=>({loading, artistDetail})
);