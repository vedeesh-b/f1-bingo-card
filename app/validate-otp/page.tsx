import { redirect } from "next/navigation";

import OTPValidatorForm from "./OTPValidatorForm";
import { getSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";

export default async function Page() {
  const session = await getSession();
  if (session) {
    const sql = neon(process.env.DATABASE_URL!);
    // Check if they have predictions
    const predictions = await sql`
        SELECT id FROM predictions WHERE user_id = ${session.userId} LIMIT 1
      `;

    if (predictions.length > 0) {
      redirect("/view-predictions");
    } else {
      redirect("/create-card");
    }
  }

  return <OTPValidatorForm />;
}
