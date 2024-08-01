import express from "express";
import {
  createUser,
  userLogin,
  createAdmin,
  updateUser,
  deleteUser,
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
} from "../controller/users";
import { authMiddleware, verifyRoles } from "../middleware/authentication";

const router = express.Router();

//login:

router.post("/user/login", userLogin);

//register:

router.post("/user/register/admin", createAdmin);

router.post(
  "/user/register/worker",
  authMiddleware,
  verifyRoles("admin"),
  createUser
);

//update:

router.patch(
  "/user/update/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateUser
);

//update password, role, email:

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
  verifyRoles("admin", "manager"),
  deleteUser
);

//get all:

router.get("/user/all", authMiddleware, verifyRoles("admin"), getAllWorkers);

router.get(
  "/user/all/admin",
  authMiddleware,
  verifyRoles("admin"),
  getAllAdmins
);

router.get(
  "/user/all/manager",
  authMiddleware,
  verifyRoles("admin"),
  getAllManagers
);

router.get(
  "/user/all/stocker",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getAllStockers
);

router.get(
  "/user/all/cashier",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getAllCashiers
);

//get by id:

router.get("/user/:id", authMiddleware, verifyRoles("admin"), getWorkerById);

router.get(
  "/user/admin/:id",
  authMiddleware,
  verifyRoles("admin"),
  getAdminById
);

router.get(
  "/user/manager/:id",
  authMiddleware,
  verifyRoles("admin"),
  getManagerById
);

router.get(
  "/user/stocker/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getStockerById
);

router.get(
  "/user/cashier/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getCashierById
);

//get by name:

router.get(
  "/user/:name",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getWorkerByName
);

export { router as userRoutes };
