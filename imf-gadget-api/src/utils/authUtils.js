import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePasswords = (raw, hash) => bcrypt.compare(raw, hash);
export const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
