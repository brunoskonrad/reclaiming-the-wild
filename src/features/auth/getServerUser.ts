"use server";

import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getServerUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findFirst({
    where: { name: session.user?.name },
    include: {
      sessions: true,
    },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return user;
}
