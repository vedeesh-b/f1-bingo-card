"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type User = {
  name: string;
  email: string;
  content: string;
};

export default function UserCard({ user }: { user: User }) {
  const parsedContent =
    typeof user.content === "string" ? JSON.parse(user.content) : user.content;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="bg-black py-9 border hover:cursor-pointer hover:bg-neutral-900">
            <CardHeader>
              <div className="flex items-center justify-center pb-4">
                <img
                  src={`https://api.dicebear.com/9.x/glass/svg?radius=50&backgroundType=solid,gradientLinear&seed=${user.email}`}
                  alt={user.name}
                  className="w-16 h-16 brightness-75"
                />
              </div>
              <CardTitle className="text-center">{user.name}</CardTitle>
            </CardHeader>
          </Card>
        </DialogTrigger>

        <DialogContent className="bg-black text-white md:min-w-2xl w-full max-h-[85vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{user.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-900 rounded-md">
              {Object.entries(parsedContent).map(([tier, predictions]) => (
                <div key={tier}>
                  <h3 className="text-lg font-semibold mb-2 capitalize border-b border-zinc-800 pb-2">
                    {tier}
                  </h3>

                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300 pb-4">
                    {(predictions as any[]).map((item, index) => (
                      <li key={index}>{item.prediction}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
