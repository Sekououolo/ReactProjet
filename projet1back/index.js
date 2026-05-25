import produitRouter from "./routers/ProduitRoutes.js";
import commandeRouter from "./routers/CommandeRoutes.js";
import detailsCommandeRouter from "./routers/DetailscommandeRoutes.js";
import paiementRouter from "./routers/PaiementRoutes.js";
import livraisonRouter from "./routers/LivraisonRoutes.js";
import authRouter from "./routers/AuthRoutes.js"; 
import userRouter from "./routers/UserRoutes.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/produits", produitRouter);
app.use("/commandes", commandeRouter);
app.use("/details-commandes", detailsCommandeRouter);
app.use("/paiements", paiementRouter);
app.use("/livraisons", livraisonRouter);
app.use("/", authRouter);
app.use("/users", userRouter);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});