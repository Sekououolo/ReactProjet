import React from 'react'
import { Link } from "react-router-dom"

function BadgeProduit({produit, panier, setPanier}) {
  const addToPanier = () => {
    const produitInPanier = panier.find((item) => item.produit.id===produit.id)
    if(produitInPanier) {
    const panierSansProduit = panier.filter((item) => item.produit.id!==produit.id)
    const newPanier = [...panierSansProduit, {produit, qte: produitInPanier.qte+1}]
    setPanier(newPanier)
  }
  else {
    const newPanier = [...panier, {produit, qte: 1}]
    setPanier(newPanier)
  }
}
  return (
    <>
      <div className="produit-badge">
        <div className="produit-image">
          <img src={require(`../img/products/${produit.photo}`)} alt={produit.nom} />
        </div>
        <div className="produit-details">
          <h2>{produit.nom}</h2>
          <h3>{produit.prix}</h3>
        </div>
        <div className="produit-bouton">
          <button className="details-btn" id="1"><Link to={`/details/${produit.id}`} className="details-btn">Détails</Link></button>
          <button className="ajout-panier-btn" onClick={addToPanier}>+Panier</button>
        </div>
      </div>
    </>
  )
}

export default BadgeProduit;