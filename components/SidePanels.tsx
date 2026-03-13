"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const panelVariants = {
  hidden: { x: "-110%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 160 }
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

  const closePanel = () => setShowLeft(false);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
            />

            {/* PANEL */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] z-[100] glass p-6 flex flex-col"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-3xl tracking-[0.2em] uppercase">
                  seven sins
                </h3>

                <button
                  onClick={closePanel}
                  className="text-xs uppercase tracking-widest text-smoke hover:text-white"
                >
                  close
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-col space-y-3">
                {sins.map((sin) => (
                  <Link
                    key={sin}
                    href={`/collection/${sin}`}
                    onClick={closePanel}
                    className="border border-white/10 rounded-lg px-4 py-3 uppercase tracking-widest hover:bg-white/5 transition"
                  >
                    {sin}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};