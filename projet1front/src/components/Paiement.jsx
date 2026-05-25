import React, { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { APP_URI } from '../conf'
import { useParams, useNavigate } from 'react-router-dom'

function Paiement({ user }) {
  const { id } = useParams() // id de la commande
  const navigate = useNavigate()

  const [modePaiement, setModePaiement] = useState('mobile')
  const [numTransaction, setNumTransaction] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  // Charger les détails de la commande
  const getCommande = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${APP_URI}/commandes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.data
  }

  const { data: commande } = useSWR(`commande-${id}`, getCommande)

  if (!commande) return <h2>Chargement de la commande...</h2>

  const handlePaiement = async (e) => {
    e.preventDefault()
    setErreur('')

    if (!numTransaction) {
      setErreur('Le numéro de transaction est obligatoire')
      return
    }

    setChargement(true)

    try {
      const token = localStorage.getItem('token')

      // Créer le paiement
      await axios.post(
        `${APP_URI}/paiements`,
        {
          num: Number(numTransaction),
          support: modePaiement,
          commandeId: Number(id),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Mettre à jour le statut de la commande à "payée"
      await axios.put(
        `${APP_URI}/commandes/${id}`,
        { status: 'payée' },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Rediriger vers les commandes avec succès
      navigate('/commandes')

    } catch (error) {
      console.error('Erreur paiement:', error)
      setErreur(error.response?.data?.message || 'Erreur lors du paiement')
    } finally {
      setChargement(false)
    }
  }

  return (
    <main>
      <div id="paiement">

        {/* Récapitulatif de la commande */}
        <div id="paiement-recap">
          <h2>Récapitulatif de la commande</h2>
          <p><strong>N° Commande :</strong> {commande.num || `CMD-${commande.id}`}</p>
          <p><strong>Date :</strong> {new Date(commande.createdAt).toLocaleDateString('fr-FR')}</p>

          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {commande.DetailsCommandes?.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.produit.nom}</td>
                  <td>{detail.quantite}</td>
                  <td>{detail.prix} FCFA</td>
                  <td>{detail.quantite * detail.prix} FCFA</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>TOTAL</strong></td>
                <td><strong>{commande.total} FCFA</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Formulaire de paiement */}
        <div id="paiement-form">
          <h2>Procéder au paiement</h2>
          <form onSubmit={handlePaiement}>

            <div className="form-group">
              <label>Mode de paiement :</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="modePaiement"
                    value="mobile"
                    checked={modePaiement === 'mobile'}
                    onChange={(e) => setModePaiement(e.target.value)}
                  />
                  {' '}Orange Money / Moov Money
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="modePaiement"
                    value="bancaire"
                    checked={modePaiement === 'bancaire'}
                    onChange={(e) => setModePaiement(e.target.value)}
                  />
                  {' '}Virement bancaire
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="numTransaction">Numéro de transaction :</label>
              <input
                type="text"
                id="numTransaction"
                className="form-control"
                placeholder="Ex: 1234567890"
                value={numTransaction}
                onChange={(e) => setNumTransaction(e.target.value)}
              />
            </div>

            {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={chargement}
            >
              {chargement ? 'Traitement...' : 'Confirmer le paiement'}
            </button>

          </form>
        </div>

      </div>
    </main>
  )
}

export default Paiement