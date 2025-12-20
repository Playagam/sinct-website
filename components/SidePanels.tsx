"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const panelVariants = {
  hidden: { x: "-110%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 18, stiffness: 150 }
  },
  exit: {
    x: "-110%",
    opacity: 0,
    transition: { duration: 0.25 }
  }
};

const sins = [
  "pride",
  "greed",
  "lust",
  "envy",
  "gluttony",
  "wrath",
  "sloth"
];

export const SidePanels = () => {
  const [showLeft, setShowLeft] = useState(false);

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setShowLeft(true)}
        className="fixed top-28 left-4 z-30 glass px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em]"
      >
        7 sins
      </button>

      <AnimatePresence>
        {showLeft && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 w-80 z-40 glass p-6"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-3xl tracking-[0.2em] uppercase">
                seven sins
              </h3>
              <button
                onClick={() => setShowLeft(false)}
                className="text-xs uppercase tracking-widest text-smoke hover:text-white"
              >
                close
              </button>
            </div>

            {/* SIN LINKS */}
            <div className="flex flex-col space-y-3">
              {sins.map((sin) => (
                <Link
                  key={sin}
                  href={`/collection/${sin}`}
                  onClick={() => setShowLeft(false)}
                  className="border border-white/10 rounded-lg px-4 py-3 uppercase tracking-widest hover:bg-white/5 transition"
                >
                  {sin}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
