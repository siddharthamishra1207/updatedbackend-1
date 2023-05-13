import express from "express";
const router = express.Router();
import {create, fetch} from "../controllers/proposal.controller.js"

router.post('/:username',create)
router.get('/',fetch)

export default router;