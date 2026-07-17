import { NEWS } from "@prisma/client"
import { prisma } from "../../setup/prisma"
import { IBodyCreateItemOutModel } from "./item-out.model"
import { IQueryParams } from "../../interface";

export const createItemOut = async ({
    data,
    code,
    adminId
}: {
    data: IBodyCreateItemOutModel
    adminId: number
    code: string
}) => {
    return await prisma.itemOut.create({
        data: { ...data, adminId, code }
    });
};

export const getAllItemOut = async ({
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

    return await prisma.itemOut.findMany({
        where: {
            OR: [
                { user: { name: { contains: search } } },
                { user: { telephone: { contains: search } } },
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
            user: {
                select: {
                    division: {
                        select: {
                            title: true
                        }
                    },
                    name: true,
                    telephone: true,

                },

            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const softDeletedItemOut = async ({
    itemOutId: id
}: {
    itemOutId: number
}) => {
    return await prisma.itemOut.update({
        where: {
            id
        },
        data: {
            deletedAt: new Date()
        }
    })
}

export const getLastDataItemOut = async () => {
    return await prisma.itemOut.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    })
}
export const getCountAllItemOut = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.itemOut.count({
        where: {
            OR: [
                { user: { name: { contains: search } } },
                { user: { telephone: { contains: search } } }
            ]
        },
    })
}
export const getCountAllItemOutInMount = async () => {
    return await prisma.itemOut.count({
        where: {
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        }
    })
}

export const getItemOutById = async ({
    itemOutId: id
}: {
    itemOutId: number
}) => {
    return await prisma.itemOut.findFirst({
        where: {
            id
        }
    })
}