"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { sins } from "@/lib/products";

const dropdownVariants = {
  hidden: { y: -8, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 260 }
  },
  exit: { y: -8, opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
};

export const SidePanels = () => {
  const [open, setOpen] = useState(false);
  const [sinsOpen, setSinsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setOpen(false);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="left-nav-dropdown"
        onClick={() => setOpen((v) => !v)}
        className="fixed top-28 left-4 z-30 glass h-10 w-10 rounded-full grid place-items-center"
      >
        <span className="sr-only">Open menu</span>
        <span className="flex flex-col gap-1">
          <span className="block h-[2px] w-5 bg-white/90" />
          <span className="block h-[2px] w-5 bg-white/90" />
          <span className="block h-[2px] w-5 bg-white/90" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.div
              id="left-nav-dropdown"
              role="menu"
              aria-label="Site navigation"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-[7.5rem] left-4 z-[100] glass w-56 rounded-2xl p-2"
            >
              <button
                type="button"
                role="menuitem"
                aria-expanded={sinsOpen}
                onClick={() => setSinsOpen((v) => !v)}
                className="w-full text-left rounded-xl px-4 py-3 uppercase tracking-widest text-xs hover:bg-white/5 transition border border-transparent hover:border-white/10 flex items-center justify-between"
              >
                <span>7 sins</span>
                <span className="text-smoke/80">{sinsOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {sinsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-2">
                      {sins.map((sin) => (
                        <div key={sin} className="mt-2 rounded-xl border border-white/10 bg-black/10">
                          <Link
                            href={`/collection/${sin}`}
                            onClick={closeMenu}
                            role="menuitem"
                            className="block px-3 pt-3 uppercase tracking-widest text-[11px] hover:text-white text-smoke/90"
                          >
                            {sin}
                          </Link>
                          <Link
                            href={`/collection/${sin}`}
                            onClick={closeMenu}
                            role="menuitem"
                            className="block px-3 pb-3 text-[11px] text-smoke/70 hover:text-white/90"
                          >
                            Hoodies →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/about"
                onClick={closeMenu}
                role="menuitem"
                className="block rounded-xl px-4 py-3 uppercase tracking-widest text-xs hover:bg-white/5 transition border border-transparent hover:border-white/10"
              >
                About us
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                role="menuitem"
                className="block rounded-xl px-4 py-3 uppercase tracking-widest text-xs hover:bg-white/5 transition border border-transparent hover:border-white/10"
              >
                Contact us
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};