import { DTOItemOut } from "./item-balance.dto";

export const mapperItemBalance = (data: DTOItemOut[]) => {
    return data.map((items) => ({
        id: items.id,
        operator: items.admin.name,
        amount: items.amount,
        createdAt: items.createdAt,
        initialStock: items.initialStock,
        finalStock: items.finalStock,
        code: items.code,
        description: items.description,
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
        
    }));
}
