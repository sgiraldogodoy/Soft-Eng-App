import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, transport } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const transportRequestRouter = router({
  createOne: protectedProcedure
    .input(
      baseService
        .extend({
          data: transport,
          type: z.literal("transport").default("transport"),
        })
        .transform(transformCreateServiceInput),
    )
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
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: transport.partial(),
          type: z.literal("transport").default("transport"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;

      return ctx.db.transport.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
          service: {
            update: {
              ...rest,
            },
          },
        },
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: baseService.partial().extend({
          data: transport.partial(),
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
