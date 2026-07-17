import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemOutSchema } from "../../item-out/item-out.request";
import { createItemOut, getAllItemOut, softDeletedItemOut } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItemOut);
adminItemRouter.post('/', validateRequest(createItemOutSchema), createItemOut);
adminItemRouter.delete('/:itemOutId', softDeletedItemOut);

// adminItemRouter.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminItemRouter

