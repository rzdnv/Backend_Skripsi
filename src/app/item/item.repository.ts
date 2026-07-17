import { IQueryParams } from "../../interface"
import { prisma } from "../../setup/prisma"
import { IBodyCreateItemModel } from "./item.model"

export const getItemById = async ({
    itemId
}: {
    itemId?: number
}) => {
    return await prisma.item.findFirst({
        where: {
            id: itemId
        }
    })
}

// export const updateUnitById = async ({
//     unitId,
//     data
// }: {
//     unitId?: number,
//     data: IBodyCreateUnitModel
// }) => {
//     return await prisma.unit.update({
//         where: {
//             id: unitId
//         },
//         data
//     })
// }

export const getAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 99,
        search,
        active
    } = query

    return await prisma.item.findMany({
        where: {
            title: {
                contains: search
            },
            ...(typeof active !== 'undefined' && active !== ''
                ? { isActive: active === 'true' }
                : {}), // hanya tambahkan filter isActive jika active ada
        },
        include: {
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
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const getCountAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.item.count({
        where: {
            title: {
                contains: search
            }
        },
    })
}

export const updateIsActive = async ({
    isActive,
    itemId: id
}: {
    isActive: boolean
    itemId: number
}) => await prisma.item.update({
    where: {
        id
    },
    data: {
        isActive
    }
})

export const createItem = async ({
    data,
}: {
    data: IBodyCreateItemModel,
}) => {
    return await prisma.item.create({
        data: {
            ...data, stock: 0
        }
    })
}
export const updateItem = async ({
    data,
    itemId: id
}: {
    data: IBodyCreateItemModel,
    itemId: number
}) => {
    return await prisma.item.update({
        where: {
            id
        },
        data: {
            ...data,
            updatedAt: new Date()
        }
    })
}

export const stockItemReduction = async ({
    itemId,
    stock
}: {
    itemId: number,
    stock: number
}) => {
    return await prisma.item.update({
        where: {
            id: itemId
        },
        data: {
            stock: {
                decrement: stock
            }
        }
    })
}

export const stockItemRestock = async ({
    itemId,
    stock,
}: {
    itemId: number;
    stock: number;
}) => {
    return await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            stock: {
                increment: stock,
            },
        },
    });
};
