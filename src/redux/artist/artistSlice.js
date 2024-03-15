import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    //on lui donne un nom
    name: 'artist',
    //on initialise les states(etat, like a variable)
    initialState: {
        loading : false,//On initialise le state loading à false pour pouvoir gérer l'attente des requêtes asynchrone
        artistDetail : {},

    },
    //methode qui permet de remplir les stats (mise en rayon)
    reducers: {//tjrs state et action
        setLoading: (state, action)=>{
            state.loading = action.payload
        },
        setArtistDetail: (state, action) =>{
            state.artistDetail = action.payload['hydra:member'][0];
        },
    }
});

//on exporte les actions sous forme de constantes
export const {setLoading, setArtistDetail} = albumSlice.actions;

//on créer une méthode qui va récuperer l'artiste avec l'id
export const fetchArtistDetail = (id)=> async dispatch =>{
    try {
        //on passe le state loading à true pour signifier qu'on attend une réponse
        dispatch(setLoading(true));
        
        const response = await axios.get(`${apiUrls}/artists?page=1&id=${id}&albums.isActive=true`)
        //on set les données dans le state albums
        dispatch(setArtistDetail(response.data));
        //on repasse le state loading a false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchArtistDetail: ${error}`);
        dispatch(setLoading(false));
    }
}


//On exporte notre reducer 
export default artistSlice.reducer;