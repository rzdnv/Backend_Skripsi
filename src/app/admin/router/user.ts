import { Router } from "express";
import { createUser, getAllUser, getTopUser, updateIsActiveUser, updateUser } from "../admin.controller";
import { validateRequest } from "../../../middleware/validate-request";
import { createUserSchema, updateIsActiveUserSchema } from "../../users/users.request";

const adminUnitRouter = Router();

adminUnitRouter.get('/', getAllUser);
adminUnitRouter.get('/top', getTopUser);
adminUnitRouter.post('/', validateRequest(createUserSchema), createUser);
adminUnitRouter.put('/:userId', validateRequest(createUserSchema), updateUser);
adminUnitRouter.patch('/:userId/status', validateRequest(updateIsActiveUserSchema), updateIsActiveUser);

export default adminUnitRouter

