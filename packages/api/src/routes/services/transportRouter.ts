import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateTransportSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const transportRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateTransportSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.transport.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.transport.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.transport.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.transport.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateTransportSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.transport.update({
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
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateTransportSchema.partial(),
          type: z.literal("transport").default("transport"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.transport.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.transport.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.transport.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
