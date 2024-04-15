import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";
import { baseService, security } from "common";

export const SecurityRouter = router({
  //Security Request Service
  createOne: publicProcedure
    .input(
      baseService
        .extend({ data: security })
        .extend({ type: z.literal("SECURITY").default("SECURITY") })
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
  deleteOne: publicProcedure
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

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    // delete all security requests
    await ctx.db.security.deleteMany({});

    return { message: "All security requests deleted" };
  }),
  deleteMany: publicProcedure
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
});
