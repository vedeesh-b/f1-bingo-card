import UserCard, { User } from "@/components/features/UserCard";
import { getSession } from "@/lib/session";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  const sql = neon(process.env.DATABASE_URL!);
  const results = await sql`
    SELECT 
        au.name,
        au.email,
        p.content
    FROM predictions p
    JOIN users u ON p.user_id = u.id          
    JOIN allowed_users au ON u.email = au.email 
    ORDER BY au.name ASC
`;
  const users = results as User[];

  console.log(results);
  return (
    <div className="w-2xl h-full z-0 overflow-y-scroll py-40 px-8 md:py-50">
      <h1 className="px-4 md:px-0 md:text-3xl text-2xl font-semibold text-gray-400 md:pb-8 pb-6">
        Pitwall
      </h1>
      <div className="grid grid-cols-2  md:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <UserCard user={user} key={i} />
        ))}
      </div>
    </div>
  );
}
