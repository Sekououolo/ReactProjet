import React from "react";
import btnPlus from "../img/icons/add.png";
import btnMoins from "../img/icons/minus.png";
import btnDelete from "../img/icons/delete.png";
import { Link, useNavigate } from "react-router-dom";

function Cart({ panier, setPanier, user }) {

  const navigate = useNavigate()

  const plusQtePanier = (produit) => {
    const newPanier = panier.map((item) => {
      if (item.produit.id === produit.id) return { ...item, qte: item.qte + 1 };
      return item;
    });
    setPanier(newPanier);
  };

  const moinQtePanier = (produit) => {
    const newPanier = panier.map((item) => {
      if (item.produit.id === produit.id)
        if (item.qte > 1) return { ...item, qte: item.qte - 1 };
      return item;
    });
    setPanier(newPanier);
  };

  const suppItemPanier = (produit) => {
    const newPanier = panier.filter((item) => item.produit.id !== produit.id);
    setPanier(newPanier);
  };

  // Si non connecté, redirige vers connexion avant checkout
  const handleCheckout = () => {
    if (!user) {
      navigate('/connexion')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <main>
      <div id="panier">
        {/* Panier vide */}
        {panier.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Votre panier est vide</h2>
            <Link to="/">Retour à l'accueil</Link>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="photo">Photo</th>
                  <th className="nom">Nom</th>
                  <th className="prix">Prix (F CFA)</th>
                  <th className="quantite">Quantité</th>
                  <th className="total">Total (F CFA)</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {panier.map((item) => (
                  <tr key={item.produit.id}>
                    <td className="photo">
                      <img
                        src={require(`../img/products/${item.produit.photo}`)}
                        alt={item.produit.nom}
                      />
                    </td>
                    <td className="nom">{item.produit.nom}</td>
                    <td className="prix">{item.produit.prix}</td>
                    <td className="quantite">{item.qte}</td>
                    <td className="total">{item.qte * item.produit.prix}</td>
                    <td className="action">
                      <button
                        className="plus-panier"
                        onClick={() => plusQtePanier(item.produit)}
                      >
                        <img src={btnPlus} alt="+" />
                      </button>
                      <button
                        className="minus-panier"
                        onClick={() => moinQtePanier(item.produit)}
                      >
                        <img src={btnMoins} alt="-" />
                      </button>
                      <button
                        className="remove-panier"
                        onClick={() => suppItemPanier(item.produit)}
                      >
                        <img src={btnDelete} alt="supprimer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="grandtotal">
                    GRAND TOTAL (FCFA)
                  </td>
                  <td colSpan="4" className="grandtotalv">
                    {panier.reduce(
                      (total, item) => total + item.qte * item.produit.prix,
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div id="btns-confirmer-annuler-panier">
              {/* Bouton checkout avec vérification connexion */}
              <button id="confirmer-payer" onClick={handleCheckout}>
                Confirmer le panier et payer
              </button>
              <button id="vider-panier" onClick={() => setPanier([])}>
                Vider le panier et reprendre
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;