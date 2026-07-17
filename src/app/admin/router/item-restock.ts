import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemRestockSchema } from "../../item-restock/item-restock.request";
import { createItemRestock, getAllItemRestock, softDeletedItemOut } from "../admin.controller";

const adminItemRestock = Router();

adminItemRestock.get('/', getAllItemRestock);
adminItemRestock.post('/', validateRequest(createItemRestockSchema), createItemRestock);
// adminItemRestock.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminItemRestock

