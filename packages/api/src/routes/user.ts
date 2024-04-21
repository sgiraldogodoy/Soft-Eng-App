import { protectedProcedure } from "../trpc.ts";
import { router } from "../trpc.ts";
import { z } from "zod";
import { baseUser } from "common";
import { userCreate } from "./user.schema.ts";

export const userRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOne: protectedProcedure
    .input(z.object({ data: userCreate }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.create({
        data: {
          ...input.data,
        },
      });
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: userCreate.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data } = input;
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
        },
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: baseUser.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  findAuth0ByEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.auth0.usersByEmail.getByEmail({
        email: input.email,
      });

      if (res.data.length > 0) {
        return res.data[0].user_id;
      } else {
        return false;
      }
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
