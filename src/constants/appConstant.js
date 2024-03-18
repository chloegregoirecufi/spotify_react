//on construit un premier tableau pour notre navbar

import { imageUrl } from "./apiConstant";
import {AiOutlineHome,AiOutlineSearch,AiOutlineAppstoreAdd} from 'react-icons/ai';
import {BiLibrary} from 'react-icons/bi';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

//1 pour la gestion des albums
export const dataAlbumNav = [
    {title: 'Accueil', path:'/', icon: AiOutlineHome},
    {title: 'Rechercher', path:'/search', icon: AiOutlineSearch},
    {title: 'Bibliothèque', path:'/library', icon: BiLibrary}
];

//on construit un 2ème tableau pour notre navbar
//2 pour les options user
export const dataUserNav = [
    {title: 'Créer une playlist', path:'/add-playlist', icon: AiOutlineAppstoreAdd},
    {title: 'Titre likés', path:'/wishlist', icon: MdFavoriteBorder},
    {title: 'Mon compte', path:'/account/:id', icon:FiSettings} 
];

//on récupère le chemin de notre logo
export const imgLogo = `${imageUrl}/logo.png`;

//on définit du style pour les icons
export const styleIcon = {width: '25px', height:'25px'};
export const tableIcon = {width: '20px', height:'20px'};
export const USER_INFOS = 'userInfos';