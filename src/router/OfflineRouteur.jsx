import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import Register from "../screens/OfflineScreens/Register";
import Login from "../screens/OfflineScreens/Login";

const OfflineRouteur = createBrowserRouter([
    {
        element: (
            <>
            <HomeOffline />
            </>
        ),
        errorElement: <ErrorPage />,
        //on declare les routes avec leur vue
        children: [
            {
                path:"/",
                element: <Login/>
            },
            {
                path:"/register",
                element: <Register/>
            },
        ]
    }
])

export default OfflineRouteur