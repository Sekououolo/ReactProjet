import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { APP_URI } from '../conf'
import { Link, useNavigate } from 'react-router-dom'

function MesCommandes({ user }) {
  const navigate = useNavigate()

  const getCommandes = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${APP_URI}/commandes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const { data } = response.data

    // On garde seulement les commandes de cet utilisateur non payées
    return data.filter(
      (cmd) => cmd.userId === user.id && cmd.status === 'en attente'
    )
  }

  const { data: commandes } = useSWR('mes-commandes', getCommandes)

  if (!commandes) return <h2>Chargement des commandes...</h2>

  return (
    <main>
      <div id="mes-commandes">
        <h2>Mes commandes en attente de paiement</h2>

        {commandes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <p>Vous n'avez aucune commande en attente.</p>
            <Link to="/">Retour à l'accueil</Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Date</th>
                <th>Total (FCFA)</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd) => (
                <tr key={cmd.id}>
                  <td>{cmd.num || `CMD-${cmd.id}`}</td>
                  <td>{new Date(cmd.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>{cmd.total}</td>
                  <td>{cmd.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/paiement/${cmd.id}`)}
                    >
                      Procéder au paiement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}

export default MesCommandes