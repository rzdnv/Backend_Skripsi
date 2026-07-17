import * as divisionRepository from "./division.repository";

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { AppError } from "../../middleware/error-handler";
import { IBodyCreateDivisionModel } from "./division.model";

export const updateDivision = async ({
    body,
    params: { divisionId }
}: {
    body: IBodyCreateDivisionModel,
    params: { divisionId?: string }

}) => {

    const cekDivision = await divisionRepository.getDivisionById({
        divisionId: Number(divisionId)
    })

    if (!cekDivision) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
    }

    return await divisionRepository.updateDivisionById({
        divisionId: Number(divisionId),
        data: body,
    })
}

export const createDivision = async ({
    body,
}: {
    body: IBodyCreateDivisionModel,
}) => {
    return await divisionRepository.createDivision({
        data: body,
    })
}

export const getAllDivision = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await divisionRepository.getAllDivision({
        query
    })

    const count = await divisionRepository.getCountAllDivision({
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
