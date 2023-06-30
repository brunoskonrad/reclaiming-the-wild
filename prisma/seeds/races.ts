import { PrismaClient } from "@prisma/client";

export async function seedRaces(prisma: PrismaClient) {
  await prisma.race.upsert({
    where: { name: "Gerudo" },
    update: {},
    create: {
      name: "Gerudo",
      vulnerability: "Water",
    },
  });

  await prisma.race.upsert({
    where: { name: "Goron" },
    update: {},
    create: {
      name: "Goron",
      vulnerability: "Ice",
    },
  });

  await prisma.race.upsert({
    where: { name: "Hylian" },
    update: {},
    create: {
      name: "Hylian",
      vulnerability: "Dark",
    },
  });

  await prisma.race.upsert({
    where: { name: "Rito" },
    update: {},
    create: {
      name: "Rito",
      vulnerability: "Earth",
    },
  });

  await prisma.race.upsert({
    where: { name: "Sheikah" },
    update: {},
    create: {
      name: "Sheikah",
      vulnerability: "Light",
    },
  });

  await prisma.race.upsert({
    where: { name: "Zora" },
    update: {},
    create: {
      name: "Zora",
      vulnerability: "Shock",
    },
  });
}
