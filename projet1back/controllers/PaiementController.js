import prisma from "../db.js";

export default class PaiementController {

  // Créer un paiement
  createPaiement = async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Aucune donnée reçue",
      });
    }

    try {
      const { support, details, commandeId } = data;

      // Vérifie si paiement existe déjà pour cette commande (1-1)
      const existingPaiement = await prisma.paiement.findUnique({
        where: {
          commandeId: Number(commandeId),
        },
      });

      if (existingPaiement) {
        return res.status(409).json({
          status: false,
          msg: "Un paiement existe déjà pour cette commande",
        });
      }

      // 🔥 GENERATION AUTOMATIQUE DE num
      const lastPaiement = await prisma.paiement.findFirst({
        orderBy: {
          num: "desc",
        },
      });

      const num = lastPaiement ? lastPaiement.num + 1 : 1;

      // Création paiement
      const paiement = await prisma.paiement.create({
        data: {
          num,
          support,
          details,
          commandeId: Number(commandeId),
        },
      });

      return res.status(201).json({
        status: true,
        msg: "Paiement créé avec succès",
        data: paiement,
      });

    } catch (error) {
      console.error("Erreur createPaiement :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Modifier un paiement
  updatePaiement = async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Aucune donnée reçue",
      });
    }

    try {
      const paiement = await prisma.paiement.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!paiement) {
        return res.status(404).json({
          status: false,
          msg: "Ce paiement n'existe pas",
        });
      }

      const updatedPaiement = await prisma.paiement.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return res.status(200).json({
        status: true,
        msg: "Paiement modifié avec succès",
        data: updatedPaiement,
      });

    } catch (error) {
      console.error("Erreur updatePaiement :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Rechercher un paiement
  findPaiement = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const paiement = await prisma.paiement.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          commande: {
            select: {
              id: true,
              num: true,
              status: true,
              total: true,
            },
          },
        },
      });

      if (!paiement) {
        return res.status(404).json({
          status: false,
          msg: "Ce paiement n'existe pas",
        });
      }

      return res.status(200).json({
        status: true,
        data: paiement,
      });

    } catch (error) {
      console.error("Erreur findPaiement :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Récupérer tous les paiements
  getPaiements = async (req, res) => {
    try {
      const paiements = await prisma.paiement.findMany({
        select: {
          id: true,
          num: true,
          date: true,
          support: true,
          details: true,
          commande: {
            select: {
              id: true,
              num: true,
              total: true,
              status: true,
            },
          },
        },
      });

      return res.status(200).json({
        status: true,
        data: paiements,
      });

    } catch (error) {
      console.error("Erreur getPaiements :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Supprimer un paiement
  deletePaiement = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const paiement = await prisma.paiement.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!paiement) {
        return res.status(404).json({
          status: false,
          msg: "Ce paiement n'existe pas",
        });
      }

      await prisma.paiement.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        status: true,
        msg: "Paiement supprimé avec succès",
      });

    } catch (error) {
      console.error("Erreur deletePaiement :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };
}