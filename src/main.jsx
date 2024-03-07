import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import OnlineRouteur from './router/OnlineRouteur.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouteur from './router/AppRouteur.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*On enregistre le context d'auth */}
    <AuthContextProvider>
      {/*on enregistre le store*/}
      <Provider store={store}>
        {/*On enregistre le appRouter  */}
        <AppRouteur />

      </Provider>
  
</AuthContextProvider>
</React.StrictMode>,
)
