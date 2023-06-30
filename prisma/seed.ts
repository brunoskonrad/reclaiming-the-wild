import { PrismaClient } from "@prisma/client";
import { seedRaces } from "./seeds/races";

const prisma = new PrismaClient();

async function main() {
  await seedRaces(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect;
    process.exit(1);
  });
