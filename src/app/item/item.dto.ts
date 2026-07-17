export interface DTOItemPrisma {
    id: number;
    title: string;
    code: string;
    brand?: string | null;
    location?: string | null;
    supplier?: string | null;
    stock: number;
    description?: string | null;
    unitId: number;
    typeId: number;
    createdAt: Date | null;
    updatedAt: Date | null
    unit: {
        title: string;
    };
    category: {
        title: string;
    }
}[]