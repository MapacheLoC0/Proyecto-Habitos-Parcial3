import prisma from "../config/prisma";

export const createHabit = async (userId: string, data: any) => {
  return prisma.habit.create({
    data: {
      name: data.name,
      userId: Number(userId),
    },
  });
};

export const getHabits = async (userId: string) => {
  return prisma.habit.findMany({
    where: { userId: Number(userId) },
  });
};

export const getHabitById = async (id: number, userId: string) => {
  return prisma.habit.findFirst({
    where: { id, userId: Number(userId) },
  });
};

export const updateHabit = async (id: number, userId: string, data: any) => {
  return prisma.habit.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
};

export const deleteHabit = async (id: number, userId: string) => {
  return prisma.habit.delete({
    where: { id },
  });
};
