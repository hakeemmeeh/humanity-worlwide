import dynamic from "next/dynamic";

const DynamicLeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="relative mx-auto w-full rounded-2xl bg-white p-6 shadow-card border border-sand-deep/40">
      <div className="h-[400px] w-full animate-pulse bg-sand/30 rounded-xl flex items-center justify-center text-navy/50 text-sm">
        Loading Interactive Map...
      </div>
    </div>
  ),
});

export function RegionMap() {
  return <DynamicLeafletMap />;
}
