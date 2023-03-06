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

const NewImage: NextPageWithLayout = () => {
  const [typeApi, setTypeApi] = useState("token");
  const [token, setToken] = useState("");
  const [prompt, setPrompt] = useState("");
  const [promptStyle, setPromptStyle] = useState("");
  const [promptColor, setPromptColor] = useState("");
  const [numberOfImages, setNumberOfImages] = useState<number>(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(promptStyle);

  const onStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptStyle((prev) => e.target.value);
  };
  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptColor((prev) => e.target.value);
  };

  async function getImages(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  const { data: session, status } = useSession();

  const generateText = api.dalle.generateText.useMutation();

  const handleGenerateImage = () => {
    generateText.mutate({
      prompt,
    });
  };

  console.log(
    JSON.stringify(
      {
        generateText: generateText.data ?? null,
      },
      null,
      4
    )
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  if (session) {
    return (
      <div className="flex w-full flex-col space-y-4 p-6">
        <div className="flex flex-row space-x-4 ">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Choose what API you want
            </label>
            <select
              id="typeApi"
              value={typeApi}
              onChange={(e) => setTypeApi(e.target.value)}
              defaultValue={typeApi}
              className="focus:shadow-outline  appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
            >
              <option value="token">Use tokens</option>
              <option value="openAI">Use your openAI token</option>
            </select>
          </div>
          {typeApi === "openAI" ? (
            <div className="flex w-full flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Your OpenAI Token
              </label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Bearer Token"
                className="focus:shadow-outline  appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-full">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Your prompt:
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Prompt"
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Number images:
            </label>
            <input
              id="number"
              type="number"
              value={+numberOfImages}
              onChange={(e) => setNumberOfImages(+e.target.value)}
              placeholder="Number of images"
              max="10"
              className="focus:shadow-outline w-32  appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerateImage}
            className="rounded-md bg-orange-500 p-2 px-4 font-semibold text-white"
          >
            Get Images
          </button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Choose style:
          </label>
          <div className="flex flex-row space-x-4">
            {possibleStyles.map((style) => (
              <RadioInput
                key={style.id}
                label={style.name}
                check={promptStyle}
                image="https://api.lorem.space/image/game?w=100&h=100"
                onChange={onStyleChange}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Choose color:
          </label>
          <div className="flex flex-row space-x-4">
            {possibleColors.map((style) => (
              <RadioInput
                key={style.id}
                label={style.name}
                check={promptColor}
                onChange={onColorChange}
                color={style.color}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>Access Denied</div>;
};

NewImage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default NewImage;
