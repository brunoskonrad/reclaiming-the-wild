import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const koroks = await prisma.koroks.findMany();
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Print object={koroks} />

      <Print object={session} />
    </main>
  );
}

function Print({ object }: { object: any }) {
  if (!object) {
    return (
      <span>
        Object is <code>null</code> or <code>undefined</code>
      </span>
    );
  }

  return <strong>{JSON.stringify(object, null, 2)}</strong>;
}
