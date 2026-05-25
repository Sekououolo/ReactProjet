import express from "express";
import CommandeController from "../controllers/CommandeController.js";

const commandeRouter = express.Router();
const commandeController = new CommandeController();

// Rechercher une commande par id ou num
commandeRouter.get("/:element", commandeController.findCommande);

// Récupérer toutes les commandes
commandeRouter.get("/", commandeController.getCommandes);

// Créer une nouvelle commande
commandeRouter.post("/", commandeController.createCommande);

// Mettre à jour une commande existante
commandeRouter.put("/:id", commandeController.updateCommande);

// Supprimer une commande
commandeRouter.delete("/:id", commandeController.deleteCommande);

export default commandeRouter;
