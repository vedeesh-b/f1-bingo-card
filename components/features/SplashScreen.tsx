"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import logo from "@/public/logo.svg";

export default function SplashScreenWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {children}
    </>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [lights, setLights] = useState(0); // 0 to 5
  const [lightsOut, setLightsOut] = useState(false); // True when logo appears

  useEffect(() => {
    // 1. Turn on lights 1-5
    const interval = setInterval(() => {
      setLights((prev) => {
        if (prev < 5) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);

    // 2. WAIT for a moment with all 5 lights RED, then go "Lights Out"
    // 5 lights * 800ms = 4000ms. Add extra pause (e.g. 1000ms) before blacking out.
    const lightsOutTimer = setTimeout(() => {
      setLightsOut(true);
    }, 5000);

    // 3. Dismount component after logo has been shown for a bit
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 8500);

    return () => {
      clearInterval(interval);
      clearTimeout(lightsOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  // Helper to render a row of lights
  const LightRow = () => (
    <div className="flex gap-3 md:gap-4 bg-black p-2 md:p-3 rounded-lg border border-neutral-800">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-8 w-8 md:h-12 md:w-12 rounded-full border-2 border-neutral-800 transition-colors duration-100 ${
            lights >= i
              ? "bg-red-600 shadow-[0_0_25px_rgba(220,38,38,1)]"
              : "bg-neutral-900"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="relative flex flex-col items-center gap-8">
        {/* LIGHTS CONTAINER */}
        <AnimatePresence>
          {!lightsOut && (
            <motion.div
              exit={{ opacity: 0, scale: 0.9 }} // "Lights Out" effect
              transition={{ duration: 0.1 }} // Instant disappearance
              className="flex flex-col gap-2"
            >
              {/* Actual F1 Gantries have multiple rows */}
              <LightRow />
              {/* <LightRow /> Optional: Uncomment for double gantry look */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOGO REVEAL */}
        {lightsOut && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center text-center"
          >
            <Image src={logo} alt="GridLock Logo" height={80} width={80} />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 text-neutral-400 text-md md:text-lg font-mono tracking-wide"
            >
              Welcome to GridLock.
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
