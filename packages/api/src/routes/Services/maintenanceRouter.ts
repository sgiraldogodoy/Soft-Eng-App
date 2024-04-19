import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, maintenance } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const maintenanceRequestRouter = router({
  createOne: protectedProcedure
    .input(
      baseService
        .extend({
          data: maintenance,
          type: z.literal("maintenance").default("maintenance"),
        })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.maintenance.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.maintenance.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.maintenance.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.maintenance.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: maintenance.partial(),
          type: z.literal("maintenance").default("maintenance"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;

      return ctx.db.maintenance.update({
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
          data: maintenance.partial(),
          type: z.literal("maintenance").default("maintenance"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.maintenance.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.maintenance.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.maintenance.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
