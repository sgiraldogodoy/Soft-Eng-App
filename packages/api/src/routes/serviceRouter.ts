import { ZCreateBaseServiceSchema } from "common";
import { publicProcedure, protectedProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const serviceRouter = router({
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.service.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.service.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.service.deleteMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.service.findUnique({
        where: {
          id: input.id,
        },
        include: {
          gift: true,
          av: true,
          flower: true,
          security: true,
          room: true,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.service.findMany({
      include: {
        gift: true,
        av: true,
        flower: true,
        security: true,
        room: true,
      },
    });
  }),

  updateOne: protectedProcedure
    .input(
      z.object({ id: z.string(), data: ZCreateBaseServiceSchema.partial() }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.service.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),
});
