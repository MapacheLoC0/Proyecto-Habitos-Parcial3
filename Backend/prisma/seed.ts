import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de datos...");

  // Limpiar datos existentes
  await prisma.habit.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios de prueba
  const user1 = await prisma.user.create({
    data: {
      email: "juan@example.com",
      password: await bcrypt.hash("password123", 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "maria@example.com",
      password: await bcrypt.hash("password123", 10),
    },
  });

  // Crear hábitos para el usuario 1
  const habit1 = await prisma.habit.create({
    data: {
      name: "Hacer ejercicio",
      userId: user1.id,
    },
  });

  const habit2 = await prisma.habit.create({
    data: {
      name: "Leer",
      userId: user1.id,
    },
  });

  // Crear hábitos para el usuario 2
  const habit3 = await prisma.habit.create({
    data: {
      name: "Meditación",
      userId: user2.id,
    },
  });

  // Crear rutinas para el usuario 1
  const routine1 = await prisma.routine.create({
    data: {
      title: "Rutina matutina",
      userId: user1.id,
    },
  });

  const routine2 = await prisma.routine.create({
    data: {
      title: "Rutina nocturna",
      userId: user1.id,
    },
  });

  // Crear rutinas para el usuario 2
  const routine3 = await prisma.routine.create({
    data: {
      title: "Rutina de trabajo",
      userId: user2.id,
    },
  });

  console.log("✅ Seed completado exitosamente");
  console.log("\n📊 Datos creados:");
  console.log(`  - ${2} usuarios`);
  console.log(`  - ${3} hábitos`);
  console.log(`  - ${3} rutinas`);
  console.log("\n🔐 Credenciales de prueba:");
  console.log(`  Email: juan@example.com | Contraseña: password123`);
  console.log(`  Email: maria@example.com | Contraseña: password123`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
