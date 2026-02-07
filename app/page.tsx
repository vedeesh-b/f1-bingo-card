import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import leclerc_24 from "@/public/leclerc_24.webp";
import piastri_24 from "@/public/piastri_24.webp";
import antonelli_25 from "@/public/antonelli_25.webp";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const images = [
    {
      src: leclerc_24.src,
      alt: "Charles Leclerc, Barcelona 2024",
      className: "rotate-[-5deg] left-70 bottom-20",
    },
    {
      src: piastri_24.src,
      alt: "Oscar Piastri, Barcelona 2024",
      className: "rotate-[8deg] top-30 left-50",
    },
    {
      src: antonelli_25.src,
      alt: "Kimi Antonelli, Japan 2025",
      className: "rotate-[-12deg] top-35 right-80",
    },
  ];

  return (
    <div className="flex h-screen w-full flex-row">
      <div className="flex flex-1 items-center justify-center">
        <DraggableCardContainer className="relative flex items-center justify-center">
          {images.map((image, index) => (
            <DraggableCardBody
              className={`p-0 rounded-xl w-60 min-h-80 h-80 overflow-hidden ${image.className}`}
              key={index}
            >
              <Image
                className="pointer-events-none relative z-10 h-100 w-full object-cover"
                src={image.src}
                alt={image.alt}
                fill
              />
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-8 z-0">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription className="flex flex-col gap-2 w-[85%]">
                <p>
                  Enter your email below. If you&apos;re on our list, we&apos;ll
                  send you a code to enter.
                </p>
                <p className="italic">Yep, we&apos;re that selective.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="username@example.com"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button asChild type="submit" className="w-full cursor-pointer">
                <Link href="validate-otp">Enter paddock</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
