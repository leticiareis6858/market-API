import pool from "../db/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string[];
}

export const createsUser = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<IUser> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const queryText =
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    email,
    encryptedPassword,
    role,
  ]);
  return rows[0];
};

export const authenticatesUser = async (
  email: string,
  password: string
): Promise<String> => {
  const userQueryText = "SELECT * FROM users WHERE email=$1";
  const { rows } = await pool.query(userQueryText, [email]);
  const user = rows[0];

  if (!user) {
    throw new Error("Invalid creedentials!");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password, please try again!");
  }

  const payload = { id: user.id, name: user.name, role: user.role };
  const secret =
    process.env.JWT_SECRET ||
    "53B71FB31FA20B3EA74319BC9551F5E1EB4046D1F16E81AFCF45CD4C2568B9AE";
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};
