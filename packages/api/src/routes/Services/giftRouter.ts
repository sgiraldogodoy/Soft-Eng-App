import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, gift } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const GiftRouter = router({
  createOne: publicProcedure
    .input(
      baseService
        .extend({ data: gift, type: z.literal("GIFT").default("GIFT") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.gift.create({
        data: input,
      });
    }),
});
