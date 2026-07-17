import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createAdminSchema, updateAdminSchema } from "../../operator/operator.request";
import { createOperator, updateIsActiveOperator, updateOperator } from "../admin.controller";
import { getAllOperator } from "../../operator/operator.controller";
import { updateIsActiveUserSchema } from "../../users/users.request";

const router = Router();

router.get('/', getAllOperator);
router.post('/', validateRequest(createAdminSchema), createOperator);
router.put('/:operatorId', validateRequest(updateAdminSchema), updateOperator);
router.patch('/:operatorId/status', validateRequest(updateIsActiveUserSchema), updateIsActiveOperator);

export default router

