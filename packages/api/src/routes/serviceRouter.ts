import { ZCreateBaseServiceSchema } from "common";
import { publicProcedure, protectedProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { updateSchema } from "common/src/zod-utils.ts";

export const serviceRouter = router({
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.service.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.service.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.service.deleteMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.service.findUnique({
        where: {
          id: input.id,
        },
        include: {
          gift: true,
          av: true,
          flower: true,
          security: true,
          room: true,
          maintenance: true,
          transport: true,
          sanitation: true,
          visitor: true,
          it: true,
          religious: true,
          interpreter: true,
          equipment: true,
          food: true,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.service.findMany({
      include: {
        gift: true,
        av: true,
        flower: true,
        security: true,
        room: true,
        maintenance: true,
        transport: true,
        sanitation: true,
        visitor: true,
        it: true,
        religious: true,
        interpreter: true,
        assignee: true,
        equipment: true,
        food: true,
      },
    });
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateBaseServiceSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.service.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),
  createOne: protectedProcedure
    .input(ZCreateBaseServiceSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.service.create({
        data: {
          ...input,
        },
      });
    }),
  connectToStaff: protectedProcedure
    .input(z.object({ serviceId: z.string(), staffId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.service.update({
        where: {
          id: input.serviceId,
        },
        data: {
          assignee: {
            connect: {
              id: input.staffId,
            },
          },
        },
      });
    }),
});
