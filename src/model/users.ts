import pool from "../db/pool";
import bcrypt from "bcrypt";

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
): Promise<IUser> => {
  const queryText = "SELECT * FROM users WHERE email=$1";
  const { rows } = await pool.query(queryText, [email]);

  if (rows.length === 0) {
    throw new Error("Email not found, please try again!");
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password, please try again!");
  }

  return user;
};
