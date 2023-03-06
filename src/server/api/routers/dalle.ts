import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const dalleRouter = createTRPCRouter({
  getImages: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        promptStyle: z.string(),
        promptColor: z.string(),
        numberOfImages: z.number(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.prompt}`,
      };
    }),

  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        promptStyle: z.string(),
        promptColor: z.string(),
        numberOfImages: z.number(),
      })
    )
    .mutation(({ input }) => {
      // Here some login stuff would happen
    }),
  generateText: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 20,
        prompt: input.prompt,
      });

      console.log("response", response?.data?.choices[0]);
      return response?.data?.choices[0]?.text;
    }),
});
