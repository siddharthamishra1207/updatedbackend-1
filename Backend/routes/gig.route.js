 import express from "express";
import {
  createGig,
  deleteGig,
  fetchGigs,
  getGig,
  getGigs,
  mygigs,
  updateGig
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

 const router = express.Router();

router.post("/", createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single", getGig);
router.get("/", getGigs);
router.get("/",fetchGigs);
router.post("/update",updateGig)
router.get('/mygigs',mygigs)

 export default router;
