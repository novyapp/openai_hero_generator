import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ReactElement, useState } from "react";
import RadioInput from "@/components/UI/RadioInput";
import UserInfo from "@/components/UserInfo";

import { possibleColors, possibleStyles } from "@/constants/generatorSettings";
import AppLayout from "@/components/AppLayout/AppLayout";
import { NextPageWithLayout } from "../_app";

const AddTokens: NextPageWithLayout = () => {
  const { data: session, status } = useSession();

  const addTokens = api.dalle.addTokens.useMutation();

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
            <Link
              href="#"
              className="mt-8 w-full rounded-xl bg-orange-500 py-4 text-center text-white"
            >
              Add Tokens
            </Link>
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
