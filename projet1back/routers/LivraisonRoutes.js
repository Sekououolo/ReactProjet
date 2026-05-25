import express from "express";
import LivraisonController from "../controllers/LivraisonController.js";

const livraisonRouter = express.Router();
const livraisonController = new LivraisonController();

// Récupérer toutes les livraisons
livraisonRouter.get("/", livraisonController.getLivraisons);

// Créer une nouvelle livraison
livraisonRouter.post("/", livraisonController.createLivraison);

// Rechercher, mettre à jour, supprimer une livraison par id
livraisonRouter.get("/:id", livraisonController.findLivraison);
livraisonRouter.put("/:id", livraisonController.updateLivraison);
livraisonRouter.delete("/:id", livraisonController.deleteLivraison);

export default livraisonRouter;
