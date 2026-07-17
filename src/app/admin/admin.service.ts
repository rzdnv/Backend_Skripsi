import * as itemRepository from "../item/item.repository";
import * as itemOutRepository from "../item-out/item-out.repository";
// import * as itemBalanceRepository from '../item-balance/item-balance.repository'
import * as RestockRepository from "../item-restock/item-restock.repository";
import * as userRepository from "../users/users.repository";
import { IQueryParams } from "../../interface";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { prisma } from "../../setup/prisma";

export const getDashboard = async ({ query }: { query: IQueryParams }) => {
  const item = await itemRepository.getCountAllItem({ query });
  const itemOut = await itemOutRepository.getCountAllItemOut({ query });
  const itemRestock = await RestockRepository.getCountAllItemRestock({ query });
  const user = await userRepository.getCountAllUser({ query });

  return { item, itemOut, itemRestock, user };
};

export async function getCart() {
  const now = new Date();

  const results: { name: string; itemIn: number; itemOut: number }[] = [];

  // Loop 12 bulan ke belakang, dari saat ini
  for (let i = 11; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));
    const label = monthStart.toLocaleString("default", { month: "short" });

    // Ambil jumlah ItemRestock (barang masuk)
    const itemIn = await prisma.itemRestock.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        deletedAt: null,
      },
    });

    // Ambil jumlah ItemOut (barang keluar)
    const itemOut = await prisma.itemOut.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        deletedAt: null,
      },
    });

    results.push({
      name: label,
      itemIn,
      itemOut,
    });
  }

  return results;
}
