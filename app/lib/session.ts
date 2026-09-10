import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSafeSession() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return session ?? null;
  } catch (error) {
    console.warn("Impossible de récupérer la session", error);
    return null;
  }
}

export function hasAdminRole(role?: string | null) {
  return ["PROPRIETAIRE", "VENDEUR"].includes(role ?? "");
}

export function hasUserSession(session: unknown) {
  return Boolean((session as { user?: { id?: string } } | null)?.user?.id);
}
