// import { User } from "@prisma/client";
// import { TemplateDTO } from "./template-dto";

import { DTOUserPrisma } from "./users.dto";

// export const getUsersDTOMapper = (data: User[]): TemplateDTO[] => {
//   return data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     email: item.email,
//   }));
// };

// export const getUserDTOMapper = (data: User[]): TemplateDTO[] => {
//   return data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     email: item.email,
//   }));
// };

export const mapperUsers = (data: DTOUserPrisma[]) => {
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    isActive: user.isActive,
    divisionId: user.divisionId,
    divisionTitle: user.division?.title || "",
    code: user.code,
    telephone: user.telephone,
    _count: user._count.itemOut,
  }));
};
