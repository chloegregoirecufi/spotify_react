import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import  userReducer  from "./user/userSlice";
import artistReducer from "./artist/artistSlice";

const store = configureStore({
    reducer: {
        // Ajouter les futures reducers ici
        albums : albumReducer,
        player : playerReducer,
        user: userReducer,
        artist : artistReducer,
    }
})

export default store