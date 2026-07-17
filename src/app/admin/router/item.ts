import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemSchema } from "../../item/item.request";
import { createItem, getAllItem, getDownloadListItem, updateIsActiveItem, updateItem } from "../admin.controller";
import { updateIsActiveUserSchema } from "../../users/users.request";

const router = Router();

router.get('/', getAllItem);
router.post('/', validateRequest(createItemSchema), createItem);
router.put('/:itemId', validateRequest(createItemSchema), updateItem);
router.patch('/:itemId/status', validateRequest(updateIsActiveUserSchema), updateIsActiveItem);

export default router

