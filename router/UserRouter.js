import express from "express";
import { forgotPassword, getUser, getUserForPortfolio, login, logout, register,
updatePassword, updateProfile,resetPassword} from "../Controller/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);
router.get("/me", isAuthenticated,getUser);
router.put("/me/profile/Update", isAuthenticated,updateProfile);
router.put("/update/password", isAuthenticated,updatePassword);
router.get("/portfolio/me",  getUserForPortfolio);
router.post("/Password/forgot", forgotPassword);
router.put("/Password/reset/:token",resetPassword);

export default router;