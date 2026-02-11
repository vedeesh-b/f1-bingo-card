import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import Image, { StaticImageData } from "next/image";
import { getKeywordImage } from "@/lib/imageMap";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import Link from "next/link";

interface PredictionViewProps {
  data: {
    [username: string]: {
      tier1: Array<{ prediction: string; keywordFound: string }>;
      tier2: Array<{ prediction: string; keywordFound: string }>;
      tier3: Array<{ prediction: string; keywordFound: string }>;
      tier4: Array<{ prediction: string; keywordFound: string }>;
    };
  };
}

const TIER_POINTS = {
  tier1: 1,
  tier2: 2,
  tier3: 4,
  tier4: 6,
};

type TierItemProps = {
  img: StaticImageData;
  alt: string;
  description: string;
};

const TierItem = ({ img, alt, description }: TierItemProps) => {
  return (
    <Item variant="muted" className="flex items-start gap-3">
      <ItemHeader className="pb-4">
        <Image
          src={img}
          height={40}
          width={40}
          alt={alt}
          className="aspect-square rounded-sm object-cover border-2 border-neutral-600"
        />
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="tracking-tight">{description}</ItemTitle>
      </ItemContent>
    </Item>
  );
};

export default async function Page({ data }: PredictionViewProps) {
  const tiers = ["tier1", "tier2", "tier3", "tier4"] as const;
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    SELECT content FROM predictions
    WHERE user_id = ${session.userId}
  `;

  if (result.length === 0) {
    return (
      <div>
        No predictions found. Make them <Link href={"/create-card"}>here</Link>
        .{" "}
      </div>
    );
  }

  const predictions = result[0].content;

  return (
    <div className="w-2xl h-full z-0 overflow-y-scroll py-30">
      <h1 className="px-4 md:px-0 md:text-3xl text-2xl font-semibold text-gray-400 md:pb-10 pb-4">
        Your Predictions
      </h1>
      <div className="flex flex-col gap-6">
        {tiers.map((tierKey) => (
          <Card key={tierKey} className="bg-black border-neutral-800">
            <CardHeader>
              <CardTitle className="flex flex-row items-center capitalize">
                {tierKey.replace("tier", "Tier ")}
                <Badge
                  variant="outline"
                  className="ml-4 p-2.5 rounded-sm text-neutral-500 border-neutral-700"
                >
                  {TIER_POINTS[tierKey] === 1
                    ? "1 point"
                    : TIER_POINTS[tierKey] + " points"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {/* 7. Map the dynamic data */}
              {predictions[tierKey]?.map((item: any, idx: number) => (
                <TierItem
                  img={getKeywordImage(item.keywordFound)}
                  alt={item.keywordFound || "F1"}
                  description={item.prediction}
                  key={idx}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
