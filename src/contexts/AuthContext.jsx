import { createContext, useState, useContext } from "react";


//creation context authentification
const AuthContext = createContext({
    userId: '',
    email: '',
    nickname:'',
    setUserId: () => {},
    setEmail: () => {},
    setNickname: () => {},
    signIn: async () => {},
    signOut: async () => {},
});

//on définit toute la mécanique de notre context
const AuthContextProvider = ({children}) => {
    const [userId, setUserId] = useState('');
    const[email, setEmail] = useState('');
    const[nickname, setNickname] = useState('');

    const signIn = async (user) => {
        try {
            setUserId(user.userId)
            setEmail(user.email)
            setNickname(user.nickname)
            localStorage.setItem('userInfos', JSON.stringify(user))
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`)
        }
    }

    const signOut = async () => {
        try {
            setUserId('')
            setEmail('')
            setNickname('')
            localStorage.removeItem('userInfos')
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`)
        }
    }

    const value = {
        userId,
        nickname,
        email,
        setUserId,
        setEmail,
        setNickname,
        signOut,
        signIn
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//création de notre propre hook pour utiliser le context d'authentification
const useAuthContext = () => useContext(AuthContext)

export {AuthContext, AuthContextProvider, useAuthContext}