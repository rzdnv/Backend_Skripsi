export interface DTOItemRestock {
    admin: {
        name: string;
    };
    amount: number;
    createdAt: Date | null
    description?: string | null
    news: string;
    code: string
    item: {
        brand: string | null
        category: {
            title: string;
        };
        unit: {
            title: string;
        };
        title: string;
        code: string;
        supplier: string | null
        location: string | null
    };
}

