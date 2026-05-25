import { useState, useEffect } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./components/Cart";
import Profil from "./components/Profil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import DetailsProduit from "./components/DetailsProduit";
import MesCommandes from "./components/MesCommandes";
import Checkout from "./components/Checkout";
import Paiement from "./components/Paiement";

function App() {
  // State de l'utilisateur connecté
  // On récupère depuis localStorage s'il était déjà connecté
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // State du panier persisté dans localStorage
  const savedPanier = localStorage.getItem("panier");
  const [panier, setPanier] = useState(
    savedPanier ? JSON.parse(savedPanier) : [],
  );

  // Sauvegarde automatique du panier à chaque changement
  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  // Fonction de déconnexion : vide le localStorage et remet user à null
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Router>
        {/* On passe user et signOut au Header pour afficher le bon menu */}
        <Header panier={panier} user={user} signOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={<Home panier={panier} setPanier={setPanier} />}
          />

          <Route
            path="/panier"
            element={<Cart panier={panier} setPanier={setPanier} user={user} />}
          />

          <Route
            path="/profil"
            element={
              user ? (
                <Profil user={user} setUser={setUser} />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />

          <Route
            path="/commandes"
            element={
              user ? <MesCommandes user={user} /> : <Navigate to="/connexion" />
            }
          />

          {/* Si déjà connecté, redirige vers l'accueil au lieu d'afficher la page */}
          <Route
            path="/connexion"
            element={user ? <Navigate to="/" /> : <SignIn setUser={setUser} />}
          />

          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignIn setUser={setUser} />}
          />

          {/* Même chose pour l'inscription */}
          <Route
            path="/inscription"
            element={user ? <Navigate to="/" /> : <SignUp setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp setUser={setUser} />}
          />

          {/* Déconnexion : appelle signOut et redirige vers l'accueil */}
          <Route
            path="/deconnexion"
            element={<SignOutPage signOut={signOut} />}
          />
          <Route path="/signout" element={<SignOutPage signOut={signOut} />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/details/:id"
            element={<DetailsProduit panier={panier} setPanier={setPanier} />}
          />

          <Route
            path="/checkout"
            element={
              // Checkout nécessite d'être connecté
              user ? (
                <Checkout panier={panier} setPanier={setPanier} user={user} />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route
            path="/paiement/:id"
            element={
              user ? <Paiement user={user} /> : <Navigate to="/connexion" />
            }
          />

          {/* Page 404 pour toute URL inconnue */}
          <Route
            path="*"
            element={
              <main style={{ textAlign: "center", padding: "50px" }}>
                <h2>404 - Page non trouvée</h2>
                <a href="/">Retour à l'accueil</a>
              </main>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

// Composant simple pour gérer la déconnexion
// Il appelle signOut et redirige immédiatement vers l'accueil
function SignOutPage({ signOut }) {
  useEffect(() => {
    signOut();
  }, [signOut]);
  return <Navigate to="/" />;
}

export default App;
