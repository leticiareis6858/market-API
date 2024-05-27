import { Request, Response } from "express";
import {
  createsUser,
  authenticatesUser,
  createsAdmin,
  createsManager,
  createsStocker,
  createsCashier,
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
