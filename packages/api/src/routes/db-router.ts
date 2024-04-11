import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { parseCSVNode, parseCSVEdge } from "../../utils/csv-parsing.ts";
import {
  addEdgeDatabase,
  addNodeDatabase,
  createEdges,
  createNodes,
} from "../../utils/db.ts";
import { exportNodesToDb, exportEdgesToDb } from "../../utils/create-csv.ts";

export const dbRouter = router({
  csvUploadNodes: publicProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await fetch(input.buffer);
        const str = await file.text();
        const nodes = await parseCSVNode(str);
        console.log("creating nodes");
        await ctx.db.node.deleteMany();
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
  csvExportNodes: publicProcedure.query(async ({ ctx }) => {
    // get all nodes
    const nodeStr = await exportNodesToDb(ctx.db);
    const b64str = Buffer.from(nodeStr, "utf8").toString("base64");

    return b64str;
  }),
  csvExportEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    const edgesStr = await exportEdgesToDb(ctx.db);
    const b64str = Buffer.from(edgesStr, "utf8").toString("base64");

    return b64str;
  }),
  getAllNodes: publicProcedure.query(async ({ ctx }) => {
    // get all nodes
    return ctx.db.node.findMany();
  }),
  getAllEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    return ctx.db.edge.findMany();
  }),
  getNode: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // get a node
      return ctx.db.node.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getEdge: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // get an edge
      return ctx.db.edge.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  createNode: publicProcedure
    .input(
      z.object({
        id: z.string(),
        x: z.number(),
        y: z.number(),
        building: z.string(),
        floor: z.string(),
        type: z.string(),
        longName: z.string(),
        shortName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // create a node
      await addNodeDatabase(input, ctx.db);
      return { message: "Node added" };
    }),
  createManyNodes: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          x: z.number(),
          y: z.number(),
          building: z.string(),
          floor: z.string(),
          type: z.string(),
          longName: z.string(),
          shortName: z.string(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      // create many nodes
      await createNodes(input, ctx.db);
      return { message: "Nodes added" };
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
      const edgeId = `${input.startNodeId}_${input.endNodeId}`;
      const reverseEdgeId = `${input.endNodeId}_${input.startNodeId}`;
      await addEdgeDatabase(
        {
          startNodeId: input.startNodeId,
          endNodeId: input.endNodeId,
          id: edgeId,
        },
        ctx.db,
      );
      await addEdgeDatabase(
        {
          startNodeId: input.endNodeId,
          endNodeId: input.startNodeId,
          id: reverseEdgeId,
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
        const edgeId = `${edge.startNodeId}_${edge.endNodeId}`;
        const reverseEdgeId = `${edge.endNodeId}_${edge.startNodeId}`;
        await addEdgeDatabase(
          {
            startNodeId: edge.startNodeId,
            endNodeId: edge.endNodeId,
            id: edgeId,
          },
          ctx.db,
        );
        await addEdgeDatabase(
          {
            startNodeId: edge.endNodeId,
            endNodeId: edge.startNodeId,
            id: reverseEdgeId,
          },
          ctx.db,
        );
      }
      return { message: "Edges added" };
    }),
});
