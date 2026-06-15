"use client";

import { useEffect } from "react";
import { refreshScrollTriggers } from "@/lib/motion";

export default function ScrollRefresh() {
  useEffect(() => {
    refreshScrollTriggers();

    const onLoad = () => refreshScrollTriggers();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onLoad);

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onLoad);
    };
  }, []);

  return null;
}
