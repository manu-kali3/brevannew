import { NextResponse } from "next/server";
import { checkDb } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Lightweight connectivity probe used by the client-side SystemStatusGate
 * (and any monitoring tools). Returns 200 when the database answers, 503
 * when it doesn't (unreachable Supabase, revoked keys, or env vars missing).
 */
export async function GET() {
  const ok = await checkDb();

  if (!ok) {
    return NextResponse.json(
      { ok: false, reason: "database-unreachable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { ok: true, reason: "ok" },
    { headers: { "Cache-Control": "no-store" } }
  );
}