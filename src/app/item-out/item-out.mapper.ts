import { DTOItemOut } from "./item-out.dto";

export const mapperItemOut = (data: DTOItemOut[]) => {
    return data.map((items) => ({
        id: items.id,
        operator: items.admin.name,
        amount: items.amount,
        code: items.code,
        createdAt: items.createdAt,
        item: {
            brand: items.item.brand,
            category: items.item.category.title,
            unit: items.item.unit.title,
            title: items.item.title,
            code: items.item.code,
            supplier: items.item.supplier,
            location: items.item.location,
        },
        news: items.news === "TRUE" ? true : false,
        user: {
            division: items.user.division.title,
            name: items.user.name,
            telephone: items.user.telephone,
        },
    }));
}
