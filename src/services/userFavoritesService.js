import axios from "axios"
import { apiUrls } from "../constants/apiConstant";

export const fetchAddRemoveFavorite = async(arrayIds, userId) => {

    const dataFavorite = {
        albums: arrayIds
    }

    try {
        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
        const response = await axios.patch(`${apiUrls}/users/${userId}`, dataFavorite);
    } catch (error) {
        console.log(`erreur lors du fetchAddmoveFavorite : ${error}`);
    }
}