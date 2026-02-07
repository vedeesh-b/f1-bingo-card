import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import leclerc from "@/public/keywordImages/leclerc.jpg";

export default function Page() {
  return (
    <div className="w-2xl z-0 overflow-y-scroll p-6">
      <h1 className="text-3xl font-semibold text-gray-400 pb-2">
        Your Predictions
      </h1>
      <Card className="bg-black">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            Tier 1
            <Badge
              variant="outline"
              className="ml-4 p-2.5 rounded-sm text-neutral-500"
            >
              1 point
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Item variant="muted" className="flex items-start">
            <ItemHeader className="pb-4">
              <Image
                src={leclerc}
                height={40}
                width={40}
                alt="Leclerc"
                className="aspect-square rounded-sm object-cover border-2 border-neutral-600"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle className="tracking-tight">
                Charles Leclerc finishes second in the championship.
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="muted" className="flex items-start">
            <ItemHeader className="pb-4">
              <Image
                src={leclerc}
                height={40}
                width={40}
                alt="Leclerc"
                className="aspect-square rounded-sm object-cover border-2 border-neutral-600"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle className="tracking-tight">
                Charles Leclerc finishes second in the championship.
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="muted" className="flex items-start">
            <ItemHeader className="pb-6">
              <Image
                src={leclerc}
                height={40}
                width={40}
                alt="Leclerc"
                className="aspect-square rounded-sm object-cover border-2 border-neutral-600"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle className="tracking-tight">
                Charles Leclerc finishes second in the championship.
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="muted" className="flex items-start">
            <ItemHeader className="pb-6">
              <Image
                src={leclerc}
                height={40}
                width={40}
                alt="Leclerc"
                className="aspect-square rounded-sm object-cover border-2 border-neutral-600"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle className="tracking-tight">
                Charles Leclerc finishes second in the championship.
              </ItemTitle>
            </ItemContent>
          </Item>
        </CardContent>
      </Card>
    </div>
  );
}
