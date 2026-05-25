import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'
import { APP_URI } from '../conf'

function DetailsProduit({ panier, setPanier }) {
    const { id } = useParams()

    const getProduit = async () => {
        const response = await axios.get(`${APP_URI}/produits/${id}`)
        const { data } = response.data
        return data
    }

    const { data } = useSWR('produit', getProduit)

    if (!data) return <h2>Chargement du produit en cours...</h2>

    // Page 404 si produit non trouvé
    if (data.length === 0 || !data) return (
        <main>
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>404 - Produit non trouvé</h2>
                <p>Ce produit n'existe pas ou a été supprimé.</p>
                <Link className="like-btn" to='/'>Retour à l'accueil</Link>
            </div>
        </main>
    )

    const produit = data

    const addToPanier = () => {
        const produitInPanier = panier.find((item) => item.produit.id === produit.id)
        if (produitInPanier) {
            const panierSansProduit = panier.filter((item) => item.produit.id !== produit.id)
            const newPanier = [...panierSansProduit, { produit, qte: produitInPanier.qte + 1 }]
            setPanier(newPanier)
        } else {
            const newPanier = [...panier, { produit, qte: 1 }]
            setPanier(newPanier)
        }
    }

    return (
        <main>
            <div id="details-photo">
                <img src={require(`../img/products/${produit.photo}`)} alt={produit.nom} />
            </div>
            <div id="details-droite">
                <div id="details-nom-cat-prix">
                    <div id="details-nom-cat">
                        <h2>{produit.nom}</h2>
                        <span>{produit.categorie}</span>
                    </div>
                    <div id="details-prix">
                        <span>{produit.prix}</span> FCFA
                    </div>
                </div>
                <div id="details-description">
                    {produit.description}
                </div>
                <div id="details-boutons">
                    <Link className="like-btn" to='/'>Retour</Link>
                    <button className="like-btn">Liker</button>
                    <button className="ajout-panier-btn" onClick={addToPanier}>+Panier</button>
                </div>
            </div>
        </main>
    )
}

export default DetailsProduit