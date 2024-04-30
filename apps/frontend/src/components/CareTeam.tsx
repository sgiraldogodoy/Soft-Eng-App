import { trpc } from "@/utils/trpc";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Mail } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export function CareTeam() {
  const [me] = trpc.user.me.useSuspenseQuery();
  const pcpEmail = me?.patient?.pcp?.user?.email;
  const session = useAuth0();

  if (!me || !me.patient || !me.patient.pcp) {
    return (
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-xl">Contact your primary care provider</p>
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold">No PCP Assigned</div>
            <div className="text-gray-600">
              Please contact your healthcare provider to assign a PCP.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-3 w-full">
      <p className="text-xl">Contact your PCP</p>
      <Card className="w-full h-full">
        <CardContent className="pt-6 h-full flex items-center w-full justify-between">
          <div className="flex justify-start items-center w-full">
            <div className="flex justify-between items-center gap-6 w-full">
              <div className="flex gap-6">
                <img // Change for pcp's Auth0 profile picture
                  className="h-14 rounded-full object-contain hover:border border-slate-500 cursor-pointer"
                  src={session.user?.picture}
                />
                <div className="space-y-0.5">
                  <p className="text-lg font-bold">
                    Dr. {me?.patient?.pcp?.name}
                  </p>
                  <p className="text-gray-600">{me?.patient?.pcp?.jobTitle}</p>
                </div>
              </div>
              <Mail
                className="cursor-pointer"
                size={36}
                color="#2563eb"
                onClick={() => (window.location.href = `mailto:${pcpEmail}`)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
