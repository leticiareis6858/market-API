import { Request, Response } from "express";
import {
  createsUser,
  authenticatesUser,
  createsAdmin,
  createsManager,
  createsStocker,
  createsCashier,
  updatesUser,
  updatesManager,
  updatesStocker,
  updatesCashier,
  deletesUser,
  deletesManager,
  deletesStocker,
  deletesCashier,
  updatesPassword,
  updatesRole,
  updatesEmail,
  getsAllWorkers,
  getsAllAdmins,
  getsAllManagers,
  getsAllStockers,
  getsAllCashiers,
  getsWorkerById,
  getsAdminById,
  getsManagerById,
  getsStockerById,
  getsCashierById,
  getsWorkerByName,
  getsManagerByName,
  getsStockerByName,
  getsCashierByName,
  getsAdminByName,
} from "../model/users";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (
      role != "admin" &&
      role != "cashier" &&
      role != "stocker" &&
      role != "manager"
    ) {
      return res.status(400).json({
        message:
          "Please provide a valid role. Acepted roles: admin, cashier, stocker, manager.",
      });
    }
    const newUser = await createsUser(name, email, password, role);
    res.status(201).json({ msg: "User created!", user: newUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authenticatesUser(email, password);

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials. Please, try again." });
    }
    res
      .status(200)
      .json({ msg: "User authenticated! Here is your token: ", token });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while authenticating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createsAdmin(name, email, password);
    res.status(201).json({ msg: "Admin user created!", user: newUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const createManager = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createsManager(name, email, password);
    res.status(201).json({ msg: "Manager user created!", user: newUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const createStocker = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createsStocker(name, email, password);
    res.status(201).json({ msg: "Stocker user created!", user: newUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const createCashier = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createsCashier(name, email, password);
    res.status(201).json({ msg: "Cashier user created!", user: newUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

//update:

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;
    const updatedRole = await updatesRole(id, role);
    res.status(200).json({ msg: "Role updated!", user: updatedRole });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating role. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    if ((req as any).user.id !== id && (req as any).user.role != "admin") {
      return res
        .status(401)
        .json({ msg: "You can't update other user's password" });
    }

    await updatesPassword(id, password);
    res.status(200).json({ msg: "Password updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating password. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateEmail = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.body;

    if ((req as any).user.id !== id && (req as any).user.role != "admin") {
      return res
        .status(401)
        .json({ msg: "You can't update other user's email" });
    }

    await updatesEmail(id, email);
    res.status(200).json({ msg: "Email updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating email. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    const updatedUser = await updatesUser(id, name, email);
    res.status(200).json({ msg: "User updated!", user: updatedUser });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateManager = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    const updatedManager = await updatesManager(id, name, email);
    res.status(200).json({ msg: "Manager updated!", manager: updatedManager });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating manager. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateStocker = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    const updatedStocker = await updatesStocker(id, name, email);
    res.status(200).json({ msg: "Stocker updated!", stocker: updatedStocker });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating stocker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateCashier = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    const updatedCashier = await updatesCashier(id, name, email);
    res.status(200).json({ msg: "Cashier updated!", cashier: updatedCashier });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating cashier. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

//delete:

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deletesUser(id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deletesManager(id);
    res.status(200).json({ msg: "Manager deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting manager. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteStocker = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deletesStocker(id);
    res.status(200).json({ msg: "Stocker deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting stocker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteCashier = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deletesCashier(id);
    res.status(200).json({ msg: "Cashier deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting cashier. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

//get all:

export const getAllWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await getsAllWorkers();
    res.status(200).json({ workers });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting workers. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await getsAllAdmins();
    res.status(200).json({ admins });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting admins. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllManagers = async (req: Request, res: Response) => {
  try {
    const managers = await getsAllManagers();
    res.status(200).json({ managers });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting managers. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllStockers = async (req: Request, res: Response) => {
  try {
    const stockers = await getsAllStockers();
    res.status(200).json({ stockers });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting stockers. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllCashiers = async (req: Request, res: Response) => {
  try {
    const cashiers = await getsAllCashiers();
    res.status(200).json({ cashiers });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting cashiers. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

//get by id:

export const getWorkerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const worker = await getsWorkerById(Number(id));
    res.status(200).json(worker);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting worker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await getsAdminById(Number(id));
    res.status(200).json(admin);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting admin. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getManagerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manager = await getsManagerById(Number(id));
    res.status(200).json(manager);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting manager. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getStockerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stocker = await getsStockerById(Number(id));
    res.status(200).json(stocker);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting stocker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getCashierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cashier = await getsCashierById(Number(id));
    res.status(200).json(cashier);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting cashier. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

//get by id:

export const getWorkerByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const worker = await getsWorkerByName(name);
    res.status(200).json(worker);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting worker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getManagerByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const manager = await getsManagerByName(name);
    res.status(200).json(manager);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting manager. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getStockerByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const stocker = await getsStockerByName(name);
    res.status(200).json(stocker);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting stocker. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getCashierByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const cashier = await getsCashierByName(name);
    res.status(200).json(cashier);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting cashier. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAdminByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const admin = await getsAdminByName(name);
    res.status(200).json(admin);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting admin. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};
