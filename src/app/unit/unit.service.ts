import * as unitRepository from "./unit.repository";

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { AppError } from "../../middleware/error-handler";
import { IBodyCreateUnitModel } from "./unit.model";

export const updateUnit = async ({
    body,
    params: { unitId }
}: {
    body: IBodyCreateUnitModel,
    params: { unitId?: string }

}) => {

    const cekDivision = await unitRepository.getUnitById({
        unitId: Number(unitId)
    })

    if (!cekDivision) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
    }

    return await unitRepository.updateUnitById({
        unitId: Number(unitId),
        data: body,
    })
}

export const createUnit = async ({
    body,
}: {
    body: IBodyCreateUnitModel,
}) => {
    return await unitRepository.createUnit({
        data: body,
    })
}

export const getAllUnit = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await unitRepository.getAllUnit({
        query
    })

    const count = await unitRepository.getCountAllUnit({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data, meta }
}
