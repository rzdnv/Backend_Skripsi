import { ADMIN_ROLE } from "@prisma/client";

export interface IBodyCreateOperatorModel {
  telephone: string;
  name: string;
  email: string;
  password: string;
  divisionId: number;
  adminRole: ADMIN_ROLE;
}
export interface IBodyUpdateOperatorModel {
  telephone: string;
  name: string;
  divisionId: number;
  adminRole: ADMIN_ROLE;
}

export interface IBodyLoginOperatorModel {
  email: string;
  password: string;
}
