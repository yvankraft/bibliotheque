import { createAuthClient } from "better-auth/react";
import { useQuery } from "@tanstack/react-query";
import { withTimeout } from "./with-timeout";

// Pas de baseURL : le client appelle l'API sur la même origine
// (un NEXT_PUBLIC_APP_URL obsolète casse tout si le port change)
export const authClient = createAuthClient({
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 0,
  },
});

export function useAuthSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const { data, error } = await withTimeout(authClient.getSession());
      if (error) throw error;
      return data ?? null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
