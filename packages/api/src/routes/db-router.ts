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
  getAllNodes: publicProcedure.query(async ({ ctx }) => {
    // get all nodes
    return ctx.db.node.findMany();
  }),
  getAllEdges: publicProcedure.query(async ({ ctx }) => {
    // get all edges
    return ctx.db.edge.findMany();
  }),
  getNode: publicProcedure
    .input(z.object({ nodeId: z.string() }))
    .query(async ({ input, ctx }) => {
      // get a node
      return ctx.db.node.findUnique({
        where: {
          nodeId: input.nodeId,
        },
      });
    }),
  getEdge: publicProcedure
    .input(z.object({ edgeId: z.string() }))
    .query(async ({ input, ctx }) => {
      // get an edge
      return ctx.db.edge.findUnique({
        where: {
          edgeId: input.edgeId,
        },
      });
    }),
  createNode: publicProcedure
    .input(
      z.object({
        nodeId: z.string(),
        xcords: z.number(),
        ycords: z.number(),
        building: z.string(),
        floor: z.string(),
        nodeType: z.string(),
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
          nodeId: z.string(),
          xcords: z.number(),
          ycords: z.number(),
          building: z.string(),
          floor: z.string(),
          nodeType: z.string(),
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
      const edgeId = `${input.startNodeId}-${input.endNodeId}`;
      const reverseEdgeId = `${input.endNodeId}-${input.startNodeId}`;
      await addEdgeDatabase(
        {
          startNodeId: input.startNodeId,
          endNodeId: input.endNodeId,
          edgeId: edgeId,
        },
        ctx.db,
      );
      await addEdgeDatabase(
        {
          startNodeId: input.endNodeId,
          endNodeId: input.startNodeId,
          edgeId: reverseEdgeId,
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
        const edgeId = `${edge.startNodeId}-${edge.endNodeId}`;
        const reverseEdgeId = `${edge.endNodeId}-${edge.startNodeId}`;
        await addEdgeDatabase(
          {
            startNodeId: edge.startNodeId,
            endNodeId: edge.endNodeId,
            edgeId: edgeId,
          },
          ctx.db,
        );
        await addEdgeDatabase(
          {
            startNodeId: edge.endNodeId,
            endNodeId: edge.startNodeId,
            edgeId: reverseEdgeId,
          },
          ctx.db,
        );
      }
      return { message: "Edges added" };
    }),
});
