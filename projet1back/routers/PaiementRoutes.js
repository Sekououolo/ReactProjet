import express from "express";
import PaiementController from "../controllers/PaiementController.js";

const paiementRouter = express.Router();
const paiementController = new PaiementController();

// Récupérer tous les paiements
paiementRouter.get("/", paiementController.getPaiements);

// Créer un nouveau paiement
paiementRouter.post("/", paiementController.createPaiement);

// Rechercher un paiement par id
paiementRouter.get("/:id", paiementController.findPaiement);

// Mettre à jour un paiement
paiementRouter.put("/:id", paiementController.updatePaiement);

// Supprimer un paiement
paiementRouter.delete("/:id", paiementController.deletePaiement);

export default paiementRouter;
