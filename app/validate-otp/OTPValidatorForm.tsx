"use client";

import { verifyOtp } from "@/actions/otpValidator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OTPValidatorForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    if (email) formData.append("email", email);
    const result = await verifyOtp(formData);
    console.log("OTP verification result:", result);
    setLoading(false);

    if (result.success) {
      toast.success("Rolling you out to the grid.");
      redirect("/create-card");
    } else {
      toast.error(result.error || "OTP verification failed. Please try again.");
    }
  };

  if (!email) {
    return (
      <div className="z-0">Error: No email provided. Please login again.</div>
    );
  }

  return (
    <div className="min-h-dvh z-10 flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Validate your email</CardTitle>
          <CardDescription>
            Enter the unique OTP sent to {email}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Field>
                  <FieldLabel htmlFor="otp">One-Time Password</FieldLabel>
                  <InputOTP
                    maxLength={6}
                    id="otp"
                    pattern={REGEXP_ONLY_DIGITS}
                    name="otp"
                  >
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
              <Button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer"
              >
                {loading ? "Running checks..." : "Validate OTP"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
