import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "../../constants/apiConstant";

const albumSlice = createSlice({
    //on lui donne un nom
    name: 'albums',
    //on initialise les states(etat, like a variable)
    initialState: {
        albums : [],//on intialise un tableau vide pour stocker la future liste d'album
        loading : false,//On initialise le state loading à false pour pouvoir gérer l'attente des requêtes asynchrone
        albumDetail : {}
    },
    //methode qui permet de remplir les stats (mise en rayon)
    reducers: {//tjrs state et action
        setAlbums: (state, action)=>{
            state.albums = action.payload
        },
        setLoading: (state, action)=>{
            state.loading = action.payload
        },
        setAlbumDetail: (state, action) =>{
            state.albumDetail = action.payload
        }
    }
});

export const {setAlbums, setLoading, setAlbumDetail} = albumSlice.actions;

//on créer la méthode qui permet de récupérer les données des albums de la BDD
export const fetchAlbums = ()=> async dispatch => {
    try {
        //on passe le state loading à true pour signifier qu'on attend une réponse
        dispatch(setLoading(true));
        
        const response = await axios.get(`${apiUrls}/alba?page=1&isActive=true`)
        //on set les données dans le state albums
        dispatch(setAlbums(response.data));
        //on repasse le state loading a false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchAlbum: ${error}`);
        dispatch(setLoading(false));
    }
};

//on créer une méthode qui va récuperer le detail d'un album
export const fetchAlbumDetail = (id)=> async dispatch =>{
    try {
        //on passe le state loading à true pour signifier qu'on attend une réponse
        dispatch(setLoading(true));
        
        const response = await axios.get(`${apiUrls}/alba?page=1&id=${id}&isActive=true`)
        //on set les données dans le state albums
        dispatch(setAlbumDetail(response.data['hydra:member'][0]));
        //on repasse le state loading a false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchAlbumDetail: ${error}`);
        dispatch(setLoading(false));
    }
}

//On exporte notre reducer 
export default albumSlice.reducer;