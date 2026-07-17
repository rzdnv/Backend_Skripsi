export interface DTOUserPrisma {
  id: number;
  name: string;
  division: {
    title: string;
  };
  divisionId: number;
  isActive: boolean;
  code: string | null;
  telephone: string;
  _count: {
    itemOut: number;
  };
}
