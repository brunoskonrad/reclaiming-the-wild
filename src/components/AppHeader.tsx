import { Session } from "next-auth";
import { Wrapper } from "./Wrapper";

export type AppHeaderProps = {
  session: Session | null;
};

export default async function AppHeader({ session }: AppHeaderProps) {
  return (
    <header className="border-b-2 border-gray-900 dark:border-gray-50">
      <Wrapper className="flex flex-row justify-between items-center py-4">
        <img
          className="dark:invert h-14"
          src="https://reclaimthewild.net/wp-content/uploads/2018/12/logo-with-die.png"
          alt="Reclaiming the Wild logo"
        />

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
        className="rounded-full h-12"
      />
    </div>
  );
}
