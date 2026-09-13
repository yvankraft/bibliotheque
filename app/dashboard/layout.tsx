export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

import { getSafeSession } from "@/app/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSafeSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-screen w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-400 flex font-sans selection:bg-[#d4af37]/30 overflow-hidden">
      <main className="flex-1 w-full h-full overflow-hidden">{children}</main>
    </div>
  );
}