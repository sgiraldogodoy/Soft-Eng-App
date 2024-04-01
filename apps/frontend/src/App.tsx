import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import AdminDashLink from "@/components/AdminDashLink.tsx";
import HeroSection from "@/components/HeroSection.tsx";
import MapButton from "@/components/MapButton.tsx";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HeroSection />
        <MapButton />
        <AdminDashLink />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
