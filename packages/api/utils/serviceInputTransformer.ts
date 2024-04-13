import { service } from "common";
import { Prisma } from "database";
import { z } from "zod";

export const transformCreateServiceInput = <T extends z.infer<typeof service>>(
  i: T,
) => {
  const { nodeId, priority, status, note, login, type, ...rest } = i;

  return {
    service: {
      create: {
        node: {
          connect: {
            id: nodeId,
          },
        },
        priority,
        type,
        status,
        note,
        login,
      },
    },
    ...rest,
  } satisfies { service: { create: Prisma.ServiceCreateInput } };
};
