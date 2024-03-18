import React, { useState } from 'react'
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import CustomInput from '../../../components/CustomInput';
import { useAuthContext } from '../../../contexts/AuthContext';
import { USER_INFOS } from '../../../constants/appConstant';
import { checkUser } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { apiRoot, apiUrls } from '../../../constants/apiConstant';

const EditInfo = () => {

    const navigate = useNavigate();

    const { userId, email, nickname, signOut, signIn } = useAuthContext();


    const [nicknameValue, setNicknameValue] = useState(nickname);
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //on vérifie que l'user est le bon 
            const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
            const userValid = await checkUser(userInfo);

            if (userValid) {
                //on verifie que tous les champs sont remplis
                if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
                    //on se créer un tableau pour vérifier le mdp(checkPassword)
                    const dataCheck = {
                        id: userId,
                        password: passwordValue
                    }


                    //on crée un objet pour le patch (on ne prendra pas le mdp)
                    const data = {
                        email: emailValue,
                        nickname: nicknameValue
                    }

                    const headers = {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }

                    try {
                        //requete qui verifie si le mdp est correct
                        const respPassword = await axios.post(`${apiRoot}/check-password`, dataCheck, { headers });
                        console.log(respPassword);
                        if (respPassword.data.response) {
                            try {
                                //requete qui verifie si l'email est deja utilisé
                                const respEmail = await axios.get(`${apiUrls}/users?email=${emailValue}`);

                                if (emailValue !== email && respEmail.data['hydra:member'].length > 0) {
                                    setError('email deja use')
                                    return;
                                } else {
                                    try {
                                        //config axios pour methode patch
                                        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                                        //methode qui permet de modifier les infos de l'user
                                        const resp = await axios.patch(`${apiUrls}/users/${userId}`, data);
                                        //on reconstruit l'objet user
                                        const user = {
                                            userId: resp.data.id,
                                            email: resp.data.email,
                                            nickname: resp.data.nickname
                                        };
                                        //MAJ du context d'authentification
                                        signIn(user);
                                        //on redirige vers la page du compte
                                        navigate(`/account/${userId}`);



                                    } catch (error) {
                                        console.log(`erreur sur le requete de verif des infos: ${error}`);
                                    }
                                }
                            } catch (error) {
                                console.log(`erreur sur le requete de verif d'email: ${error}`);
                            }
                        } else {
                            setError('Mdp incorrect');
                            return;

                        }
                    } catch (error) {
                        console.log(`erreur sur le requete de verif du mdp: ${error}`);
                    }

                } else {
                    setError('Tous les champs sont obligatoires');
                    return;
                }
            } else {
                //on déconnecte 
                signOut();
                //on redirige vers la page de connexion
                navigate('/');
            }

        } catch (error) {

        }
    }







    return (
        <div>
            <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
                <h2 className='text-white font-bold text-xl py-5'>Enregistrez vous !</h2>
                <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                    {/*input pour nickname */}
                    <CustomInput state={nicknameValue} label="Mon pseudo" type="text" callable={(event) => setNicknameValue(event.target.value)} />
                    {/*input pour mail */}
                    <CustomInput state={emailValue} label="Mon email" type="email" callable={(event) => setEmailValue(event.target.value)} />
                    {/*input pour password */}
                    <CustomInput state={passwordValue} label="Mon mot de passe" type="password" callable={(event) => setPasswordValue(event.target.value)} />

                    <div className='flex items-center justify-center pt-5'>
                        {isLoading ? <ButtonLoader /> :
                            <button type='submit' className='bg-green hover:bg-grenn_top text-white font-bold py-2 px-4 rounded'>
                                S'enregistrer
                            </button>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditInfo