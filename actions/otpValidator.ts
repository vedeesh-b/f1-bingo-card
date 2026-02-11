"use server";

import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const sql = neon(process.env.DATABASE_URL!);
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-dev-secret",
);

export async function verifyOtp(formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("otp") as string;

  if (!email || !code) return { success: false, error: "Missing fields" };

  try {
    // 1. FETCH OTP: Find the exact code for this email
    // We check 3 things: Email matches, Code matches, NOT used, NOT expired
    const validOtps = await sql`
      SELECT * FROM otp_codes 
      WHERE email = ${email} 
      AND code = ${code}
      AND used = FALSE
      AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (validOtps.length === 0) {
      return { success: false, error: "Invalid or expired code." };
    }

    // 2. MARK USED: Prevent replay attacks
    await sql`
      UPDATE otp_codes 
      SET used = TRUE 
      WHERE id = ${validOtps[0].id}
    `;

    // 3. GET/CREATE USER:
    // Check if user exists. If not, create them.
    let user = await sql`SELECT id FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      // Create new user
      user = await sql`
        INSERT INTO users (email) 
        VALUES (${email}) 
        RETURNING id
      `;
    }

    const userId = user[0].id;

    // 4. CREATE SESSION: Sign a JWT
    const token = await new SignJWT({ userId, email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1y") // 1 Year Persistent Login
      .sign(SECRET_KEY);

    // 5. SET COOKIE
    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true, // JS cannot access (security)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 31536000, // 1 year in seconds
      path: "/",
    });

    return { success: true };
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return { success: false, error: "Database error during verification." };
  }
}
