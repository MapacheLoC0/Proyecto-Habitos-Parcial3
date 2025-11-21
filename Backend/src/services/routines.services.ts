import prisma from "../config/prisma";

export const createRoutine = async (userId: string, data: any) => {
  return prisma.routine.create({
    data: {
      title: data.title,
      userId: Number(userId),
    },
  });
};

export const getRoutines = async (userId: string) => {
  return prisma.routine.findMany({
    where: { userId: Number(userId) },
  });
};

export const getRoutineById = async (id: number, userId: string) => {
  return prisma.routine.findFirst({
    where: { id, userId: Number(userId) },
  });
};

export const updateRoutine = async (id: number, userId: string, data: any) => {
  return prisma.routine.update({
    where: { id },
    data: {
      title: data.title,
    },
  });
};

export const deleteRoutine = async (id: number, userId: string) => {
  return prisma.routine.delete({
    where: { id },
  });
};
