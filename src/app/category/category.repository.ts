import { IQueryParams } from "../../interface";
import { prisma } from "../../setup/prisma";
import { IBodyCreateCategoryModel } from "./category.model";

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId?: number;
}) => {
  return await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });
};

export const updateCategoryById = async ({
  categoryId,
  data,
}: {
  categoryId?: number;
  data: IBodyCreateCategoryModel;
}) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });
};

export const getAllCategory = async ({ query }: { query: IQueryParams }) => {
  const { page = 1, perPage = 99, search } = query;

  return await prisma.category.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    include: {
      _count: true,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });
};

export const getCountAllCategory = async ({
  query,
}: {
  query: IQueryParams;
}) => {
  const { search } = query;

  return await prisma.category.count({
    where: {
      title: {
        contains: search,
      },
    },
  });
};

export const createCategory = async ({
  data,
}: {
  data: IBodyCreateCategoryModel;
}) => {
  return await prisma.category.create({
    data,
  });
};
