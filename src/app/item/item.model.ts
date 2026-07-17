export interface IBodyCreateItemModel {
  title: string;
  code: string;
  brand?: string | null;
  location?: string | null;
  supplier?: string | null;
  price: number;
  description?: string | null;
  unitId: number;
  typeId: number;
}