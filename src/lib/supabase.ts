import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

export interface LeadInput {
  type: "quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  service?: string;
  message?: string;
}

export async function storeLead(input: LeadInput): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("leads").insert([input]);
  if (error) {
    console.error("Supabase insert error:", error.message);
    return false;
  }
  return true;
}
