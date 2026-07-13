"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Info, Navigation } from "lucide-react";

export default function LeafletMap() {
  const [mounted, setMounted] = useState(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    // Only configure Leaflet icon on the client
    const icon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    setCustomIcon(icon);
    setMounted(true);
  }, []);

  const markers = [
    {
      name: "Sudan Operations",
      lat: 15.5007,
      lng: 32.5599,
      href: "/where-we-work#sudan",
      details: "Emergency response & displaced support",
      capital: "Khartoum Hub",
      stats: "2 Active Programs",
    },
    {
      name: "South Sudan Operations",
      lat: 4.8594,
      lng: 31.5713,
      href: "/where-we-work#south-sudan",
      details: "7 Offices, 12 Classrooms Built",
      capital: "Juba HQ",
      stats: "4 Active Programs",
    },
    {
      name: "Somalia Operations",
      lat: 2.0469,
      lng: 45.3182,
      href: "/where-we-work#somalia",
      details: "Nutrition & resilience projects",
      capital: "Mogadishu Hub",
      stats: "3 Active Programs",
    },
  ];

  if (!mounted || !customIcon) {
    return (
      <div className="relative mx-auto w-full rounded-2xl bg-white p-6 shadow-card border border-sand-deep/40">
         <div className="h-[400px] w-full animate-pulse bg-sand/30 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full rounded-2xl bg-white p-6 shadow-card border border-sand-deep/40">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-teal" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy/80">
            Interactive Operational Map
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-ink/50 bg-sand px-2 py-0.5 rounded-full">
          <Info className="h-3 w-3 text-teal" />
          Click pins for details
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-sand/60 h-[400px] z-0">
        <MapContainer 
          center={[9.0, 36.0]} 
          zoom={4} 
          scrollWheelZoom={false} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lng]} icon={customIcon}>
              <Popup>
                <div className="text-sm p-1">
                  <h3 className="font-bold text-navy mb-1">{m.name}</h3>
                  <p className="text-xs text-ink/70 mb-1">{m.details}</p>
                  <p className="text-xs font-semibold text-teal mb-2">{m.stats}</p>
                  <a href={m.href} className="text-coral text-xs hover:underline inline-block font-medium">Learn more &rarr;</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
