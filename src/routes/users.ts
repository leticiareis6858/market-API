import express from "express";
import {
  createUser,
  userLogin,
  createAdmin,
  createManager,
  createStocker,
  createCashier,
  updateUser,
  updateManager,
  updateStocker,
  updateCashier,
  deleteUser,
  deleteManager,
  deleteStocker,
  deleteCashier,
  updatePassword,
  updateRole,
  updateEmail,
  getAllWorkers,
  getAllAdmins,
  getAllManagers,
  getAllStockers,
  getAllCashiers,
  getWorkerById,
  getAdminById,
  getManagerById,
  getStockerById,
  getCashierById,
  getWorkerByName,
  getManagerByName,
  getStockerByName,
  getCashierByName,
  getAdminByName,
} from "../controller/users";
import { authMiddleware, verifyRoles } from "../middleware/authentication";

const router = express.Router();

router.post("/user/register", authMiddleware, verifyRoles("admin"), createUser);

router.post("/user/login", userLogin);

//register:

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

router.patch(
  "/user/update/:id",
  authMiddleware,
  verifyRoles("admin"),
  updateUser
);

router.patch(
  "/user/update/manager/:id",
  authMiddleware,
  verifyRoles("admin"),
  updateManager
);

router.patch(
  "/user/update/stocker/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateStocker
);

router.patch(
  "/user/update/cashier/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateCashier
);

router.patch("/user/update/password/:id", authMiddleware, updatePassword);

router.patch(
  "/user/update/role/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateRole
);

router.patch("/user/update/email/:id", authMiddleware, updateEmail);

//delete:

router.delete(
  "/user/delete/:id",
  authMiddleware,
  verifyRoles("admin"),
  deleteUser
);

router.delete(
  "/user/delete/manager/:id",
  authMiddleware,
  verifyRoles("admin"),
  deleteManager
);

router.delete(
  "/user/delete/stocker/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  deleteStocker
);

router.delete(
  "/user/delete/cashier/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  deleteCashier
);

export { router as userRoutes };
