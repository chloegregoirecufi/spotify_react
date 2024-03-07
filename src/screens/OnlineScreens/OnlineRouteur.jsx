import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../ErrorScreens/ErrorPage";
import Home from "./Home";
import Search from "../OnlineScreens/Search";
import Library from "../OnlineScreens/Library";
import Playlist from "../OnlineScreens/Playlist";
import { Wishlist } from "../OnlineScreens/Wishlist";

const OnlineRouteur = createBrowserRouter([
    {
        element: (
            <>
            <App />
            </>
        ),
        errorElement: <ErrorPage />,
        //on declare les routes avec leur vue
        children: [
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/search",
                element: <Search/>
            },
            {
                path:"/library",
                element: <Library/>
            },
            {
                path:"/add-playlist",
                element: <Playlist/>
            },
            {
                path:"/wishlist",
                element: <Wishlist/>
            },





        ]
    }
])

export default OnlineRouteur