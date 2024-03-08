import { createSlice } from "@reduxjs/toolkit"

//on va initialiser nos state dans une constante 
const initialState = {
    currentSongs: [], //tableau de chansons
    currentAlbum: [], //album ou playlist en cour de lecture
    currentIndex: 0, //index chanson cour de lecture
    isActive: false, //etat du playeur
    isPlaying: false, //etat de la lecture
    activeSong: {}, //chanson en cours de lecture
}

//Création du slice pour la gestion du playeur
const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers:{
        //tout ce qu'on stock lorsqu'on active une chanson
        setActiveSong: (state, action) => {
            //stockage de la chanson en lecture dans activeSong
            state.activeSong = action.payload?.songs[action.payload.index];
            //stockage du tableau de chanson
            state.currentSongs = action.payload?.data?.songs;
            //stockage de l'index
            state.currentIndex = action.payload?.index;
            //stockege de l'état du player
            state.isActive = true;
        },

        setActiveAlbum: (state, action) => {
            //on stock les infos de l'album
            state.currentAlbum = action.payload?.data;
        },

        //pour avancer la liste de lecture 
        nextSong: (state, action) => {
            //on recupère la chanson dans le tableau à l'index donnée
            state.activeSong = state.currentSongs[action.payload];
            //on stock l'index
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        //pour reculer la liste de lecture 
        prevSong: (state, action) => {
            //on recupère la chanson dans le tableau à l'index donnée
            state.activeSong = state.currentSongs[action.payload];
            //on stock l'index
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        }

    }
})

//export des actions
export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause} = playerSlice.actions;
//export du reducer
export default playerSlice.reducer;