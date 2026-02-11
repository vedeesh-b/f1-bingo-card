"use server";

import { neon } from "@neondatabase/serverless";
import nodemailer from "nodemailer";

// Initialize clients
const sql = neon(process.env.DATABASE_URL!);

export async function requestOtp(formData: FormData) {
  const email = formData.get("email") as string;
  console.log("Request OTP for email:", email);
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    // 1. CHECK: Is this person on the VIP list?
    // We strictly query 'allowed_users'. If they aren't there, we stop.
    const allowedUser = await sql`
      SELECT * FROM allowed_users WHERE email = ${email}
    `;
    console.log("Allowed user query result:", allowedUser);
    if (allowedUser.length === 0) {
      // SECURITY: Don't tell them they aren't invited. Just say "If you are invited, check email."
      // This prevents people from scraping your list to see who is on it.
      return {
        success: true,
        message: "If you are on the list, a code has been sent.",
      };
    }

    // 2. GENERATE: Create a 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins from now

    // 3. STORE: Save to DB
    await sql`
      INSERT INTO otp_codes (email, code, expires_at)
      VALUES (${email}, ${otp}, ${expiresAt})
    `;

    // 4. SEND: Email the code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: "GridLock <vedeeshb18@gmail.com>",
      to: email,
      subject: "Your F1 Bingo OTP",
      html: `<p>Your code is: <strong>${otp}</strong></p><p>It expires in 15 minutes.</p>`,
    });

    return { success: true, message: "Code sent! Check your inbox." };
  } catch (error) {
    console.error("Auth Error:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
