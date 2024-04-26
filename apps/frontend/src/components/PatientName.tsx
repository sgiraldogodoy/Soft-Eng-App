import { trpc } from "@/utils/trpc.ts";

export default function PatientName() {
  const [me] = trpc.user.me.useSuspenseQuery();

  return <p className="text-xl font-semibold">{me?.name}</p>;
}
