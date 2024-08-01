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
    throw new Error("Invalid credentials!");
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

export const createsAdmin = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const queryText =
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,'admin') RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    email,
    encryptedPassword,
  ]);
  return rows[0];
};

export const createsManager = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const queryText =
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,'manager') RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    email,
    encryptedPassword,
  ]);
  return rows[0];
};

export const createsStocker = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const queryText =
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,'stocker') RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    email,
    encryptedPassword,
  ]);
  return rows[0];
};

export const createsCashier = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const queryText =
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,'cashier') RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    email,
    encryptedPassword,
  ]);
  return rows[0];
};

//update:

export const updatesUser = async (
  id: number,
  name: string,
  email: string
): Promise<void> => {
  if (!email) {
    const queryText = "UPDATE users SET name=$2 WHERE id=$1";
    await pool.query(queryText, [id, name]);
  }
  if (!name) {
    const queryText = "UPDATE users SET email=$2 WHERE id=$1";
    await pool.query(queryText, [id, email]);
  }

  if (!name && !email) {
    throw new Error("Please provide a name or email to update!");
  }

  if (name && email) {
    const queryText = "UPDATE users SET name=$2, email=$3 WHERE id=$1";
    await pool.query(queryText, [id, name, email]);
  }
};

export const updatesManager = async (
  id: number,
  name: string,
  email: string
): Promise<void> => {
  if (!email) {
    const queryText = "UPDATE users SET name=$2 WHERE id=$1 AND role='manager'";
    await pool.query(queryText, [id, name]);
  }
  if (!name) {
    const queryText =
      "UPDATE users SET email=$2 WHERE id=$1 AND role='manager'";
    await pool.query(queryText, [id, email]);
  }

  if (!name && !email) {
    throw new Error("Please provide a name or email to update!");
  }

  if (name && email) {
    const queryText =
      "UPDATE users SET name=$2, email=$3 WHERE id=$1 AND role='manager'";
    await pool.query(queryText, [id, name, email]);
  }
};

export const updatesStocker = async (
  id: number,
  name: string,
  email: string
): Promise<void> => {
  if (!email) {
    const queryText = "UPDATE users SET name=$2 WHERE id=$1 AND role='stocker'";
    await pool.query(queryText, [id, name]);
  }
  if (!name) {
    const queryText =
      "UPDATE users SET email=$2 WHERE id=$1 AND role='stocker'";
    await pool.query(queryText, [id, email]);
  }

  if (!name && !email) {
    throw new Error("Please provide a name or email to update!");
  }

  if (name && email) {
    const queryText =
      "UPDATE users SET name=$2, email=$3 WHERE id=$1 AND role='stocker'";
    await pool.query(queryText, [id, name, email]);
  }
};

export const updatesCashier = async (
  id: number,
  name: string,
  email: string
): Promise<void> => {
  if (!email) {
    const queryText = "UPDATE users SET name=$2 WHERE id=$1 AND role='cashier'";
    await pool.query(queryText, [id, name]);
  }
  if (!name) {
    const queryText =
      "UPDATE users SET email=$2 WHERE id=$1 AND role='cashier'";
    await pool.query(queryText, [id, email]);
  }

  if (!name && !email) {
    throw new Error("Please provide a name or email to update!");
  }

  if (name && email) {
    const queryText =
      "UPDATE users SET name=$2, email=$3 WHERE id=$1 AND role='cashier''";
    await pool.query(queryText, [id, name, email]);
  }
};

export const updatesEmail = async (
  id: number,
  email: string
): Promise<void> => {
  const queryText = "UPDATE users SET email=$2 WHERE id=$1";
  await pool.query(queryText, [id, email]);
};

export const updatesPassword = async (
  id: number,
  password: string
): Promise<void> => {
  const queryText = "UPDATE users SET password=$2 WHERE id=$1";
  await pool.query(queryText, [id, password]);
};

export const updatesRole = async (id: number, role: string): Promise<void> => {
  const queryText = "UPDATE users SET role=$2 WHERE id=$1";
  await pool.query(queryText, [id, role]);
};

