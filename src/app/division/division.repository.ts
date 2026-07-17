import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateDivisionModel } from "./division.model";

export const getDivisionById = async ({
  divisionId,
}: {
  divisionId?: number;
}) => {
  return await prisma.division.findFirst({
    where: {
      id: divisionId,
    },
  });
};

export const updateDivisionById = async ({
  divisionId,
  data,
}: {
  divisionId?: number;
  data: IBodyCreateDivisionModel;
}) => {
  return await prisma.division.update({
    where: {
      id: divisionId,
    },
    data,
  });
};

export const getAllDivision = async ({ query }: { query: IQueryParams }) => {
  const { page = 1, perPage = 99, search } = query;

  return await prisma.division.findMany({
    where: {
      title: {
        contains: search,
      },
      NOT: {
        id: 1,
      },
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });
};

export const getCountAllDivision = async ({
  query,
}: {
  query: IQueryParams;
}) => {
  const { search } = query;

  return await prisma.division.count({
    where: {
      title: {
        contains: search,
      },
    },
  });
};

export const createDivision = async ({
  data,
}: {
  data: IBodyCreateDivisionModel;
}) => {
  return await prisma.division.create({
    data,
  });
};
