import { ZCreateRecordSchema, ZUpdateVitalsSchema } from "common";
import { protectedProcedure, router } from "../../trpc";
import { nestSchema } from "common/src/zod-utils";
import { z } from "zod";

export const vitalsRouter = router({
  create: protectedProcedure
    .input(
      ZUpdateVitalsSchema.extend({ record: nestSchema(ZCreateRecordSchema) }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.vitals.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(z.object({ data: ZUpdateVitalsSchema, id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.vitals.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),
});
