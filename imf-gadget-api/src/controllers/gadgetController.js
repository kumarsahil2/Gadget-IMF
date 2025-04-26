import { AppDataSource } from "../omrconfig.js";
import { generateCodename } from "../utils/generateCodename.js";

const gadgetRepo = AppDataSource.getRepository("Gadget");

export const getAllGadgets = async (req, res) => {
  const status = req.query.status;
  const gadgets = status
    ? await gadgetRepo.find({ where: { status } })
    : await gadgetRepo.find();

  const withProbabilities = gadgets.map((g) => ({
    ...g,
    successProbability: `${Math.floor(Math.random() * 21) + 80}%`
  }));

  res.json(withProbabilities);
};

export const createGadget = async (req, res) => {
  const gadget = gadgetRepo.create({
    name: generateCodename(),
    status: "Available"
  });
  await gadgetRepo.save(gadget);
  res.status(201).json(gadget);
};

export const updateGadget = async (req, res) => {
  const gadget = await gadgetRepo.findOneBy({ id: req.params.id });
  if (!gadget) return res.status(404).json({ error: "Gadget not found" });
  gadgetRepo.merge(gadget, req.body);
  const updated = await gadgetRepo.save(gadget);
  res.json(updated);
};

export const deleteGadget = async (req, res) => {
  const gadget = await gadgetRepo.findOneBy({ id: req.params.id });
  if (!gadget) return res.status(404).json({ error: "Gadget not found" });
  gadget.status = "Decommissioned";
  gadget.decommissionedAt = new Date();
  const updated = await gadgetRepo.save(gadget);
  res.json(updated);
};

export const selfDestruct = async (req, res) => {
  const gadget = await gadgetRepo.findOneBy({ id: req.params.id });
  if (!gadget) return res.status(404).json({ error: "Gadget not found" });
  const code = Math.floor(100000 + Math.random() * 900000);
  res.json({ message: "Self-destruct initiated!", confirmationCode: code });
};
