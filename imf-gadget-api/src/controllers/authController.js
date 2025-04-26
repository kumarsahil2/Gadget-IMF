import { AppDataSource } from "../omrconfig.js";
import { hashPassword, comparePasswords, createToken } from "../utils/authUtils.js";

const userRepo = AppDataSource.getRepository("User");

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await hashPassword(password);
  const user = userRepo.create({ username, password: hashed });
  await userRepo.save(user);
  res.status(201).json({ message: "User registered" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepo.findOneBy({ username });
  if (!user || !(await comparePasswords(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = createToken(user.id);
  res.json({ token });
};
