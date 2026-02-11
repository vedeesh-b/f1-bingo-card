// actions/predictions.ts
"use server";

import { getSession } from "@/lib/session"; // Your helper
import { neon } from "@neondatabase/serverless";

export async function savePredictions(content: any) {
  // 1. Get User ID securely from the cookie
  const session = await getSession();

  if (!session || !session.userId) {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session.userId; // This is it!

  // 2. Save to DB
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    INSERT INTO predictions (user_id, content) 
    VALUES (${userId}, ${content})
    ON CONFLICT (user_id) DO UPDATE SET content = ${content}
  `;

  return { success: true };
}
