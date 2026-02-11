import { getSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import CardEditor from "./CardEditor";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  const sql = neon(process.env.DATABASE_URL!);
  const predictions = await sql`
    SELECT id FROM predictions WHERE user_id = ${session.userId} LIMIT 1
  `;

  if (predictions.length > 0) {
    redirect("/view-predictions");
  }

  return <CardEditor />;
}
