import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

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
});
