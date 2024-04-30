import { TRPCError, initTRPC } from "@trpc/server";
import { db } from "database";
import superjson from "superjson";
import { ZodError } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import { verifyJwt } from "../utils/auth";
import { ManagementClient } from "auth0";
import { Resend } from "resend";

export const createTRPCContext = async (
  opts: trpcExpress.CreateExpressContextOptions,
) => {
  const auth0 = new ManagementClient({
    domain: "dev-x61j30sgxmn7t3u3.us.auth0.com",
    clientId: process.env.AUTH0_CLIENT_ID ?? "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  // dev-x61j30sgxmn7t3u3.us.auth0.com
  try {
    const authorization = opts.req.headers.authorization;

    if (authorization) {
      const token = await verifyJwt(authorization);

      return {
        auth0,
        db,
        token,
        resend,
      };
    }
  } catch (e) {
    console.error(e);
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  return {
    auth0,
    db,
    resend,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const loggedInProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  if (!ctx.token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      token: ctx.token,
    },
  });
});
export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;
    if (!ctx.token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    // const user = await ctx.db.user.findUnique({
    //   where: {
    //     sub: ctx.token.payload.sub as string,
    //   },
    // });
    //
    // if (!user) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "User not found.",
    //   });
    // }
    //
    // if (user.locked) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "User is locked. Scan RFID badge to unlock",
    //   });
    // }
    //
    // console.log(user);
    return opts.next({
      ctx: {
        // user,
        token: ctx.token,
      },
    });
  },
);
