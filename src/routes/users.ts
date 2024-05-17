import express from "express";
import { createUser, userLogin } from "../controller/users";

const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", userLogin);

export { router as userRoutes };
