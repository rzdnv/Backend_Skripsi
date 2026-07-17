import { DTOItemPrisma } from "./item.dto";

export const mapperItem = (data: DTOItemPrisma[]) => {
    return data.map(({ unit, category, ...rest }) => ({
        ...rest,
        unit: unit?.title ?? null,
        category: category?.title ?? null
    }));
}