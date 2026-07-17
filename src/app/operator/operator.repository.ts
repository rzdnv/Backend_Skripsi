import { ADMIN_ROLE } from "@prisma/client";
import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import {
  IBodyCreateOperatorModel,
  IBodyUpdateOperatorModel,
} from "./operator.model";

export const getOperatorByEmail = async ({ email }: { email: string }) => {
  return await prisma.admin.findFirst({
    where: {
      email,
    },
  });
};
export const getOperatorById = async ({
  operatorId: id,
}: {
  operatorId: number;
}) => {
  return await prisma.admin.findFirst({
    where: {
      id,
    },
  });
};

export const createOperator = async ({
  data,
  adminRole,
}: {
  data: IBodyCreateOperatorModel;
  adminRole: ADMIN_ROLE;
}) => {
  return await prisma.admin.create({
    data: {
      ...data,
      adminRole,
    },
  });
};
export const updateOperator = async ({
  data,
  adminRole,
  operatorId: id,
}: {
  data: IBodyUpdateOperatorModel;
  adminRole: ADMIN_ROLE;
  operatorId: number;
}) => {
  return await prisma.admin.update({
    where: {
      id,
    },
    data: {
      ...data,
      adminRole,
    },
  });
};

export const updateIsActive = async ({
  isActive,
  operatorId: id,
}: {
  isActive: boolean;
  operatorId: number;
}) =>
  await prisma.admin.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });

export const getAllOperator = async ({ query }: { query: IQueryParams }) => {
  const { page = 1, perPage = 99, active, search = "" } = query;

  return await prisma.admin.findMany({
    where: {
      adminRole: {
        not: ADMIN_ROLE.SUPERADMIN,
      },
      name: {
        contains: search,
      },
      ...(typeof active !== "undefined" && active !== ""
        ? { isActive: active === "true" }
        : {}), // hanya tambahkan filter isActive jika active ada
      NOT: {
        divisionId: 1,
      },
    },
    select: {
      id: true,
      isActive: true,
      name: true,
      email: true,
      telephone: true,
      adminRole: true,
      updatedAt: true,
      createdAt: true,
      divisionId: true,
      division: {
        select: {
          title: true,
        },
      },
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });
};
export const getCountAllOperator = async ({
  query,
}: {
  query: IQueryParams;
}) => {
  const { search } = query;

  return await prisma.admin.count({
    where: {
      adminRole: ADMIN_ROLE.OPERATOR,
      name: {
        contains: search,
      },
    },
  });
};

// export const getUnitById = async ({
//     unitId
// }: {
//     unitId?: number
// }) => {
//     return await prisma.unit.findFirst({
//         where: {
//             id: unitId
//         }
//     })
// }

// export const updateUnitById = async ({
//     unitId,
//     data
// }: {
//     unitId?: number,
//     data: IBodyCreateUnitModel
// }) => {
//     return await prisma.unit.update({
//         where: {
//             id: unitId
//         },
//         data
//     })
// }

// export const getAllUnit = async ({
//     query
// }: {
//     query: IQueryParams
// }) => {
//     const {
//         page = 1,
//         perPage = 99,
//         search
//     } = query

//     return await prisma.unit.findMany({
//         where: {
//             title: {
//                 contains: search
//             }
//         },
//         skip: (Number(page) - 1) * Number(perPage),
//         take: Number(perPage),
//     })
// }

// export const getCountAllUnit = async ({
//     query
// }: {
//     query: IQueryParams
// }) => {
//     const {
//         search
//     } = query

//     return await prisma.unit.count({
//         where: {
//             title: {
//                 contains: search
//             }
//         },
//     })
// }

// export const createUnit = async ({
//     data,
// }: {
//     data: IBodyCreateUnitModel,
// }) => {
//     return await prisma.unit.create({
//         data
//     })
// }
