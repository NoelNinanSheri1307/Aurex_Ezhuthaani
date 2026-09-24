"use client";

import { useEffect, useRef, useState } from "react";
import { MapLocationItem } from "@/lib/types";
import { TNDistrict } from "@/lib/tnDistrictsData";
import { HistoricalEra, HistoricalKingdomRegion } from "@/lib/historicalKingdomsData";
import { generateRaggedPolygon } from "@/lib/geoUtils";
import Link from "next/link";
import { MapPin, ArrowRight, Shield, Crown, Building2, Map as MapIcon, Image as ImageIcon } from "lucide-react";

export type MapMode = "sites" | "districts" | "kingdoms";

interface MapContainerProps {
  mapMode: MapMode;
  locations?: MapLocationItem[];
  selectedSlug?: string | null;
  onSelectLocation?: (loc: MapLocationItem) => void;

  districts?: TNDistrict[];
  selectedDistrictId?: string | null;
  onSelectDistrict?: (dist: TNDistrict) => void;

  activeEra?: HistoricalEra;
  selectedKingdomId?: string | null;
  onSelectKingdom?: (kingdom: HistoricalKingdomRegion) => void;
}

export default function MapContainer({
  mapMode,
  locations = [],
  selectedSlug,
  onSelectLocation,
  districts = [],
  selectedDistrictId,
  onSelectDistrict,
  activeEra,
  selectedKingdomId,
  onSelectKingdom,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const layersGroupRef = useRef<any>(null);

  const [activeLoc, setActiveLoc] = useState<MapLocationItem | null>(null);
  const [activeDistrict, setActiveDistrict] = useState<TNDistrict | null>(null);
  const [activeKingdom, setActiveKingdom] = useState<HistoricalKingdomRegion | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  // Reset img error on active district / kingdom change
  useEffect(() => {
    setImgError(false);
  }, [activeDistrict, activeKingdom, activeLoc]);

  // 1. Initialize Leaflet map ONCE on mount
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapRef.current) return;
      leafletRef.current = L;

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (!mapInstanceRef.current && mapRef.current) {
        if ((mapRef.current as any)._leaflet_id) return;

        const map = L.map(mapRef.current, {
          center: [10.8, 78.7],
          zoom: 7,
          zoomControl: true,
        });

        // Dark ESRI Base Map
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; OpenStreetMap',
            maxZoom: 16,
          }
        ).addTo(map);

        layersGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
        setIsMapReady(true);
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Map Layers depending on mapMode
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletRef.current;
    const layerGroup = layersGroupRef.current;
    if (!map || !L || !layerGroup || !isMapReady) return;

    layerGroup.clearLayers();

    // ------------------------------------ MODE 1: SITES & INSCRIPTIONS
    if (mapMode === "sites") {
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `<div style="background-color: #f59e0b; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #09090b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const selectedIcon = L.divIcon({
        className: "custom-map-pin-selected",
        html: `<div style="background-color: #fbbf24; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #09090b; box-shadow: 0 0 15px rgba(251, 191, 36, 0.9); transform: scale(1.2);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      locations.forEach((loc) => {
        if (typeof loc.latitude === "number" && typeof loc.longitude === "number") {
          const isSelected = selectedSlug === loc.slug;
          const marker = L.marker([loc.latitude, loc.longitude], {
            icon: isSelected ? selectedIcon : customIcon,
          });

          marker.on("click", () => {
            setActiveLoc(loc);
            if (onSelectLocation) onSelectLocation(loc);
          });

          layerGroup.addLayer(marker);

          if (isSelected) {
            setActiveLoc(loc);
            map.setView([loc.latitude, loc.longitude], 10, { animate: true });
          }
        }
      });
    }

    // ------------------------------------ MODE 2: RAGGED NATURAL 38 DISTRICTS BOUNDARIES
    else if (mapMode === "districts") {
      districts.forEach((dist) => {
        const isSelected = selectedDistrictId === dist.id;

        // Generate natural organic ragged boundary vertices
        const raggedCoords = generateRaggedPolygon(dist.polygon, 0.028, 5);

        // Render District Boundary Polygon (matching real TN District Map style!)
        const distPolygon = L.polygon(raggedCoords, {
          color: isSelected ? "#ffffff" : "#0f172a",
          weight: isSelected ? 3.5 : 1.8,
          fillColor: dist.color,
          fillOpacity: isSelected ? 0.88 : 0.68,
        });

        distPolygon.bindTooltip(
          `<div style="font-family: sans-serif; font-weight: bold; font-size: 12px; text-align: center; color: #000; padding: 2px 6px;">
            <span style="font-size: 13px;">${dist.nameTa}</span><br/>
            <span style="font-size: 10px; opacity: 0.8;">${dist.nameEn}</span>
          </div>`,
          { sticky: true }
        );

        distPolygon.on("click", () => {
          setActiveDistrict(dist);
          if (onSelectDistrict) onSelectDistrict(dist);
        });

        layerGroup.addLayer(distPolygon);

        // Permanent District Tamil Label right over center of district
        const labelIcon = L.divIcon({
          className: "district-label-marker",
          html: `<div style="font-family: 'Mukta Malar', system-ui, sans-serif; font-size: 11px; font-weight: 800; color: #000000; text-shadow: 0 0 3px #ffffff, 0 0 6px #ffffff; text-align: center; white-space: nowrap; pointer-events: none;">${dist.nameTa}</div>`,
          iconSize: [80, 20],
          iconAnchor: [40, 10],
        });

        const labelMarker = L.marker([dist.lat, dist.lng], { icon: labelIcon, interactive: false });
        layerGroup.addLayer(labelMarker);

        if (isSelected) {
          setActiveDistrict(dist);
          map.setView([dist.lat, dist.lng], 9, { animate: true });
        }
      });
    }

    // ------------------------------------ MODE 3: RAGGED NATURAL HISTORICAL KINGDOM PARTITIONS
    else if (mapMode === "kingdoms" && activeEra) {
      activeEra.kingdoms.forEach((kingdom) => {
        const isSelected = selectedKingdomId === kingdom.id;

        // Generate natural organic ragged boundary vertices for kingdoms
        const raggedKingdomCoords = generateRaggedPolygon(kingdom.polygon, 0.042, 6);

        // Render Kingdom Polygon Boundary
        const polygon = L.polygon(raggedKingdomCoords, {
          color: kingdom.color,
          weight: isSelected ? 4 : 2.5,
          fillColor: kingdom.fillColor,
          fillOpacity: isSelected ? kingdom.fillOpacity + 0.2 : kingdom.fillOpacity,
        });

        polygon.bindTooltip(
          `<div style="font-family: serif; font-size: 13px; padding: 4px 8px; text-align: center;">
            <b style="color: ${kingdom.color};">${kingdom.nameEn}</b><br/>
            <span style="font-size: 11px; opacity: 0.9;">${kingdom.nameTa}</span><br/>
            <span style="font-size: 10px; color: #fbbf24;">Capital: ${kingdom.capitalEn}</span>
          </div>`,
          { sticky: true }
        );

        polygon.on("click", () => {
          setActiveKingdom(kingdom);
          if (onSelectKingdom) onSelectKingdom(kingdom);
        });

        layerGroup.addLayer(polygon);

        if (isSelected) {
          setActiveKingdom(kingdom);
        }
      });
    }
  }, [
    mapMode,
    locations,
    selectedSlug,
    districts,
    selectedDistrictId,
    activeEra,
    selectedKingdomId,
    isMapReady,
    onSelectLocation,
    onSelectDistrict,
    onSelectKingdom,
  ]);

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
      {/* Map Leaflet Container */}
      <div ref={mapRef} className="w-full h-full z-0" />

      {/* Selected Location Card Overlay (Mode 1: Sites) */}
      {mapMode === "sites" && activeLoc && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-zinc-950/95 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-semibold uppercase">
                {activeLoc.content_type} • {activeLoc.era || activeLoc.category}
              </span>
              <h4 className="font-serif text-base font-bold text-zinc-100">{activeLoc.title_en}</h4>
              <h5 className="font-tamil text-sm font-semibold text-amber-400/90">{activeLoc.title_ta}</h5>
            </div>
            <button
              onClick={() => setActiveLoc(null)}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-mono p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {activeLoc.location_name && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <MapPin size={13} className="text-amber-400" />
              <span>{activeLoc.location_name}</span>
            </div>
          )}

          <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed">
            {activeLoc.summary_en}
          </p>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3 text-xs font-mono">
            <span className="text-zinc-500 text-[10px]">{activeLoc.source_name}</span>
            <Link
              href={
                activeLoc.content_type === "inscription"
                  ? `/inscriptions/${activeLoc.slug}`
                  : activeLoc.content_type === "history"
                  ? `/history/${activeLoc.slug}`
                  : activeLoc.content_type === "culture"
                  ? `/culture/${activeLoc.slug}`
                  : `/literature/${activeLoc.slug}`
              }
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold inline-flex items-center gap-1 border border-amber-500/30 transition-colors"
            >
              Explore Site <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* Selected District Overlay (Mode 2: Districts) */}
      {mapMode === "districts" && activeDistrict && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-zinc-950/95 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl space-y-3">
          {/* District Image Header if available */}
          {activeDistrict.imageUrl && !imgError && (
            <div className="w-full h-32 rounded-xl overflow-hidden relative border border-zinc-800">
              <img
                src={activeDistrict.imageUrl}
                alt={activeDistrict.nameEn}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span
                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase border"
                style={{
                  backgroundColor: `${activeDistrict.color}25`,
                  borderColor: `${activeDistrict.color}60`,
                  color: "#ffffff",
                }}
              >
                District of Tamil Nadu • {activeDistrict.region}
              </span>
              <h4 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                {activeDistrict.nameEn}
                <span className="font-tamil text-base text-amber-400 font-normal">
                  ({activeDistrict.nameTa})
                </span>
              </h4>
              <p className="text-xs font-mono text-zinc-400">
                Headquarters: <strong className="text-zinc-200">{activeDistrict.headquarters}</strong>
              </p>
            </div>
            <button
              onClick={() => setActiveDistrict(null)}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-mono p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            {activeDistrict.descriptionEn}
          </p>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-bold block">
              Famous Heritage Landmarks:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeDistrict.famousFor.map((landmark, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selected Kingdom Overlay (Mode 3: Kingdoms) */}
      {mapMode === "kingdoms" && activeKingdom && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-zinc-950/95 backdrop-blur-md p-5 rounded-2xl border border-zinc-800 shadow-2xl space-y-3">
          {/* Kingdom Image Header if available */}
          {activeKingdom.imageUrl && !imgError && (
            <div className="w-full h-32 rounded-xl overflow-hidden relative border border-zinc-800">
              <img
                src={activeKingdom.imageUrl}
                alt={activeKingdom.nameEn}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 shadow-lg"
                style={{
                  backgroundColor: `${activeKingdom.color}20`,
                  borderColor: `${activeKingdom.color}60`,
                }}
              >
                <Crown size={18} style={{ color: activeKingdom.color }} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {activeKingdom.reignYears}
                </span>
                <h4 className="font-serif text-base font-bold text-zinc-100">
                  {activeKingdom.nameEn}
                </h4>
                <h5 className="font-tamil text-xs text-amber-400">{activeKingdom.nameTa}</h5>
              </div>
            </div>
            <button
              onClick={() => setActiveKingdom(null)}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-mono p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-mono bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-zinc-400">Royal Capital:</span>
            <span className="text-amber-300 font-semibold">{activeKingdom.capitalEn} ({activeKingdom.capitalTa})</span>
          </div>

          <p className="text-xs text-zinc-300 font-light line-clamp-3 leading-relaxed">
            {activeKingdom.historicalOverview}
          </p>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 text-[10px]">Emblem: {activeKingdom.symbolName}</span>
            <span className="text-amber-400 font-semibold text-[11px] inline-flex items-center gap-1">
              <Shield size={12} /> {activeKingdom.famousRulers[0]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
