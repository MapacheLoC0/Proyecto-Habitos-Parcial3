import prisma from "../config/prisma";

export const createHabit = async (userId: number, data: any) => {
  return prisma.habit.create({
    data: {
      name: data.name,
      userId: userId, // Ya es number
    },
  });
};

export const getHabits = async (userId: number) => {
  return prisma.habit.findMany({
    where: { userId: userId }, // Ya es number
  });
};

export const getHabitById = async (id: number, userId: number) => {
  return prisma.habit.findFirst({
    where: { id, userId: userId }, // Ya es number
  });
};

export const updateHabit = async (id: number, userId: number, data: any) => {
  return prisma.habit.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
};

export const deleteHabit = async (id: number, userId: number) => {
  return prisma.habit.deleteMany({
    where: { id, userId: userId }, // Ya es number
  });
};