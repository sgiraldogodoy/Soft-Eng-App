import { trpc } from "@/utils/trpc.ts";

export default function PatientName() {
  const [me] = trpc.user.me.useSuspenseQuery();

  return <p className="text-2xl font-semibold">{me?.name}</p>;
}
