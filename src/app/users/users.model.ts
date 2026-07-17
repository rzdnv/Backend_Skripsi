// export interface IArgUser {
//     userId: number,
//     token: string,
// }

// export interface IBodyUser {
//     username: string
//     password: string,
//     nama: string,
//     telephone: string,
//     type: string
// }

export interface IBodyCreateUserModel {
  telephone: string;
  name: string;
  code?: string | null;
  divisionId: number;
}
