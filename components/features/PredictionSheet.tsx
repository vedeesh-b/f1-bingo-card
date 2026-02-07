"use client";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism-dark.css";
import { Dispatch, SetStateAction } from "react";

const predictionGrammar = {
  comment: {
    pattern: /\/\/.*$/m,
    greedy: true,
  },
  bullet: {
    pattern: /^\s*-\s.*$/m,
    color: "white",
  },
  tierHeader: {
    pattern: /TIER \d+:/,
    alias: "keyword",
  },
};

export default function PredictionSheet({
  code,
  setCode,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full max-w-2xl rounded-xl border border-border bg-black/50 p-6 backdrop-blur-sm h-120 w-full overflow-y-auto overflow-x-hidden">
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, predictionGrammar, "f1-bingo")}
        padding={10}
        textareaClassName="focus:outline-none"
        style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 14,
          backgroundColor: "transparent",
          minHeight: "480px",
        }}
        className="font-mono text-sm leading-relaxed tracking-wide text-foreground"
      />

      <style jsx global>{`
        /* Style the 'comment' token (the // lines) */
        .token.comment {
          color: #6b7280; /* text-gray-500 */
          font-style: italic;
        }

        /* Style the 'bullet' token (the - lines) */
        /* This ensures the user's actual predictions stand out */
        .token.bullet {
          color: #ffffff;
          font-weight: 500;
        }

        /* Style the TIER headers if you aliased them to keyword */
        .token.keyword {
          color: #ef4444; /* red-500 (F1 Red) */
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
