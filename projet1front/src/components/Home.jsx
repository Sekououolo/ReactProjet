import React from "react";
import BadgeProduit from "./BadgeProduit";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { APP_URI } from "../conf";

function Home({ panier, setPanier }) {
  const [filter, setFilter] = useState({
    nom: "",
    cat: "Tout",
    prixmin: "",
    prixmax: "",
  });

  const getProduits = async () => {
    const response = await axios.get(`${APP_URI}/produits`);
    const { data } = response.data;
    return data;
  };

  const { data } = useSWR("produits", getProduits);

  if (!data) return <h2>Chargement des produits en cours...</h2>;

  const produits = data;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const produitsFiltres = produits.filter((produit) => {
    const nomMatch = produit.nom
      .toLowerCase()
      .includes(filter.nom.toLowerCase());
    const catMatch = filter.cat === "Tout" || produit.categorie === filter.cat;
    const prixMinMatch =
      filter.prixmin === "" || produit.prix >= parseFloat(filter.prixmin);
    const prixMaxMatch =
      filter.prixmax === "" || produit.prix <= parseFloat(filter.prixmax);
    return nomMatch && catMatch && prixMinMatch && prixMaxMatch;
  });

  return (
    <>
      <main>
        <section id="produits">
          <div id="produits-liste">
            {produitsFiltres.map((produit) => (
              <BadgeProduit
                key={produit.id}
                produit={produit}
                panier={panier}
                setPanier={setPanier}
              />
            ))}
          </div>
        </section>
        <aside id="filtre">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="nom">Produit:</label>
              <input
                type="text"
                className="form-control"
                name="nom"
                id="nom"
                placeholder="Que cherchez-vous?"
                value={filter.nom}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cat">Categorie:</label>
              <select
                name="cat"
                id="cat"
                className="form-control"
                onChange={handleFilterChange}
                value={filter.cat}
              >
                <option value="Tout">Toutes les catégories</option>
                <option value="Habits/Mode">Habits/Mode</option>
                <option value="Electronique">Appareils électroniques</option>
                <option value="Meuble">Meubles</option>
                <option value="Cosmétique">Produits cosmétiques</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="prixmin">Prix min:</label>
              <input
                type="text"
                className="form-control"
                name="prixmin"
                id="prixmin"
                placeholder="Prix min"
                value={filter.prixmin}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prixmax">Prix max:</label>
              <input
                type="text"
                className="form-control"
                name="prixmax"
                id="prixmax"
                placeholder="Prix max"
                value={filter.prixmax}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                id="btn-filter"
              >
                Filtrer les produits
              </button>
            </div>
          </form>
        </aside>
      </main>
    </>
  );
}

export default Home;