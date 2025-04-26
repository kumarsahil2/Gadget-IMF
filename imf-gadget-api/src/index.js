import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./omrconfig.js";
import authRoutes from "./routes/authRoutes.js";
import gadgetRoutes from "./routes/gadgetRoutes.js";
import { authenticate } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use(authenticate); // protect gadget routes
app.use(gadgetRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
    });
  })
  .catch((err) => console.error("DB Connection Error: ", err));
