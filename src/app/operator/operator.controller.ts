import { AppError } from "../../middleware/error-handler";
import { ResponseHandler } from "../../utils/response-handler";
import * as operatorService from "../operator/operator.service";

import { NextFunction, Request, Response } from "express";

export const getAllOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const data = await operatorService.getAllOperator({
    query,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  ResponseHandler.ok(res, data, `Data berhasil di ambil`);
};

export const loginOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const data = await operatorService.loginOperator({
    body,
  });

  if (data instanceof AppError) {
    next(data);
    return;
  }

  return res
    .status(200)
    .cookie("token", data.token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
      path: "/",
      secure: true,
      sameSite: "none",
    })
    .json({ status: "success", message: "Anda berhasil login", data });
};

export const logoutOperator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Hapus cookie token dengan menyetel ulang nilainya dan waktu kadaluarsa
    res.clearCookie("token", {
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Anda berhasil logout",
    });
  } catch (error) {
    next(error);
  }
};
