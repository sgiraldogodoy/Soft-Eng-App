import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, flower } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const FlowerRouter = router({
  createOne: protectedProcedure
    .input(
      baseService
        .extend({
          data: flower,
          type: z.literal("flower").default("flower"),
        })
        .transform(transformCreateServiceInput),
    )
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
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: flower.partial(),
          type: z.literal("flower").default("flower"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;

      return ctx.db.flower.update({
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
          data: flower.partial(),
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
