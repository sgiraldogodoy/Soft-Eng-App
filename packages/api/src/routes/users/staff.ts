import { protectedProcedure, publicProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateStaffSchema } from "common";

export const staffRouter = router({
  createOne: protectedProcedure
    .input(ZCreateStaffSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.staff.create({
        data: input,
      });
    }),

  createMany: protectedProcedure
    .input(z.object({ data: z.array(ZCreateStaffSchema) }))
    .mutation(async ({ input, ctx }) => {
      ctx.db.staff.createMany({
        data: input.data,
        skipDuplicates: true,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.staff.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.staff.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.staff.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), data: ZCreateStaffSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateStaffSchema.partial(),
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

  connectToUser: protectedProcedure
    .input(z.object({ staffId: z.string(), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.staff.update({
        where: {
          id: input.staffId,
        },
        data: {
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
