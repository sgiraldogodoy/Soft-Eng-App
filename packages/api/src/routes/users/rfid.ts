import { z } from "zod";
import { loggedInProcedure, protectedProcedure, router } from "../../trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const rfidRouter = router({
  store: protectedProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ input, ctx }) => {
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
          message: "Not logged in",
          code: "BAD_REQUEST",
        });
      }

      if (user.rfid) {
        throw new TRPCError({
          message: "RFID exists.",
          code: "BAD_REQUEST",
        });
      }

      const hashed = bcrypt.hashSync(input.code, 10);

      await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          rfid: {
            create: {
              hash: hashed,
            },
          },
        },
      });

      return true;
    }),

  verify: loggedInProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ input, ctx }) => {
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
          message: "Not logged in",
          code: "BAD_REQUEST",
        });
      }

      if (!user.rfid) {
        throw new TRPCError({
          message: "No RFID found",
          code: "BAD_REQUEST",
        });
      }

      const valid = await bcrypt.compare(input.code, user.rfid.hash);

      if (valid) {
        await ctx.db.user.update({
          where: {
            sub: ctx.token.payload.sub as string,
          },
          data: { locked: false },
        });
      }

      return valid;
    }),
});
