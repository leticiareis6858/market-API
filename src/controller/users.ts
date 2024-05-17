import { Request, Response } from "express";
import { createsUser, authenticatesUser } from "../model/users";

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
    const user = await authenticatesUser(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials. Please, try again." });
    }
    res.status(200).json({ msg: "User authenticated!", user });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while authenticating user. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};
