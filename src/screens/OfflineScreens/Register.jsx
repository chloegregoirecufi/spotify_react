import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../../components/CustomInput'
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { apiRoot } from '../../constants/apiConstant';

const Register = () => {

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //on recupere la methode signIn du context d'auth
  const {signIn} = useAuthContext()
  //on récupère le hook de navigation
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault() //empeche le fonctionnement par default du form
    setIsLoading(true);
    axios.post(`${apiRoot}/register`, {
      nickname, email, password
    }).then((response)=>{
      if(response.data.email){
        const user = {
          userId: response.data.id,
          nickname: response.data.nickname,
          email: response.data.email,
        }
        try {
          signIn(user);
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lor de le creation de session ${error}`);
        }
      }else{
        setIsLoading(false);
        console.log(`Erreur lors de la réponse serveur: ${response}`);
      }
    }).catch((error)=> {
      setIsLoading(false);
      console.log(`Erreur lors de l'enregistrmeet de l'user: ${error}`);
    })//then le serveur renvoi dedans et si il ne recoit rien ça part dans le catch
  }


  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl py-5'>Enregistrez vous !</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/*input pour nickname */}
        <CustomInput state={nickname} label="Mon pseudo" type="text" callable={(event)=> setNickname(event.target.value)}/>
        {/*input pour mail */}
        <CustomInput state={email} label="Mon email" type="email" callable={(event)=> setEmail(event.target.value)}/>
        {/*input pour password */}
        <CustomInput state={password} label="Mon mot de passe" type="password" callable={(event)=> setPassword(event.target.value)}/>

        <p className='text-white'> Vous avez déjà un <Link to='/' className='text-white font-bold'>compte</Link> ?</p>
        <div className='flex items-center justify-center pt-5'>
          { isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-grenn_top text-white font-bold py-2 px-4 rounded'>
            S'enregistrer
          </button>}
          </div>
      </form>
    </div>
    
  )
}

export default Register