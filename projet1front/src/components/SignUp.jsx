import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APP_URI } from '../conf';

function SignUp({ setUser }) {

  const [login, setLogin] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [motDePasse2, setMotDePasse2] = useState('')
  const [erreur, setErreur] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')

    // Vérification que les deux mots de passe sont identiques
    if (motDePasse !== motDePasse2) {
      setErreur('Les mots de passe ne correspondent pas')
      return // On arrête ici, pas d'appel au backend
    }

    // Vérification que les champs ne sont pas vides
    if (!login || !motDePasse) {
      setErreur('Veuillez remplir tous les champs')
      return
    }

    try {
      // On envoie les données au backend pour créer le compte
      const response = await axios.post(`${APP_URI}/inscription`, {
        login,
        motDePasse
      })

      const { data } = response.data

      // Après inscription, on connecte automatiquement l'utilisateur
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)

      // On redirige vers l'accueil
      navigate('/')

    } catch (error) {
      // Si le login existe déjà par exemple
      setErreur(error.response?.data?.message || 'Erreur lors de la création du compte')
    }
  }

  return (
    <main>
      <div id="auth-form">
        <h2>Inscription</h2>
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
          <div>
            <label htmlFor="mp2">Mot de passe à nouveau :</label>
            <input
              type="password"
              name="mp2"
              id="mp2"
              value={motDePasse2}
              onChange={(e) => setMotDePasse2(e.target.value)}
            />
          </div>

          {/* Affiche l'erreur si elle existe */}
          {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

          <div>
            <input type="submit" value="Créer le compte" className="submit-btn" />
          </div>
          <hr />
          <p>
            Vous avez déjà un compte ?{' '}
            <NavLink to="/connexion">Connectez vous</NavLink>
          </p>
        </form>
      </div>
      <div id="auth-img">
        <img src={require('../img/auth_img.png')} alt="authentification img" />
      </div>
    </main>
  )
}

export default SignUp;