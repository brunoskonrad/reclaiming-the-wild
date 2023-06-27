import { HeartContainer } from "@/components/PointContainer/HeartContainer";
import { ManaContainer } from "@/components/PointContainer/ManaContainer";
import { StaminaContainer } from "@/components/PointContainer/StaminaContainer";
import { Wrapper } from "@/components/Wrapper";
import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const koroks = await prisma.koroks.findMany();
  const session = await getServerSession(authOptions);

  return (
    <Wrapper>
      <main className="flex flex-col items-start justify-between">
        {/* <Print object={koroks} /> */}

        <HeartContainer
          point={{
            current: 22,
            maximum: 40,
            temporary: 11,
          }}
        />

        <ManaContainer
          point={{
            current: 2,
            maximum: 40,
            temporary: 0,
          }}
        />

        <StaminaContainer
          point={{
            current: 32,
            maximum: 40,
            temporary: 0,
          }}
        />

        <Print object={session} />
      </main>
    </Wrapper>
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

  return <code>{JSON.stringify(object, null, 2)}</code>;
}
