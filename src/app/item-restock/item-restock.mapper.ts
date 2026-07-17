import { DTOItemRestock } from "./item-restock.dto";

export const mapperItemRestock = (data: DTOItemRestock[]) => {
    return data.map((item) => ({
        admin: item.admin.name,
        amount: item.amount,
        createdAt: item.createdAt,
        description: item.description,
        news: item.news === "TRUE",
        code: item.code,
        item: {
            brand: item.item.brand,
            category: item.item.category.title,
            unit: item.item.unit.title,
            title: item.item.title,
            code: item.item.code,
            supplier: item.item.supplier,
            location: item.item.location,
        },
    }));
};
