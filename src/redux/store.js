import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";

const store = configureStore({
    reducer: {
        // Ajouter les futures reducers ici
        albums : albumReducer,
        player : playerReducer,
    }
})

export default store