import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UserInfoProps {
  session: Session | null;
}

const UserInfo = ({ session: sessionData }: UserInfoProps) => {
  return (
    <div className="m-2 flex flex-row items-center space-x-4 rounded-lg bg-zinc-100 p-2">
      {sessionData?.user ? (
        <Link href="/dashboard/user" className="flex space-x-4">
          <div>
            <Image
              className="rounded-full border-4 border-orange-500"
              src={sessionData?.user.image as string}
              alt="user avatar"
              width={50}
              height={50}
            />
          </div>
          <div>
            <div className="font-semibold">{sessionData?.user.name}</div>
            <div className="text-xs">
              <span className="font-semibold">Available tokens: </span>
              <span>{sessionData?.user.tokensAI}</span>
            </div>
            <button className="text-xs" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </Link>
      ) : (
        <>
          <div>
            <div className="h-12 w-12 rounded-full bg-zinc-200"></div>
          </div>
          <div className="text-xs">
            <div className="font-semibold">Welcome</div>
            <button onClick={() => signIn()}>Log in</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
