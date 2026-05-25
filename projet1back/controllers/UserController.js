import prisma from "../db.js"
import bcrypt from "bcryptjs"

export default class UserController {
  prisma = prisma

  // Récupérer un utilisateur
  getUser = async (req, res) => {
    const { id } = req.params
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          tel: true,
          Adresse: true,
          avatar: true,
          createdAt: true,
        }
      })

      if (!user) {
        return res.status(404).json({ status: false, message: "Utilisateur non trouvé" })
      }

      res.status(200).json({ status: true, data: user })

    } catch (error) {
      console.error("Erreur getUser:", error)
      res.status(500).json({ status: false, message: "Erreur interne du serveur" })
    }
  }

  // Mettre à jour un utilisateur
  updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
      // Si un nouveau mot de passe est fourni, on le chiffre
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10)
      }

      const user = await this.prisma.user.update({
        where: { id: Number(id) },
        data: data,
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          tel: true,
          Adresse: true,
        }
      })

      res.status(200).json({ status: true, data: user })

    } catch (error) {
      console.error("Erreur updateUser:", error)
      res.status(500).json({ status: false, message: "Erreur interne du serveur" })
    }
  }
}