import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateFlowerSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const FlowerRouter = router({
  createOne: protectedProcedure
    .input(ZCreateFlowerSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.flower.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.flower.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.flower.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("Deleted all flower request!");
    return ctx.db.flower.deleteMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.flower.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.flower.findMany({
      include: {
        service: true,
      },
    });
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateFlowerSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.flower.update({
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
          data: ZCreateFlowerSchema.partial(),
          type: z.literal("flower").default("flower"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.flower.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),
});
