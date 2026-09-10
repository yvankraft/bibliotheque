import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // La cascade Prisma supprime automatiquement sessions, comptes, favoris et commandes
  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ success: true }, { status: 200 });
}
