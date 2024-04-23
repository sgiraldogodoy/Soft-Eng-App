import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { parseCSVEdge } from "../../utils/csv-parsing.ts";
import { exportEdgesToDb } from "../../utils/create-csv.ts";
import { ZCreateEdgeSchema } from "common";
import { TRPCError } from "@trpc/server";
import { manySchema } from "common/src/zod-utils.ts";

export const Edge = router({
  csvUpload: protectedProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await fetch(input.buffer);
        const str = await file.text();
        const edges = await parseCSVEdge(str);
        // console.log("creating edges");
        await ctx.db.edge.deleteMany();
        await ctx.db.edge.createMany({
          data: edges,
          skipDuplicates: true,
        });

        return { message: "Edges added" };
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error adding edges",
        });
      }
    }),

  csvExport: protectedProcedure.query(async ({ ctx }) => {
    // get all nodes
    const edgeStr = await exportEdgesToDb(ctx.db);
    const b64str = Buffer.from(edgeStr, "utf8").toString("base64");

    return b64str;
  }),

  createOne: protectedProcedure
    .input(ZCreateEdgeSchema)
    .mutation(async ({ input, ctx }) => {
      const data = [];
      data.push(
        await ctx.db.edge.create({
          data: {
            startNode: {
              connect: {
                id: input.startNodeId,
              },
            },
            endNode: {
              connect: {
                id: input.endNodeId,
              },
            },
          },
        }),
      );
      data.push(
        await ctx.db.edge.create({
          data: {
            startNode: {
              connect: {
                id: input.endNodeId,
              },
            },
            endNode: {
              connect: {
                id: input.startNodeId,
              },
            },
          },
        }),
      );
      return data;
    }),
  createMany: protectedProcedure
    .input(manySchema(ZCreateEdgeSchema))
    .mutation(async ({ input, ctx }) => {
      ctx.db.edge.createMany({
        data: input.data,
        skipDuplicates: true,
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.edge.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ startNodeId: z.string(), endNodeId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edge.findUnique({
        where: {
          edgeId: {
            startNodeId: input.startNodeId,
            endNodeId: input.endNodeId,
          },
        },
      });
    }),
  deleteOne: protectedProcedure
    .input(z.object({ startNodeId: z.string(), endNodeId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const data = [];
      data.push(
        await ctx.db.edge.delete({
          where: {
            edgeId: {
              startNodeId: input.startNodeId,
              endNodeId: input.endNodeId,
            },
          },
        }),
      );
      data.push(
        await ctx.db.edge.delete({
          where: {
            edgeId: {
              startNodeId: input.endNodeId,
              endNodeId: input.startNodeId,
            },
          },
        }),
      );
      return data;
    }),
  deleteMany: protectedProcedure
    .input(
      z.object({
        startNodeIds: z.array(z.string()),
        endNodeIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      for (let i = 0; i < input.startNodeIds.length; i++) {
        ctx.db.edge.delete({
          where: {
            edgeId: {
              startNodeId: input.startNodeIds[i],
              endNodeId: input.endNodeIds[i],
            },
          },
        });
      }
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.edge.deleteMany();
  }),
  updateOne: protectedProcedure
    .input(
      z.object({
        startNodeId: z.string(),
        endNodeId: z.string(),
        data: ZCreateEdgeSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.edge.update({
        where: {
          edgeId: {
            startNodeId: input.startNodeId,
            endNodeId: input.endNodeId,
          },
        },
        data: input.data,
      });
    }),
  updateMany: protectedProcedure
    .input(
      z.object({
        startNodeIds: z.array(z.string()),
        endNodeIds: z.array(z.string()),
        data: ZCreateEdgeSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      for (let i = 0; i < input.startNodeIds.length; i++) {
        ctx.db.edge.update({
          where: {
            edgeId: {
              startNodeId: input.startNodeIds[i],
              endNodeId: input.endNodeIds[i],
            },
          },
          data: input.data,
        });
      }
    }),
});
