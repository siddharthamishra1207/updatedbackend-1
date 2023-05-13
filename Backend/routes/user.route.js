import express from "express";
import { fetchGigs } from "../controllers/gig.controller.js";
import { deleteUser, getUser, userDetails } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/info",userDetails)
router.get('/latest/5',fetchGigs)
export default router;
