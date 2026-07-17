import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateItemRestockModel } from "./item-restock.model";

export const createItemRestock = async ({
    data,
    adminId,
    code
}: {
    data: IBodyCreateItemRestockModel
    adminId: number
    code: string
}) => {
    return await prisma.itemRestock.create({
        data: { ...data, adminId, code }
    });
};

export const getLastDataItemRestock = async () => {
    return await prisma.itemRestock.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 99,
        search = '',
        code = ''
    } = query
    return await prisma.itemRestock.findMany({
        where: {
            OR: [
                { item: { title: { contains: search } } },
                { code: { startsWith: code } }
            ]
        },
        select: {
            admin: {
                select: {
                    name: true
                },
            },
            amount: true,
            createdAt: true,
            description: true,
            news: true,
            code: true,
            item: {
                select: {
                    brand: true,
                    category: {
                        select: {
                            title: true
                        },
                    },
                    unit: {
                        select: {
                            title: true
                        },
                    },
                    title: true,
                    code: true,
                    supplier: true,
                    location: true,
                },
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    });
};

export const getCountAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 99,
        search = ''
    } = query

    return await prisma.itemRestock.count({
        where: {
            OR: [
                { item: { title: { contains: search } } },
            ]
        },
    });
};

export const getCountAllItemRestockInMount = async () => {
    return await prisma.itemRestock.count({
        where: {
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        }
    })
}