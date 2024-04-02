import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { AppRouter } from "./routes/AppRouter.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

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
        <Auth0Provider
          domain="dev-x61j30sgxmn7t3u3.us.auth0.com"
          clientId="a07mB0uQsSJDFjtRqBX7nNAzbDkWmUY5"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <AppRouter />
        </Auth0Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
