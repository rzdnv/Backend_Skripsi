interface Admin {
  name: string;
}

interface Category {
  title: string;
}

interface Unit {
  title: string;
}

interface Item {
  brand: string | null;
  category: Category;
  unit: Unit;
  title: string;
  code: string;
  supplier: string | null;
  location: string | null;
}

interface Division {
  title: string;
}

interface User {
  division: Division;
  name: string;
  telephone: string;
}

export interface DTOItemOut {
  id: number;
  admin: Admin;
  amount: number;
  initialStock: number;
  finalStock: number;
  description: string | null;
  createdAt: Date | null;  // ISO string tanggal
  item: Item;
  code: string;
  news: "TRUE" | "FALSE" | string;  // sesuaikan kalau ada kemungkinan lain
}

