import { service } from "common";
import { Prisma } from "database";
import { z } from "zod";

export const transformCreateServiceInput = <T extends z.infer<typeof service>>(
  i: T,
): T["data"] & { service: { create: Prisma.ServiceCreateInput } } => {
  const { nodeId, priority, status, note, type, login, data } = i;

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
    ...data,
  };
};
