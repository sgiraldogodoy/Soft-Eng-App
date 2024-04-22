import { protectedProcedure, publicProcedure } from "../trpc.ts";
import { router } from "../trpc.ts";
import { z } from "zod";
import { baseUser, staff } from "common";
import { TRPCError } from "@trpc/server";
import { parseCSVStaff } from "../../utils/csv-parsing.ts";
import { exportStaffToDb } from "../../utils/create-csv.ts";

export const staffRouter = router({
  csvUpload: protectedProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await fetch(input.buffer);
        const str = await file.text();
        const staff = await parseCSVStaff(str);
        await ctx.db.staff.deleteMany();
        await ctx.db.staff.createMany({
          data: staff,
          skipDuplicates: true,
        });
        // console.log("staff created");
        return { message: "Staff added" };
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error adding staff",
        });
      }
    }),
  csvExport: protectedProcedure.query(async ({ ctx }) => {
    const staffStr = await exportStaffToDb(ctx.db);
    const b64str = Buffer.from(staffStr, "utf8").toString("base64");
    return b64str;
  }),
  createOne: protectedProcedure
    .input(
      z.object({
        data: staff,
        user: z.union([z.object({ id: z.string() }), baseUser]).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let userId;

      if (input.user && "sub" in input.user)
        userId = (await ctx.db.user.create({ data: input.user })).id;
      else if (input.user) userId = input.user.id;

      await ctx.db.staff.create({
        data: {
          ...input.data,
          userId: undefined,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),

  createMany: protectedProcedure
    .input(z.object({ data: z.array(staff) }))
    .mutation(async ({ input, ctx }) => {
      ctx.db.staff.createMany({
        data: input.data,
        skipDuplicates: true,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.staff.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.staff.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.staff.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), data: staff.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()), data: staff.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.staff.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  connectToUser: protectedProcedure
    .input(z.object({ staffId: z.string(), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.staff.update({
        where: {
          id: input.staffId,
        },
        data: {
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
