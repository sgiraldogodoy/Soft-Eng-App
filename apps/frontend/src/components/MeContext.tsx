import { RouterOutput, trpc } from "@/utils/trpc";
import { FC, PropsWithChildren, createContext, useContext } from "react";

const MeContext = createContext<RouterOutput["user"]["me"] | null>(null);
export const useMe = () => useContext(MeContext);

export const MeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [me] = trpc.user.me.useSuspenseQuery();

  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
};
