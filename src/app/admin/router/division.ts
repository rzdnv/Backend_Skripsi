import { Router } from "express";
import { validateRequest } from "../../../middleware/validate-request";
import { createDivision, getAllDivision, updateDivision } from "../admin.controller";
import { createDivisionSchema } from "../../division/division.request";

const adminDivisionRouter = Router();

adminDivisionRouter.get('/', getAllDivision);
adminDivisionRouter.post('/', validateRequest(createDivisionSchema), createDivision);
adminDivisionRouter.patch('/:divisionId', validateRequest(createDivisionSchema), updateDivision);

export default adminDivisionRouter

