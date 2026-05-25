import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return process.env.JWT_SECRET;
};

export default class AuthController {
  prisma = prisma;

  // -------  INSCRIPTION  -------
  inscription = async (req, res) => {
    const { login, motDePasse } = req.body;

    // Seuls login et motDePasse sont obligatoires
    if (!login || !motDePasse) {
      return res.status(400).json({
        status: false,
        message: "Login et mot de passe obligatoires",
      });
    }

    try {
      const userExiste = await this.prisma.user.findUnique({
        where: { email: login },
      });

      if (userExiste) {
        return res.status(400).json({
          status: false,
          message: "Ce login est déjà utilisé",
        });
      }

      const hash = await bcrypt.hash(motDePasse, 10);

      const user = await this.prisma.user.create({
        data: {
          email: login,
          password: hash,
        },
      });

      const token = jwt.sign(
        { id: user.id, login: user.email },
        getJwtSecret(),
        { expiresIn: "7d" },
      );

      res.status(200).json({
        status: true,
        data: { token, user: { id: user.id, login: user.email } },
      });
    } catch (error) {
      console.error("Erreur inscription:", error);
      res
        .status(500)
        .json({ status: false, message: "Erreur interne du serveur" });
    }
  };

  // -------  CONNEXION  -------
  connexion = async (req, res) => {
    const { login, motDePasse } = req.body;

    // Seuls login et motDePasse sont obligatoires
    if (!login || !motDePasse) {
      return res.status(400).json({
        status: false,
        message: "Login et mot de passe obligatoires",
      });
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: login },
      });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "Login ou mot de passe incorrect",
        });
      }

      const motDePasseOk = await bcrypt.compare(motDePasse, user.password);

      if (!motDePasseOk) {
        return res.status(401).json({
          status: false,
          message: "Login ou mot de passe incorrect",
        });
      }

      const token = jwt.sign(
        { id: user.id, login: user.email },
        getJwtSecret(),
        { expiresIn: "7d" },
      );

      res.status(200).json({
        status: true,
        data: { token, user: { id: user.id, login: user.email } },
      });
    } catch (error) {
      console.error("Erreur connexion:", error);
      res
        .status(500)
        .json({ status: false, message: "Erreur interne du serveur" });
    }
  };
}
