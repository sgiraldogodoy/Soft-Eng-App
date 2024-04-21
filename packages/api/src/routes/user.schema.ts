import { baseUser } from "common";
import { z } from "zod";

export const userCreate = baseUser.extend({
  id: z.undefined(),
  sub: z.string(),
});
