import React, { useState } from 'react'
import axios from 'axios'
import { APP_URI } from '../conf'
import { useNavigate } from 'react-router-dom'

function Profil({ user, setUser }) {

  const navigate = useNavigate()

  // On pré-remplit les champs avec les infos actuelles de l'utilisateur
  const [formData, setFormData] = useState({
    login: user?.login || '',
    motDePasse: '',
    motDePasse2: '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    tel: user?.tel || '',
    adresse: user?.adresse || '',
  })

  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  // Si non connecté, redirige vers connexion
  if (!user) {
    navigate('/connexion')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setSucces('')

    // Vérification mots de passe
    if (formData.motDePasse && formData.motDePasse !== formData.motDePasse2) {
      setErreur('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const token = localStorage.getItem('token')

      // On envoie seulement les champs remplis
      const dataToSend = {
        email: formData.login,
        firstname: formData.firstname,
        lastname: formData.lastname,
        tel: formData.tel,
        Adresse: formData.adresse,
      }

      // On ajoute le mot de passe seulement s'il est rempli
      if (formData.motDePasse) {
        dataToSend.password = formData.motDePasse
      }

      await axios.put(
        `${APP_URI}/users/${user.id}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // Mettre à jour les infos dans localStorage et le state
      const updatedUser = { ...user, login: formData.login }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSucces('Profil mis à jour avec succès !')

    } catch (error) {
      setErreur(error.response?.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  return (
    <main>
      <div id="auth-form">
        <h2>Mon Profil</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="login">Login (email) :</label>
            <input
              type="text"
              name="login"
              id="login"
              value={formData.login}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="firstname">Prénom :</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastname">Nom :</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="tel">Téléphone :</label>
            <input
              type="text"
              name="tel"
              id="tel"
              value={formData.tel}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="adresse">Adresse de livraison :</label>
            <input
              type="text"
              name="adresse"
              id="adresse"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>

          <hr />
          <p><strong>Changer le mot de passe</strong> (laisser vide pour ne pas changer)</p>

          <div>
            <label htmlFor="motDePasse">Nouveau mot de passe :</label>
            <input
              type="password"
              name="motDePasse"
              id="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="motDePasse2">Confirmer le mot de passe :</label>
            <input
              type="password"
              name="motDePasse2"
              id="motDePasse2"
              value={formData.motDePasse2}
              onChange={handleChange}
            />
          </div>

          {/* Messages d'erreur et de succès */}
          {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
          {succes && <p style={{ color: 'green' }}>{succes}</p>}

          <div>
            <input type="submit" value="Mettre à jour" className="submit-btn" />
          </div>

        </form>
      </div>
    </main>
  )
}

export default Profil