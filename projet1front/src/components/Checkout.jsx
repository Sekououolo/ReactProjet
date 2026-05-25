import React, { useState } from "react";
import axios from "axios";
import { APP_URI } from "../conf";
import { useNavigate } from "react-router-dom";
import "../css/checkout.css";

function Checkout({ panier, setPanier, user }) {
  const navigate = useNavigate();

  const [livraison, setLivraison] = useState({
    adresse: user?.adresse || "",
    livreur: "",
  });

  const [modePaiement, setModePaiement] = useState("mobile");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const total = panier.reduce(
    (sum, item) => sum + item.qte * item.produit.prix,
    0,
  );

  const handleLivraisonChange = (e) => {
    const { name, value } = e.target;
    setLivraison({ ...livraison, [name]: value });
  };

  const handleCommande = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    if (!livraison.adresse) {
      setErreur("L'adresse de livraison est obligatoire");
      setChargement(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Étape 1 : Créer la commande
      const responseCommande = await axios.post(
        `${APP_URI}/commandes`,
        {
          userId: user.id,
          total: total,
          status: "en attente",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const commande = responseCommande.data.data;

      // Étape 2 : Créer les détails de la commande (un par produit)
      for (const item of panier) {
        await axios.post(
          `${APP_URI}/details-commandes`,
          {
            commandeId: commande.id,
            produitId: item.produit.id,
            quantite: item.qte,
            prix: item.produit.prix,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      // Étape 3 : Vider le panier après commande créée
      setPanier([]);

      // Étape 4 : Rediriger vers le paiement
      navigate(`/paiement/${commande.id}`);
    } catch (error) {
      console.error("Erreur commande:", error);
      setErreur(error.response?.data?.message || "Erreur lors de la commande");
    } finally {
      setChargement(false);
    }
  };

  return (
    <main>
      <div id="checkout">
        {/* --- GAUCHE : Infos de livraison --- */}
        <div id="checkout-livraison">
          <h2>Informations de livraison</h2>
          <form onSubmit={handleCommande}>
            <div className="form-group">
              <label htmlFor="adresse">Adresse de livraison :</label>
              <input
                type="text"
                name="adresse"
                id="adresse"
                className="form-control"
                placeholder="Votre adresse complète"
                value={livraison.adresse}
                onChange={handleLivraisonChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="livreur">Livreur :</label>
              <input
                type="text"
                name="livreur"
                id="livreur"
                className="form-control"
                placeholder="Nom du livreur"
                value={livraison.livreur}
                onChange={handleLivraisonChange}
              />
            </div>

            {/* --- DROITE : Récapitulatif + paiement --- */}
            <div id="checkout-recap">
              <h2>Récapitulatif</h2>

              <table>
                <tbody>
                  {panier.map((item) => (
                    <tr key={item.produit.id}>
                      <td>{item.produit.nom}</td>
                      <td>x{item.qte}</td>
                      <td>{item.qte * item.produit.prix} FCFA</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">
                      <strong>TOTAL</strong>
                    </td>
                    <td>
                      <strong>{total} FCFA</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <h3>Mode de paiement</h3>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paiement"
                    value="mobile"
                    checked={modePaiement === "mobile"}
                    onChange={(e) => setModePaiement(e.target.value)}
                  />{" "}
                  Paiement mobile (Orange Money, Moov)
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paiement"
                    value="bancaire"
                    checked={modePaiement === "bancaire"}
                    onChange={(e) => setModePaiement(e.target.value)}
                  />{" "}
                  Paiement bancaire
                </label>
              </div>
            </div>

            {erreur && <p style={{ color: "red" }}>{erreur}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={chargement}
            >
              {chargement ? "Traitement en cours..." : "Confirmer la commande"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
