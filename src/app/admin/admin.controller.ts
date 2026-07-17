import { NextFunction, Request, Response } from "express";
import * as categoryService from "../category/category.service";
import * as divisionService from "../division/division.service";
import * as unitService from "../unit/unit.service";
import * as itemService from "../item/item.service";
import * as itemOutService from "../item-out/item-out.service";
import * as itemBalanceService from "../item-balance/item-balance.service";
import * as itemRestockService from "../item-restock/item-restock.service";
import * as userService from "../users/users.service";
import * as operatorService from "../operator/operator.service";
import { AppError } from "../../middleware/error-handler";
import { ResponseHandler } from "../../utils/response-handler";
import * as adminService from "./admin.service";

//CATEGORY
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await categoryService.createCategory({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil dibuat`);
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body, params } = req;

  const data = await categoryService.updateCategory({
    body,
    params,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await categoryService.getAllCategory({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//DIVISION
export const createDivision = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await divisionService.createDivision({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil dibuat`);
};

export const updateDivision = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body, params } = req;

  const data = await divisionService.updateDivision({
    body,
    params,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

export const getAllDivision = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await divisionService.getAllDivision({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//UNIT
export const createUnit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await unitService.createUnit({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil dibuat`);
};

export const updateUnit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body, params } = req;

  const data = await unitService.updateUnit({
    body,
    params,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

export const getAllUnit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await unitService.getAllUnit({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//ITEM

export const updateIsActiveItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { itemId },
  } = req;
  const data = await itemService.updateIsActive({
    body,
    itemId: Number(itemId),
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di update`);
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await itemService.createItem({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil dibuat`);
};
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { itemId },
  } = req;

  const data = await itemService.updateItem({
    itemId: Number(itemId),
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

export const getAllItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await itemService.getAllItem({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//USER
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await userService.getAllUser({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

export const updateIsActiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { userId },
  } = req;
  const data = await userService.updateIsActive({
    body,
    userId: Number(userId),
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di update`);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const data = await userService.createUser({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di buat`);
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { userId },
  } = req;
  const data = await userService.updateUser({
    userId: Number(userId),
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

export const getTopUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await userService.getTopUser();

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//OPERATOR
export const createOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await operatorService.createOperator({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil dibuat`);
};

export const updateIsActiveOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { operatorId },
  } = req;
  const data = await operatorService.updateIsActive({
    body,
    operatorId: Number(operatorId),
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di update`);
};

export const updateOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    body,
    params: { operatorId },
  } = req;

  const data = await operatorService.updateOperator({
    operatorId: Number(operatorId),
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil diupdate`);
};

//ITEM_OUT
export const createItemOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const { body, token } = req ;
  const { body, token } = req as any;
  const data = await itemOutService.createItemOut({
    body,
    token,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di buat`);
};

export const softDeletedItemOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    params: { itemOutId },
  } = req;
  const data = await itemOutService.softDeletedItemOut({
    itemOutId: Number(itemOutId),
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di buat`);
};

export const getAllItemOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await itemOutService.getAllItemOut({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//ITEM_RESTOCK
export const createItemRestock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const { body, token } = req;
  const { body, token } = req as any;
  const data = await itemRestockService.createItemRestock({
    body,
    token,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di buat`);
};

export const getAllItemRestock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await itemRestockService.getAllItemRestock({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

//ITEM_BALANCE
export const createItemBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const { body, token } = req;
  const { body, token } = req as any;
  const data = await itemBalanceService.createItemBalance({
    body,
    token,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di buat`);
};

export const getAllItemBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await itemBalanceService.getAllItemBalance({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

export const softDeletedItemBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    params: { itemBalanceId },
  } = req;
  const data = await itemBalanceService.softDeletedItemBalance({
    itemBalanceId: Number(itemBalanceId),
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.created(res, data, `Data berhasil di dihapus`);
};

export const getDownloadListItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  await itemService.getDownloadListItem({ res, query });
};
export const getDownloadListItemBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  await itemBalanceService.getDownloadListItemBalance({ res, query });
};
export const getDownloadListItemOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  await itemOutService.getDownloadListItemOut({ res, query });
};
export const getDownloadListItemRestock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  await itemRestockService.getDownloadListItemRestock({ res, query });
};

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await adminService.getDashboard({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await adminService.getCart();

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};
