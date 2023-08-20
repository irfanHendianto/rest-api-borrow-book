import express from "express";
import { login, register } from "@/modules/auth/handler";
import {validateRegisterUser} from "@/schema/schema-validation";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/register", validateRegisterUser ,register);

export default router;
