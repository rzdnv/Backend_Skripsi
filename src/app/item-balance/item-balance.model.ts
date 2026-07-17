import { NEWS } from "@prisma/client"

export interface IBodyCreateItemBalanceModel {
  itemId: number
  amount: number
  news: NEWS
  description?: string
}