import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateMaintenanceSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const maintenanceRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateMaintenanceSchema)
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
    .input(updateSchema(ZCreateMaintenanceSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.maintenance.update({
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
          data: ZCreateMaintenanceSchema.partial(),
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
