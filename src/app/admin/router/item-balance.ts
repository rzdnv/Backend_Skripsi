import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createItemBalanceSchema } from "../../item-balance/item-balance.request";
import { createItemBalance, getAllItemBalance, softDeletedItemBalance } from "../admin.controller";

const adminItemRouter = Router();

adminItemRouter.get('/', getAllItemBalance);
adminItemRouter.post('/', validateRequest(createItemBalanceSchema), createItemBalance);
adminItemRouter.delete('/:itemBalanceId', softDeletedItemBalance);

export default adminItemRouter

