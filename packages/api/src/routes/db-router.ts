import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { parseCSVEdge } from "../../utils/csv-parsing.ts";
import { addEdgeDatabase, createEdges } from "../../utils/db.ts";
import { exportEdgesToDb } from "../../utils/create-csv.ts";

export const dbRouter = router({
  csvUploadEdges: publicProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await fetch(input.buffer);
        const str = await file.text();
        const edges = await parseCSVEdge(str);
        await ctx.db.edge.deleteMany();
        await createEdges(edges, ctx.db);
        return { message: "Edges added" };
      } catch (e) {
        console.log(e);
        return { message: "Error adding edges" };
      }
    }),
  csvExportEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    const edgesStr = await exportEdgesToDb(ctx.db);
    const b64str = Buffer.from(edgesStr, "utf8").toString("base64");

    return b64str;
  }),
  getAllEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    return ctx.db.edge.findMany();
  }),
  getEdge: publicProcedure
    .input(z.object({ startNodeId: z.string(), endNodeId: z.string() }))
    .query(async ({ input, ctx }) => {
      // get an edge
      return await ctx.db.edge.findUnique({
        where: {
          edgeId: {
            startNodeId: input.startNodeId,
            endNodeId: input.endNodeId,
          },
        },
      });
    }),
  createEdge: publicProcedure
    .input(
      z.object({
        startNodeId: z.string(),
        endNodeId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // create an edge

      await addEdgeDatabase(
        {
          startNodeId: input.startNodeId,
          endNodeId: input.endNodeId,
        },
        ctx.db,
      );
      await addEdgeDatabase(
        {
          startNodeId: input.endNodeId,
          endNodeId: input.startNodeId,
        },
        ctx.db,
      );
      return { message: "Edge added" };
    }),

  createManyEdges: publicProcedure
    .input(
      z.array(
        z.object({
          startNodeId: z.string(),
          endNodeId: z.string(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      // create many edges
      for (const edge of input) {
        await addEdgeDatabase(
          {
            startNodeId: edge.startNodeId,
            endNodeId: edge.endNodeId,
          },
          ctx.db,
        );
        await addEdgeDatabase(
          {
            startNodeId: edge.endNodeId,
            endNodeId: edge.startNodeId,
          },
          ctx.db,
        );
      }
      return { message: "Edges added" };
    }),
});
