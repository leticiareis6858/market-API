import express from "express";
import {
  createUser,
  userLogin,
  createAdmin,
  createManager,
  createStocker,
  createCashier,
} from "../controller/users";
import { authMiddleware, verifyRoles } from "../middleware/authentication";

const router = express.Router();

router.post("/user/register", authMiddleware, verifyRoles("admin"), createUser);

router.post("/user/login", userLogin);

router.post("/user/register/admin", createAdmin);

router.post(
  "/user/register/manager",
  authMiddleware,
  verifyRoles("admin"),
  createManager
);

router.post(
  "/user/register/stocker",
  authMiddleware,
  verifyRoles("admin", "manager"),
  createStocker
);

router.post(
  "/user/register/cashier",
  authMiddleware,
  verifyRoles("admin", "manager"),
  createCashier
);

export { router as userRoutes };
