import express from "express";
import adminRoute from "../app/admin/admin.route";
import userRoute from "../app/users/users.routes";
import operatorRoute from "../app/operator/operator.route";
import { verifyToken } from "../middleware/verify-token";
import { Router } from "express";
import {
  getDownloadListItem,
  getDownloadListItemBalance,
  getDownloadListItemOut,
  getDownloadListItemRestock,
} from "../app/admin/admin.controller";

export const publicRouter = Router();

publicRouter.get("/", (req, res) => {
  res.json("Hello World Nalendro!");
});
publicRouter.get("/users", (req, res) => {
  res.json("Hello users!");
});
publicRouter.use("/admin", verifyToken, adminRoute);
publicRouter.use("/operator", operatorRoute);
publicRouter.use("/user", userRoute);
publicRouter.get("/download-excel/item", getDownloadListItem);
publicRouter.get("/download-excel/item-balance", getDownloadListItemBalance);
publicRouter.get("/download-excel/item-out", getDownloadListItemOut);
publicRouter.get("/download-excel/item-restock", getDownloadListItemRestock);
