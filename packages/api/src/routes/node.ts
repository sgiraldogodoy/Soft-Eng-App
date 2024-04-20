import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { parseCSVNode } from "../../utils/csv-parsing.ts";
import { exportNodesToDb } from "../../utils/create-csv.ts";
import {
  Context,
  aStar,
  breadthFirstSearch,
  depthFirstSearch,
} from "../../utils/PathFinding.ts";
import { node } from "common";
import { TRPCError } from "@trpc/server";

const myPathFinding: Context = new Context();
myPathFinding.setPathFindingAlg = new aStar();

export const Node = router({
  csvUpload: protectedProcedure
    .input(z.object({ buffer: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const file = await fetch(input.buffer);
        const str = await file.text();
        const nodes = await parseCSVNode(str);
        console.log("creating nodes");
        await ctx.db.node.deleteMany();
        await ctx.db.node.createMany({
          data: nodes,
          skipDuplicates: true,
        });

        return { message: "Nodes added" };
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error adding nodes",
        });
      }
    }),
  csvExport: protectedProcedure.query(async ({ ctx }) => {
    // get all nodes
    const nodeStr = await exportNodesToDb(ctx.db);
    const b64str = Buffer.from(nodeStr, "utf8").toString("base64");

    return b64str;
  }),
  findPath: publicProcedure
    .input(
      z.object({
        startNodeId: z.string(),
        endNodeId: z.string(),
        algorithm: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.algorithm === "DFS") {
        myPathFinding.setFindPathAlg(new depthFirstSearch());
      } else if (input.algorithm === "BFS") {
        myPathFinding.setFindPathAlg(new breadthFirstSearch());
      } else if (input.algorithm === "DIJ") {
        myPathFinding.setFindPathAlg(new aStar());
      } else myPathFinding.setFindPathAlg(new aStar());

      return await myPathFinding.run(
        input.startNodeId,
        input.endNodeId,
        ctx.db,
        input.algorithm === "DIJ",
      );
    }),
  createOne: protectedProcedure
    .input(
      z.object({ data: node.omit({ id: true }), id: z.string().optional() }),
    )
    .mutation(async ({ input, ctx }) => {
      let nodeId = "";
      let number = "";
      if (input.id) {
        nodeId = input.id;
      } else if (input.data.elevatorLetter) {
        if (input.data.type === "ELEV") {
          const pattern = /^[A-Z]*$/;
          if (!pattern.test(input.data.elevatorLetter)) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Elevators must be a Capital letter",
            });
          }
          number = "00" + input.data.elevatorLetter;
        } else {
          const occurences = await ctx.db.node.findMany({
            where: {
              type: input.data.type,
              floor: input.data.floor,
            },
          });

          //count number of nodes with the same type
          const numOccurences = 3 - occurences.length.toString().length;
          number = "0".repeat(numOccurences) + occurences.length.toString();
        }
        const prefixFloor = input.data.floor.length === 1 ? "0" : "";
        const floor = prefixFloor + input.data.floor;
        nodeId = "q" + input.data.type + number + floor;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Node must have a elevator number or an id",
        });
      }
      const data = {
        id: nodeId,
        x: input.data.x,
        y: input.data.y,
        building: input.data.building,
        floor: input.data.floor,
        type: input.data.type,
        longName: input.data.longName,
        shortName: input.data.shortName,
      };
      //check if node exists
      const exists = await ctx.db.node.findUnique({
        where: {
          id: nodeId,
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Node already exists",
        });
      }
      return ctx.db.node.create({
        data: data,
      });
    }),

  createMany: protectedProcedure
    .input(z.object({ data: z.array(node) }))
    .mutation(async ({ input, ctx }) => {
      ctx.db.node.createMany({
        data: input.data,
        skipDuplicates: true,
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.node.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.node.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.node.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.node.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.node.deleteMany();
  }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), data: node.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.node.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()), data: node.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.node.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),
});
