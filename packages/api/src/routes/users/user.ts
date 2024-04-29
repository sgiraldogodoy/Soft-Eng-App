import { loggedInProcedure, protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateBaseUserSchema, ZCreateUserWithAuth0AndNested } from "common";
import { TRPCError } from "@trpc/server";
import { updateSchema } from "common/src/zod-utils.ts";

export const userRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      include: {
        staff: true,
        patient: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          staff: true,
          patient: true,
        },
      });
    }),

  createOne: protectedProcedure
    .input(ZCreateUserWithAuth0AndNested)
    .mutation(async ({ input, ctx }) => {
      const { auth, ...rest } = input;
      let user;

      if (typeof auth === "string") {
        user = auth;
      } else {
        // Hopefully create a user in auth0 :)
        const userRes = await ctx.auth0.users
          .create({
            email: rest.email,
            password: auth.password,
            connection: "Username-Password-Authentication",
          })
          .catch((e) => {
            console.error(e);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error occured creating an auth0 user.",
            });
          });

        user = userRes.data.user_id;
      }

      return ctx.db.user.create({
        data: {
          ...rest,
          sub: user,
        },
      });
    }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateBaseUserSchema))
    .mutation(async ({ input, ctx }) => {
      const { data } = input;
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
        },
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateBaseUserSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  findAuth0ByEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.auth0.usersByEmail.getByEmail({
        email: input.email,
      });

      if (res.data.length > 0) {
        return res.data[0];
      } else {
        return false;
      }
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  me: loggedInProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        sub: ctx.token.payload.sub as string,
      },
      include: {
        staff: true,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }),

  lockMe: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        sub: ctx.token.payload.sub as string,
      },
      include: {
        rfid: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Can't lock an account without a connected user.",
      });
    }
    if (!user.rfid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Can't lock a user without an RFID key.",
      });
    }

    await ctx.db.user.update({
      where: { sub: ctx.token.payload.sub as string },
      data: { locked: true },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }),
});
