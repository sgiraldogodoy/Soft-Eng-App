import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";
import { ZCreateBaseServiceSchema, ZCreateSecuritySchema } from "common";

export const SecurityRouter = router({
  //Security Request Service
  createOne: protectedProcedure
    .input(
      ZCreateBaseServiceSchema.extend({ data: ZCreateSecuritySchema })
        .extend({ type: z.literal("security").default("security") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.security.create({
        data: input,
      });
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get a security request

      return ctx.db.security.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // get all security requests
    return ctx.db.security.findMany({
      include: {
        service: true,
      },
    });
  }),
  deleteOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete a security request
      await ctx.db.security.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "Security request deleted" };
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    // delete all security requests
    await ctx.db.security.deleteMany({});

    return { message: "All security requests deleted" };
  }),
  deleteMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete multiple security requests
      await ctx.db.security.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      return { message: "Security requests deleted" };
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateSecuritySchema.partial(),
          type: z.literal("security").default("security"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;
      return ctx.db.security.update({
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
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateSecuritySchema.partial(),
          type: z.literal("security").default("security"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.security.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),
});
