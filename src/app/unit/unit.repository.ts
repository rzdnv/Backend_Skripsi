import { IQueryParams } from "../../interface"
import { prisma } from "../../setup/prisma"
import { IBodyCreateUnitModel } from "./unit.model"

export const getUnitById = async ({
    unitId
}: {
    unitId?: number
}) => {
    return await prisma.unit.findFirst({
        where: {
            id: unitId
        }
    })
}

export const updateUnitById = async ({
    unitId,
    data
}: {
    unitId?: number,
    data: IBodyCreateUnitModel
}) => {
    return await prisma.unit.update({
        where: {
            id: unitId
        },
        data
    })
}

export const getAllUnit = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        page = 1,
        perPage = 99,
        search
    } = query

    return await prisma.unit.findMany({
        where: {
            title: {
                contains: search
            }
        },
        include: {
            _count: true
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
    })
}

export const getCountAllUnit = async ({
    query
}: {
    query: IQueryParams
}) => {
    const {
        search
    } = query

    return await prisma.unit.count({
        where: {
            title: {
                contains: search
            }
        },
    })
}

export const createUnit = async ({
    data,
}: {
    data: IBodyCreateUnitModel,
}) => {
    return await prisma.unit.create({
        data
    })
}
