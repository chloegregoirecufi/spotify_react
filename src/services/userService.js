import axios from "axios"
import { apiUrls } from "../constants/apiConstant";

export const checkUser = async(userInfo) => {
    try {
        //on recupère l'utilisateur dans la bdd avec l'id en session
        const response = await axios.get(`${apiUrls}/users/${userInfo.userId}`);
        const user = response.data;
        //maintenant on compare les données de la bdd avec celles en session
        if(user.email === userInfo.email && user.nickname === userInfo.nickname){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(`erreur sur le checkUser ${error}`)
        return false;
    }
}