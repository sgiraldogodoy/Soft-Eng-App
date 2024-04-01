import { publicProcedure } from "../trpc";
import { router } from "../trpc";

export const baseRouter = router({
  hello: publicProcedure.query(() => {
    return {
      message: "hello",
    };
  }),
});

