"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="w-full max-w-sm z-0">
      <CardHeader>
        <CardTitle>Validate your email</CardTitle>
        <CardDescription>
          Enter the unique OTP sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Field>
                <FieldLabel htmlFor="otp">One-Time Password</FieldLabel>
                <InputOTP maxLength={6} id="otp" pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </Field>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button asChild type="submit" className="w-full cursor-pointer">
          <Link href="/create-card">Validate OTP</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
