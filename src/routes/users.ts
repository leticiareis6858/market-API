import express from "express";
import {
  createUser,
  userLogin,
  createAdmin,
  createManager,
  createStocker,
  createCashier,
} from "../controller/users";

const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", userLogin);

router.post("/user/register/admin", createAdmin);
router.post("/user/register/manager", createManager);
router.post("/user/register/stocker", createStocker);
router.post("/user/register/cashier", createCashier);

export { router as userRoutes };
