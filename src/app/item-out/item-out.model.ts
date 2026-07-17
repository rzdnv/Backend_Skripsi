import { NEWS } from "@prisma/client"

export interface IBodyCreateItemOutModel {
  amount: number
  userId: number
  news: NEWS
  itemId: number
}