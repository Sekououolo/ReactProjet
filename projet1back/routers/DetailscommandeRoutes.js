import express from "express";
import DetailsCommandeController from "../controllers/DetailscommandeController.js";

const router = express.Router();

const controller = new DetailsCommandeController();

// Rechercher un détail par ID
router.get("/:id", controller.findDetailsCommande);

// Récupérer tous les détails
router.get("/", controller.getDetailsCommandes);

// Créer un détail
router.post("/", controller.createDetailsCommande);

// Modifier un détail
router.put("/:id", controller.updateDetailsCommande);

// Supprimer un détail
router.delete("/:id", controller.deleteDetailsCommande);

export default router;