export const updatesName = async (id: number, name: string): Promise<void> => {
  const queryText = "UPDATE users SET name=$2 WHERE id=$1";
  await pool.query(queryText, [id, name]);
};

//delete:

export const deletesUser = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM users WHERE id=$1";
  await pool.query(queryText, [id]);
};

export const deletesManager = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM users WHERE id=$1 AND role='manager'";
  await pool.query(queryText, [id]);
};

export const deletesStocker = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM users WHERE id=$1 AND role='stocker'";
  await pool.query(queryText, [id]);
};

export const deletesCashier = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM users WHERE id=$1 AND role='cashier'";
  await pool.query(queryText, [id]);
};

//get all:

export const getsAllWorkers = async (): Promise<
  { name: string; role: string }[]
> => {
  const queryText = "SELECT id, name, role FROM users WHERE role!='admin'";
  const { rows } = await pool.query(queryText);
  return rows;
};

export const getsAllAdmins = async (): Promise<
  { name: string; role: string }[]
> => {
  const queryText = "SELECT id, name, role FROM users WHERE role='admin'";
  const { rows } = await pool.query(queryText);
  return rows;
};

export const getsAllManagers = async (): Promise<
  { name: string; role: string }[]
> => {
  const queryText = "SELECT id, name, role FROM users WHERE role='manager'";
  const { rows } = await pool.query(queryText);
  return rows;
};

export const getsAllStockers = async (): Promise<
  { name: string; role: string }[]
> => {
  const queryText = "SELECT id, name, role FROM users WHERE role='stocker'";
  const { rows } = await pool.query(queryText);
  return rows;
};

export const getsAllCashiers = async (): Promise<
  { name: string; role: string }[]
> => {
  const queryText = "SELECT id, name, role FROM users WHERE role='cashier'";
  const { rows } = await pool.query(queryText);
  return rows;
};

//get by id:

export const getsWorkerById = async (
  id: number
): Promise<{
  id: number;
  name: string;
  role: string;
}> => {
  const queryText = "SELECT id, name, role FROM users WHERE id=$1";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export const getsAdminById = async (
  id: number
): Promise<{ name: string; email: string; role: string }> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE id=$1 AND role='admin'";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export const getsManagerById = async (
  id: number
): Promise<{ name: string; email: string; role: string }> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE id=$1 AND role='manager'";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export const getsStockerById = async (
  id: number
): Promise<{ name: string; email: string; role: string }> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE id=$1 AND role='stocker'";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export const getsCashierById = async (
  id: number
): Promise<{ name: string; email: string; role: string }> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE id=$1 AND role='cashier'";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

//get by name:

export const getsWorkerByName = async (
  name: string
): Promise<{ name: string; email: string; role: string }[]> => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid input. 'name' must be a non-empty string.");
  }

  const queryText = "SELECT id, name, email, role FROM users WHERE name=$1";
  const { rows } = await pool.query(queryText, [name]);
  return rows;
};

export const getsManagerByName = async (
  name: string
): Promise<{ name: string; email: string; role: string }[]> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE name=$1 AND role='manager'";
  const { rows } = await pool.query(queryText, [name]);
  return rows;
};

export const getsStockerByName = async (
  name: string
): Promise<{ name: string; email: string; role: string }[]> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE name=$1 AND role='stocker'";
  const { rows } = await pool.query(queryText, [name]);
  return rows;
};

export const getsCashierByName = async (
  name: string
): Promise<{ name: string; email: string; role: string }[]> => {
  const queryText =
    "SELECT name, email, role FROM users WHERE name=$1 AND role='cashier'";
  const { rows } = await pool.query(queryText, [name]);
  return rows;
};

export const getsAdminByName = async (
  name: string
): Promise<{ name: string; email: string; role: string }[]> => {
  const queryText =
    "SELECT id, name, email, role FROM users WHERE name=$1 AND role='admin'";
  const { rows } = await pool.query(queryText, [name]);
  return rows;
};
