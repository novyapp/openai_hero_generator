import { getSession, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ReactElement } from "react";
import AppLayout from "@/components/AppLayout/AppLayout";
import { NextPageWithLayout } from "../_app";
import { refreshSession } from "@/utils/sessionRefresh";
import Link from "next/link";

const User: NextPageWithLayout = () => {
  const { data: session, status } = useSession();

  console.log(session?.user);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  if (session) {
    return (
      <div className="flex w-full flex-col space-y-4 p-6">
        <div>
          <span className="text-4xl font-semibold">Welcome </span>
          <span className="text-4xl font-light text-orange-500">
            {session?.user.name!}
          </span>
        </div>
        <div className="flex items-center  rounded-xl border border-zinc-200 bg-white px-8 py-6 shadow-md">
          <div>
            <span className="font-semibold">Available tokens: </span>
            <span>{session?.user.tokensAI!}</span>
          </div>
          <Link
            className="ml-auto rounded-md bg-orange-500 p-2 text-white"
            href="/dashboard/addTokens"
          >
            Add More
          </Link>
        </div>
      </div>
    );
  }

  return <div>Access Denied</div>;
};

User.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default User;
