import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createUnitSchema } from "../../unit/unit.request";
import { createUnit, getAllUnit, updateUnit } from "../admin.controller";

const adminUnitRouter = Router();

adminUnitRouter.get('/', getAllUnit);
adminUnitRouter.post('/', validateRequest(createUnitSchema), createUnit);
adminUnitRouter.patch('/:unitId', validateRequest(createUnitSchema), updateUnit);

export default adminUnitRouter

