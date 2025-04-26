import express from "express";
import {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  selfDestruct
} from "../controllers/gadgetController.js";

const router = express.Router();

router.get("/gadgets", getAllGadgets);
router.post("/gadgets", createGadget);
router.patch("/gadgets/:id", updateGadget);
router.delete("/gadgets/:id", deleteGadget);
router.post("/gadgets/:id/self-destruct", selfDestruct);

export default router;
