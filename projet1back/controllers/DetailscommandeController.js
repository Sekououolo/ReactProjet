import prisma from "../db.js";

export default class DetailsCommandeController {
  // Créer un nouveau détail de commande
  createDetailsCommande = async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Aucune donnée reçue",
      });
    }

    try {
      const { commandeId, produitId } = data;
      const commandeIdNumber = Number(commandeId);
      const produitIdNumber = Number(produitId);

      if (!commandeIdNumber || !produitIdNumber) {
        return res.status(400).json({
          status: false,
          message: "commandeId et produitId sont obligatoires",
        });
      }

      const [commande, produit] = await Promise.all([
        prisma.commande.findUnique({
          where: {
            id: commandeIdNumber,
          },
        }),
        prisma.produit.findUnique({
          where: {
            id: produitIdNumber,
          },
        }),
      ]);

      if (!commande) {
        return res.status(404).json({
          status: false,
          msg: "Cette commande n'existe pas",
        });
      }

      if (!produit) {
        return res.status(404).json({
          status: false,
          msg: "Ce produit n'existe pas",
        });
      }

      const existing = await prisma.detailsCommande.findFirst({
        where: {
          commandeId: commandeIdNumber,
          produitId: produitIdNumber,
        },
      });

      if (existing) {
        return res.status(409).json({
          status: false,
          msg: "Ce détail de commande existe déjà",
        });
      }

      const detail = await prisma.detailsCommande.create({
        data: {
          ...data,
          commandeId: commandeIdNumber,
          produitId: produitIdNumber,
          quantite: Number(data.quantite),
          prix: Number(data.prix),
        },
      });

      return res.status(201).json({
        status: true,
        msg: "Détail de commande créé avec succès",
        data: detail,
      });
    } catch (error) {
      console.error("Erreur createDetailsCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Modifier un détail de commande
  updateDetailsCommande = async (req, res) => {
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
      const detail = await prisma.detailsCommande.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!detail) {
        return res.status(404).json({
          status: false,
          msg: "Ce détail de commande n'existe pas",
        });
      }

      const updatedDetail = await prisma.detailsCommande.update({
        where: {
          id: Number(id),
        },
        data,
      });

      return res.status(200).json({
        status: true,
        msg: "Détail de commande modifié avec succès",
        data: updatedDetail,
      });
    } catch (error) {
      console.error("Erreur updateDetailsCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Rechercher un détail de commande
  findDetailsCommande = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const detail = await prisma.detailsCommande.findUnique({
        where: {
          id: Number(id),
        },

        include: {
          commande: true,
          produit: true,
        },
      });

      if (!detail) {
        return res.status(404).json({
          status: false,
          msg: "Ce détail de commande n'existe pas",
        });
      }

      return res.status(200).json({
        status: true,
        data: detail,
      });
    } catch (error) {
      console.error("Erreur findDetailsCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Récupérer tous les détails de commandes
  getDetailsCommandes = async (req, res) => {
    try {
      const { commandeId } = req.query;

      const details = await prisma.detailsCommande.findMany({
        where: commandeId
          ? {
              commandeId: Number(commandeId),
            }
          : undefined,

        select: {
          id: true,
          quantite: true,
          prix: true,
          createdAt: true,

          commande: {
            select: {
              id: true,
              num: true,
              status: true,
            },
          },

          produit: {
            select: {
              id: true,
              nom: true,
              photo: true,
            },
          },
        },
      });

      return res.status(200).json({
        status: true,
        data: details,
      });
    } catch (error) {
      console.error("Erreur getDetailsCommandes :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };

  // Supprimer un détail de commande
  deleteDetailsCommande = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID manquant",
      });
    }

    try {
      const detail = await prisma.detailsCommande.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!detail) {
        return res.status(404).json({
          status: false,
          msg: "Ce détail de commande n'existe pas",
        });
      }

      await prisma.detailsCommande.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        status: true,
        msg: "Détail de commande supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur deleteDetailsCommande :", error);

      return res.status(500).json({
        status: false,
        message: "Erreur interne du serveur",
      });
    }
  };
}
