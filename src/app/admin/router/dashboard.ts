import { Router } from "express";
import { getCart, getDashboard } from "../admin.controller";

const router = Router();

router.get('/', getDashboard);
router.get('/cart', getCart);

export default router

