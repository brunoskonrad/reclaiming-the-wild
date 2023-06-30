import { Session } from "next-auth";
import { Wrapper } from "./Wrapper";
import Link from "next/link";

export type AppHeaderProps = {
  session: Session | null;
};

export default async function AppHeader({ session }: AppHeaderProps) {
  return (
    <header className="border-b-2 border-gray-900 dark:border-gray-50">
      <Wrapper className="flex flex-row items-center justify-between py-4">
        <Link href="/">
          <img
            className="h-14 dark:invert"
            src="https://reclaimthewild.net/wp-content/uploads/2018/12/logo-with-die.png"
            alt="Reclaiming the Wild logo"
          />
        </Link>

        <SessionHeaderItem session={session} />
      </Wrapper>
    </header>
  );
}

function SessionHeaderItem({ session }: AppHeaderProps) {
  if (!session || !session.user || !session.user?.image) return null;

  return (
    <div className="flex flex-row items-center">
      <span className="mr-2">{session.user.name}</span>

      <img
        src={session.user?.image}
        alt="User profile"
        width={48}
        height={48}
        className="h-12 rounded-full"
      />
    </div>
  );
}
