import { NEWS } from "@prisma/client";

export interface IBodyCreateItemRestockModel {
    itemId: number;
    amount: number;
    description?: string | null;
    news: NEWS;
}