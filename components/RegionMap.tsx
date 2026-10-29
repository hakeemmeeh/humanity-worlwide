"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function MapPlaceholder() {
  return (
    <div className="relative mx-auto w-full rounded-2xl bg-white p-6 shadow-card border border-sand-deep/40">
      <div className="h-[400px] w-full animate-pulse bg-sand/30 rounded-xl flex items-center justify-center text-navy/75 text-sm">
        Loading Interactive Map...
      </div>
    </div>
  );
}

const DynamicLeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: MapPlaceholder,
});

/** Loads the map's code and tiles only when the visitor scrolls near it, so the page opens faster. */
export function RegionMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect(); } },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return <div ref={ref}>{show ? <DynamicLeafletMap /> : <MapPlaceholder />}</div>;
}
