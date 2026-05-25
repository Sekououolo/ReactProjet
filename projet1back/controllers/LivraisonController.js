import prisma from "../db.js";

export default class LivraisonController {
  // Créer une livraison
  createLivraison = async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Aucune donnée reçue",
      });
    }

    try {
      const { commandeId } = data;

      // Vérifie si une livraison existe déjà
      const existingLivraison = await prisma.livraison.findUnique({
        where: {
          commandeId: Number(commandeId),
        },
      });

      if (existingLivraison) {
        return res.status(409).json({
          status: false,
          msg: "Une livraison existe déjà pour cette commande",
        });
      }

      const livraison = await prisma.livraison.create({
        data: {
          ...data,
          commandeId: Number(commandeId),
        },
      });

      return res.status(201).json({
        status: true,
        msg: "Livraison créée avec succès",
        data: livraison,
      });
    } catch (error) {
      console.error("Erreur createLivraison :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Modifier une livraison
  updateLivraison = async (req, res) => {
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
      const livraison = await prisma.livraison.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!livraison) {
        return res.status(404).json({
          status: false,
          msg: "Cette livraison n'existe pas",
        });
      }

      const updatedLivraison = await prisma.livraison.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return res.status(200).json({
        status: true,
        msg: "Livraison modifiée avec succès",
        data: updatedLivraison,
      });
    } catch (error) {
      console.error("Erreur updateLivraison :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Rechercher une livraison
  findLivraison = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const livraison = await prisma.livraison.findUnique({
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

      if (!livraison) {
        return res.status(404).json({
          status: false,
          msg: "Cette livraison n'existe pas",
        });
      }

      return res.status(200).json({
        status: true,
        data: livraison,
      });
    } catch (error) {
      console.error("Erreur findLivraison :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Récupérer toutes les livraisons
  getLivraisons = async (req, res) => {
    try {
      const livraisons = await prisma.livraison.findMany({
        select: {
          id: true,
          num: true,
          date: true,
          adresseL: true,
          livreur: true,

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
        data: livraisons,
      });
    } catch (error) {
      console.error("Erreur getLivraisons :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Supprimer une livraison
  deleteLivraison = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const livraison = await prisma.livraison.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!livraison) {
        return res.status(404).json({
          status: false,
          msg: "Cette livraison n'existe pas",
        });
      }

      await prisma.livraison.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        status: true,
        msg: "Livraison supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur deleteLivraison :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };
}
