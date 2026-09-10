import { createAuthClient } from "better-auth/react";
import { useQuery } from "@tanstack/react-query";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
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
      const { data, error } = await authClient.getSession();
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
