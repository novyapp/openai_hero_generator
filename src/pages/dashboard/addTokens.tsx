import { getSession, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ReactElement } from "react";
import AppLayout from "@/components/AppLayout/AppLayout";
import { NextPageWithLayout } from "../_app";
import { refreshSession } from "@/utils/sessionRefresh";

const AddTokens: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const addTokens = api.dalle.addTokens.useMutation();

  const handleAddTokens = async () => {
    try {
      const tok = await addTokens.mutate(
        {
          user: session?.user.id!,
        },
        {
          onSuccess: refreshSession,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  if (session) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 p-6">
        {/* Pricing table */}
        <div className="flex">
          {/* Basic */}
          <div className="flex w-64 flex-col rounded-xl border border-zinc-200 bg-white px-8 py-6 shadow-xl">
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold">Starter pack</span>
              <div className="pt-2 tracking-wide">
                <span className="align-top">$</span>
                <span className="text-3xl font-semibold">5</span>
                <span className="font-medium">/ 50 tokens </span>
              </div>
            </div>
            <hr className="border-1 mt-4"></hr>
            <div className="flex flex-col pt-4 text-left text-xs">
              <span className="pt-2">
                This option is great for those who are new to image generation
                with AI and want to try it out without committing to a larger
                purchase.
              </span>
            </div>
            <button
              onClick={handleAddTokens}
              className="mt-8 w-full rounded-xl bg-orange-500 py-4 text-center text-white"
            >
              Add Tokens
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Access Denied</div>;
};

AddTokens.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default AddTokens;
