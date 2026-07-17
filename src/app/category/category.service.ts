import * as categoryRepository from "./category.repository";

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { IBodyCreateCategoryModel } from "./category.model";
import { AppError } from "../../middleware/error-handler";

export const updateCategory = async ({
    body,
    params: { categoryId }
}: {
    body: IBodyCreateCategoryModel,
    params: { categoryId?: string }

}) => {

    const cekCategory = await categoryRepository.getCategoryById({
        categoryId: Number(categoryId)
    })

    if (!cekCategory) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Category tidak ditemukan')
    }

    return await categoryRepository.updateCategoryById({
        categoryId: Number(categoryId),
        data: body,
    })
}

export const createCategory = async ({
    body,
}: {
    body: IBodyCreateCategoryModel,
}) => {
    return await categoryRepository.createCategory({
        data: body,
    })
}

export const getAllCategory = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await categoryRepository.getAllCategory({
        query
    })

    const count = await categoryRepository.getCountAllCategory({
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
