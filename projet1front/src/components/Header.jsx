import React from "react";
import Logo from "../img/icons/ico-eshop-s.png";
import User_avatar from "../img/user.png";
import { NavLink } from "react-router-dom";

function Header({ panier, user, signOut }) {
  const panierQte = panier.reduce((nbr, item) => nbr + item.qte, 0);

  function userMenuToggle(event) {
    const menu = document.querySelector(".menu");
    event.preventDefault();
    menu.classList.toggle("active");
  }

  return (
    <header>
      <div id="header-top">
        <div id="logo-nom">
          <img src={Logo} alt="Logo de eshop" />
          <h1>Shopez en toute sécurité !</h1>
        </div>
        <div id="user-nav">
          <div id="user">
            <div className="profile" onClick={userMenuToggle}>
              <h3>
                {/* Affiche le nom de l'utilisateur s'il est connecté */}
                {user ? user.login : "Invité"}
                <br />
                <span>
                  {user ? `Connecté` : "Non connecté"}
                </span>
              </h3>
              <div className="imgBx">
                <img src={User_avatar} alt="Avatar de l'utilisateur" />
              </div>
            </div>

            <div className="menu">
              <ul>
                {/* Si NON connecté : afficher Connexion et Inscription */}
                {!user && (
                  <>
                    <li>
                      <NavLink to="/connexion">
                        <ion-icon name="log-in-outline"></ion-icon>
                        Connexion
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/inscription">
                        <ion-icon name="person-add-outline"></ion-icon>
                        Inscription
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Si connecté : afficher Profil, Commandes et Déconnexion */}
                {user && (
                  <>
                    <li>
                      <NavLink to="/profil">
                        <ion-icon name="person-outline"></ion-icon>
                        Profil
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/commandes">
                        <ion-icon name="cart-outline"></ion-icon>
                        Mes commandes
                      </NavLink>
                    </li>
                    <li>
                      {/* Au clic, appelle signOut depuis App.jsx */}
                      <NavLink to="/deconnexion" onClick={signOut}>
                        <ion-icon name="log-out-outline"></ion-icon>
                        Déconnexion
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/panier">
                  Panier (<span id="nav-panier">{panierQte}</span>)
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div id="header-banniere">
        <div id="banniere_promo">
          -20% <br />
          Faites le plein du panier &#129321;
        </div>
        <div id="banniere_bouton">
          <div className="banniere_texte">
            Livraison partout au Mali. Satisfait ou remboursé sur 3 jours !
          </div>
          <NavLink to="/" className="bouton_rouge">
            Voir les produits{" "}
            <img src={require("../img/icons/fleche.png")} alt="produit" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;