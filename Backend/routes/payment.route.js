import express from "express";
import {orderCreate} from "../controllers/payment.controller.js";
const router = express.Router();


router.post('/order',orderCreate)

export default router;