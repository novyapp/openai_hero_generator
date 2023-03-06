import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Logo from "../Logo/Logo";

import UserInfo from "../UserInfo";

interface AppLayoutProps {
  children: JSX.Element;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex h-screen w-72 flex-col bg-zinc-200">
        <Logo />
        <div className="m-2 rounded-lg bg-zinc-100 p-2">Tokens</div>
        <div className="m-2 flex flex-1 rounded-lg bg-zinc-100 p-2">List</div>
        <UserInfo session={sessionData} />
      </div>
      <div className="flex w-full flex-col space-y-4 p-6">{children}</div>
    </>
  );
};

export default AppLayout;
