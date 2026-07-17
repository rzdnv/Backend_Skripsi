import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createCategory, getAllCategory, updateCategory } from "../admin.controller";
import { createCategorySchema } from "../../category/category.request";

const router = Router();

router.get('/', getAllCategory);
router.post('/', validateRequest(createCategorySchema), createCategory);
router.patch('/:categoryId', validateRequest(createCategorySchema), updateCategory);

export default router

