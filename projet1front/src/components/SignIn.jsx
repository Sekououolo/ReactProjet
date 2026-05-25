import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APP_URI } from '../conf'

function SignIn({ setUser }) {

  // On stocke ce que l'utilisateur tape
  const [login, setLogin] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')

  // useNavigate permet de rediriger vers une autre page
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Empêche le rechargement de la page

    try {
      // On envoie les identifiants au backend
      const response = await axios.post(`${APP_URI}/connexion`, {
        login,
        motDePasse
      })

      const { data } = response.data

      // On sauvegarde le token et l'utilisateur
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // On met à jour l'état global de l'utilisateur
      setUser(data.user)

      // On redirige vers l'accueil
      navigate('/')

    } catch (error) {
      // Si le backend renvoie une erreur (mauvais mot de passe etc.)
      setErreur('Login ou mot de passe incorrect')
    }
  }

  return (
    <main>
      <div id="auth-form">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="lo">Login :</label>
            <input
              type="text"
              name="lo"
              id="lo"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mp">Mot de passe :</label>
            <input
              type="password"
              name="mp"
              id="mp"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>

          {/* Affiche l'erreur si elle existe */}
          {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

          <div>
            <input type="submit" value="Se connecter" className="submit-btn" />
          </div>
          <hr />
          <p>
            Vous n'avez pas de compte ?{' '}
            <NavLink to="/inscription">Créez votre compte</NavLink>
          </p>
        </form>
      </div>
      <div id="auth-img">
        <img src={require('../img/auth_img.png')} alt="authentification img" />
      </div>
    </main>
  )
}

export default SignIn