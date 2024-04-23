import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateSanitationSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const sanitationRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateSanitationSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.sanitation.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.sanitation.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.sanitation.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.sanitation.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateSanitationSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.sanitation.update({
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
          data: ZCreateSanitationSchema.partial(),
          type: z.literal("sanitation").default("sanitation"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.sanitation.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.sanitation.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.sanitation.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
