"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_SHOW_MS = 2000; // 2 rotations @ 1s each

export default function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_SHOW_MS - elapsed);

      window.setTimeout(() => {
        setFade(true);
        window.setTimeout(() => setVisible(false), 250);
      }, remaining);
    };

    // If already loaded, finish ASAP (respecting MIN_SHOW_MS)
    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] grid place-items-center bg-night/95 backdrop-blur-sm transition-opacity duration-200",
        fade ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-label="Loading"
      role="status"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <Image
          src="/logo.png"
          alt="SINƇT"
          fill
          priority
          className="object-contain sinct-logo-spin"
        />
      </div>
    </div>
  );
}

