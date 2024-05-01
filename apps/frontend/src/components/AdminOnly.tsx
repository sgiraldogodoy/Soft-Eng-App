import { FC, PropsWithChildren } from "react";
import { useMe } from "./MeContext";
import { Redirect } from "wouter";

export const AdminOnly: FC<PropsWithChildren> = ({ children }) => {
  const me = useMe();

  if (!me || me.role !== "admin") {
    return <Redirect to="~/pathfind" />;
  }

  return <>{children}</>;
};
