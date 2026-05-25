import prisma from "../db.js";

export default class CommandeController {
  // Créer une nouvelle commande
  createCommande = async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Aucune donnée reçue",
      });
    }

    try {
      const { num } = data;

      // Vérifie si une commande existe déjà
      const existingCommande = num
        ? await prisma.commande.findFirst({
            where: {
              num: num,
            },
          })
        : null;

      if (existingCommande) {
        return res.status(409).json({
          status: false,
          msg: "Cette commande existe déjà",
        });
      }

      const commande = await prisma.commande.create({
        data,
      });

      return res.status(201).json({
        status: true,
        msg: "Commande créée avec succès",
        data: commande,
      });
    } catch (error) {
      console.error("Erreur createCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Mettre à jour une commande
  updateCommande = async (req, res) => {
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
      const commande = await prisma.commande.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!commande) {
        return res.status(404).json({
          status: false,
          msg: "Cette commande n'existe pas",
        });
      }

      const updatedCommande = await prisma.commande.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return res.status(200).json({
        status: true,
        msg: "Commande modifiée avec succès",
        data: updatedCommande,
      });
    } catch (error) {
      console.error("Erreur updateCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Rechercher une commande
  findCommande = async (req, res) => {
    const { element } = req.params;

    if (!element) {
      return res.status(400).json({
        status: false,
        message: "Aucun élément reçu",
      });
    }

    try {
      const commande = await prisma.commande.findFirst({
        where: {
          OR: [
            {
              id: isNaN(Number(element)) ? undefined : Number(element),
            },
            {
              num: element,
            },
          ],
        },

        include: {
          user: true,

          DetailsCommandes: {
            include: {
              produit: true,
            },
          },
        },
      });

      if (!commande) {
        return res.status(404).json({
          status: false,
          msg: "Cette commande n'existe pas",
        });
      }

      return res.status(200).json({
        status: true,
        data: commande,
      });
    } catch (error) {
      console.error("Erreur findCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Récupérer toutes les commandes
  getCommandes = async (req, res) => {
    try {
      const commandes = await prisma.commande.findMany({
        select: {
          id: true,
          num: true,
          total: true,
          status: true,
          createdAt: true,
          userId: true,

          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return res.status(200).json({
        status: true,
        data: commandes,
      });
    } catch (error) {
      console.error("Erreur getCommandes :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Supprimer une commande
  deleteCommande = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const commande = await prisma.commande.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!commande) {
        return res.status(404).json({
          status: false,
          msg: "Cette commande n'existe pas",
        });
      }

      await prisma.commande.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        status: true,
        msg: "Commande supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur deleteCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };
}
