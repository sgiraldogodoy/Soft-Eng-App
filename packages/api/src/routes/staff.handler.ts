import { protectedProcedure } from "../trpc.ts";
import { router } from "../trpc.ts";
import { z } from "zod";
import { baseUser } from "common";
import { userCreate } from "./user.schema.ts";
import { staff } from "common";

export const staffRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.staff.findMany();
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.staff.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOne: protectedProcedure
    .input(z.object({ data: staff }))
    .mutation(({ input, ctx }) => {
      return ctx.db.staff.create({
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
      return ctx.db.staff.update({
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
      return ctx.db.staff.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.staff.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
