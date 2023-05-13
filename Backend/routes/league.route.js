import express from "express";
const router = express.Router();
import { getCreator } from "../controllers/creator.controller.js";
import { createLeague, getLeague } from "../controllers/league.controller.js";

router.get('/',getCreator);
router.post('/create',createLeague)
router.get('/leagues',getLeague)
export default router;