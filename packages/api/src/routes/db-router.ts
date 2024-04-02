import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { parseCSVNode, parseCSVEdge } from "../../utils/csv-parsing.ts";
import { createEdges, createNodes } from "../../utils/db.ts";
import { exportNodesToDb, exportEdgesToDb } from "../../utils/create-csv.ts";

export const csvAPIRouter = router({
  csvUploadNodes: publicProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("parsing nodes");
        const nodes = await parseCSVNode(input.buffer);
        console.log("creating nodes");
        await createNodes(nodes, ctx.db);
        return { message: "Nodes added" };
      } catch (e) {
        console.log(e);
        return { message: "Error adding nodes" };
      }
    }),
  csvUploadEdges: publicProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const edges = await parseCSVEdge(input.buffer, ctx.db);
        await createEdges(edges, ctx.db);
        return { message: "Edges added" };
      } catch (e) {
        console.log(e);
        return { message: "Error adding edges" };
      }
    }),
  csvExportNodes: publicProcedure.query(async ({ ctx }) => {
    // get all nodes
    return exportNodesToDb(ctx.db);
  }),
  csvExportEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    return exportEdgesToDb(ctx.db);
  }),
});
