import { protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateEquipmentSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const EquipmentRouter = router({
  createOne: protectedProcedure
    .input(ZCreateEquipmentSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.equipment.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.equipment.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.equipment.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.equipment.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateEquipmentSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.equipment.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.string(),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateEquipmentSchema.partial(),
          type: z.literal("equipment").default("equipment"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.equipment.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.equipment.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.equipment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
