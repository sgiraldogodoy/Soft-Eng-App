import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { Suspense, useMemo, useState } from "react";
import { trpc } from "./utils/trpc";
import { Toaster } from "./components/ui/sonner.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { AppRouter } from "@/routes/AppRouter.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { WarningProvider } from "@/components/providers/warning-provider.tsx";
import { MeProvider } from "./components/MeContext.tsx";
import { LoadingSpinner } from "./components/ui/loader.tsx";

export default function App() {
  const session = useAuth0();
  session.getAccessTokenWithPopup;

  const token = useMemo(async () => {
    try {
      return await session.getAccessTokenSilently();
    } catch {
      return "";
    }
  }, [session]);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          async headers() {
            return {
              authorization: await token,
            };
          },
        }),
      ],
    }),
  );

  return (
    <WarningProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <MeProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster />
              <TooltipProvider>
                <AppRouter />
              </TooltipProvider>
            </QueryClientProvider>
          </MeProvider>
        </Suspense>
      </trpc.Provider>
    </WarningProvider>
  );
}
