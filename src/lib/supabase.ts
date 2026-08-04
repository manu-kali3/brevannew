import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

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

export interface EmailRecord {
  type: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  delivered: boolean;
}

export async function storeEmail(input: EmailRecord): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("emails").insert([
    {
      type: input.type,
      from_address: input.from,
      to_address: input.to,
      subject: input.subject,
      body: input.body,
      delivered: input.delivered,
    },
  ]);
  if (error) {
    console.error("Supabase email log error:", error.message);
    return false;
  }
  return true;
}

/** Adds (or re-subscribes) an email to the events portal subscriber list. */
export async function addSubscriber(input: {
  email: string;
  name?: string;
  source?: "signup" | "booking" | "newsletter" | "admin";
}): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("subscribers").upsert(
    {
      email: input.email.trim().toLowerCase(),
      name: input.name?.trim() || null,
      source: input.source ?? "newsletter",
      unsubscribed_at: null,
    },
    { onConflict: "email" }
  );
  if (error) {
    console.error("Supabase subscriber upsert error:", error.message);
    return false;
  }
  return true;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  venue: string | null;
  image_url: string | null;
  is_online: boolean;
  is_paid: boolean;
  ticket_price_kes: number | null;
  created_at: string;
}

async function loadEvents(): Promise<Event[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("events")
    .select(
      "id,title,description,event_date,event_time,venue,image_url,is_online,is_paid,ticket_price_kes,created_at"
    )
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Supabase events query error:", error.message);
    return [];
  }

  return (data ?? []) as Event[];
}

/** Cached events list (ISR) so the site never blocks on a DB round trip. */
export const listEvents = unstable_cache(loadEvents, ["site-events"], {
  revalidate: 120,
  tags: ["site-events"],
});

export interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
  created_at: string;
}

async function loadProjects(): Promise<Project[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,description,image_url,project_url,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase projects query error:", error.message);
    return [];
  }

  return (data ?? []) as Project[];
}

/** Cached projects list (ISR) so the site never blocks on a DB round trip. */
export const listProjects = unstable_cache(loadProjects, ["site-projects"], {
  revalidate: 300,
  tags: ["site-projects"],
});
