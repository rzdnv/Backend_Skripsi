import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateItemBalanceModel } from "./item-balance.model";

export const createItemBalance = async ({
    data,
    adminId,
    initialStock,
    finalStock,
    code
}: {
    data: IBodyCreateItemBalanceModel,
    finalStock: number
    initialStock: number
    adminId: number
    code: string
}) => {
    return await prisma.itemBalance.create({
        data: {
            ...data,
            finalStock,
            initialStock,
            adminId,
            code
        }
    });
};

export const getAllItemBalance = async ({
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

    return await prisma.itemBalance.findMany({
        where: {
            OR: [
                { item: { title: { contains: search } } },
                { code: { startsWith: code } }
            ],
            deletedAt: null
        },
        select: {
            id: true,
            admin: {
                select: {
                    name: true
                }
            },
            description: true,
            finalStock: true,
            initialStock: true,
            amount: true,
            createdAt: true,
            code: true,
            item: {
                select: {
                    brand: true,
                    category: {
                        select: {
                            title: true
                        }
                    },
                    unit: {
                        select: {
                            title: true
                        }
                    },
                    title: true,
                    code: true,
                    supplier: true,
                    location: true,

                }
            },
            news: true,

        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const getLastDataItemBalance = async () => {
    return await prisma.itemBalance.findFirst({
        orderBy: {
            createdAt: 'desc'
        },
    })
}
export const getCountAllItemBalance = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.itemBalance.count()
}

export const getItemBalanceById = async ({
    itemBalanceId: id
}: {
    itemBalanceId: number
}) => {
    return await prisma.itemBalance.findFirst({
        where: {
            id
        }
    })
}

export const softDeletedItemBalance = async ({
    itemBalanceId: id
}: {
    itemBalanceId: number
}) => {
    return await prisma.itemBalance.update({
        where: {
            id
        },
        data: {
            deletedAt: new Date()
        }
    })
}