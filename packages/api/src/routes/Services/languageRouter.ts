import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, interpreter } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const InterpreterRouter = router({
    createOne: protectedProcedure
        .input(
            baseService
                .extend({data: interpreter })
                .extend({type: z.literal("interpreter").default("interpreter")})
                .transform(transformCreateServiceInput)
        )
        .mutation(async ({ input, ctx}) => {
            console.log(input);
            return await ctx.db.interpreter.create({
                data: input,
            });
        }),

    deleteOne: protectedProcedure
        .input(z.object({id: z.string() }))
        .mutation(async ({input, ctx}) => {
            await ctx.db.interpreter.delete({
                where: {
                    id: {
                        in: input.id,
                    },
                },
            });
        }),
    deleteMany: protectedProcedure
        .input(z.object({ids: z.array(z.string()) }))
        .mutation(async ({input, ctx}) => {
            return ctx.db.interpreter.deleteMany({
                where: {
                    id: {
                        in: input.ids
                    },
                },
            });
        }),
    deleteAll: protectedProcedure.mutation(async ({ ctx}) => {
        return ctx.db.interpreter.deleteMany();
    }),


});

