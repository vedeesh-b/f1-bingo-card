"use server";

import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-dev-secret",
);

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value; // Matching the name from Step 5

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { userId: string; email: string };
  } catch (err) {
    return null;
  }
}
