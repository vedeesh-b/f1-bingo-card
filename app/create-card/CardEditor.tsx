"use client";

import { savePredictions } from "@/actions/predictions";
import PredictionSheet from "@/components/features/PredictionSheet";
import { Button } from "@/components/ui/button";
import { usePredictionParser } from "@/hooks/usePredictionParser";
import { redirect } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

export default function CardEditor() {
  const { parseAndValidate, error } = usePredictionParser();
  const [code, setCode] = useState(
    `// TIER 1: Expected. 2025 example: Doohan getting replaced mid-season. [1 point]\n- \n- \n- \n- \n\n// TIER 2: Reasonable. 2025 example: A rookie crashing out in Australia. [2 points]\n- \n- \n- \n- \n\n// TIER 3: Now we're talking. 2025 example: Lance Stroll failing to get out of Q1 >40% of the time. [4 points]\n- \n- \n- \n- \n\n// TIER 4: No way fam. 2025 example: Nico Hülkenberg earning his first career podium. [6 points]\n- \n- \n- \n- \n`,
  );

  const handleSubmit = () => {
    const result = parseAndValidate(code);
    if (!result.success) {
      toast.error(result.error || "Invalid predictions format.");
      return;
    }
    console.log("Parsed Predictions:", result.data);
    savePredictions(result.data);
    toast.success("Predictions saved successfully.");
    redirect("/view-predictions");
  };

  return (
    <div className="flex flex-col min-h-dvh w-2xl items-center justify-center z-0 gap-6 py-30 p-6">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-400 pb-2">
          2026 F1 Predictions
        </h1>
        <p className="text-gray-500">
          Fill out your predictions for the 2026 season in the slots below. Four
          entries per tier, with each correct prediction earning the points
          mentioned in the tier.
        </p>
      </div>
      <PredictionSheet code={code} setCode={setCode} />
      <div className="w-full flex justify-end">
        <Button className="px-6 font-medium" onClick={handleSubmit}>
          Lock them in
        </Button>
      </div>
    </div>
  );
}
