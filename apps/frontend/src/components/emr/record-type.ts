import type { RouterOutput } from "@/utils/trpc";

export type RouterRecord = NonNullable<RouterOutput["record"]["getOne"]>;
