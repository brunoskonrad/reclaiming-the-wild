import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const koroks = await prisma.koroks.findMany();
  getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <strong>{JSON.stringify(koroks, null, 2)}</strong>
    </main>
  );
}
