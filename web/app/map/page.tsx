"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import MapContainer, { MapMode } from "@/components/map/MapContainer";
import { TN_DISTRICTS, TNDistrict } from "@/lib/tnDistrictsData";
import {
  HISTORICAL_ERAS,
  HistoricalEra,
  HistoricalKingdomRegion,
} from "@/lib/historicalKingdomsData";
import {
  Map as MapIcon,
  MapPin,
  Search,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Crown,
  Shield,
  Globe,
  Compass,
  BookOpen,
  Building2,
  Swords,
  Castle,
  Layers,
} from "lucide-react";
import { getMapLocations } from "@/lib/api";
import { MapLocationItem } from "@/lib/types";
import Link from "next/link";

function MapExplorerContent() {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug");

  // Mode state: "sites" | "districts" | "kingdoms"
  const [mapMode, setMapMode] = useState<MapMode>("districts");

  // MODE 1: Archaeological & Cultural Sites State
  const [categories] = useState<string[]>([
    "All",
    "inscription",
    "history",
    "culture",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locations, setLocations] = useState<MapLocationItem[]>([]);
  const [selectedLoc, setSelectedLoc] = useState<MapLocationItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // MODE 2: 38 Districts State
  const [districtSearch, setDistrictSearch] = useState<string>("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<TNDistrict | null>(null);

  // MODE 3: Historical Kingdoms Partition State
  const [activeEraIndex, setActiveEraIndex] = useState<number>(0);
  const [selectedKingdom, setSelectedKingdom] = useState<HistoricalKingdomRegion | null>(null);
  const [activeDynastyTab, setActiveDynastyTab] = useState<"chola" | "pandya" | "chera" | "pallava">("chola");

  const currentEra = HISTORICAL_ERAS[activeEraIndex];

  // Fetch location pins for Mode 1
  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMapLocations(selectedCategory);
      setLocations(data);
      if (slugParam && data.length > 0) {
        const match = data.find((d) => d.slug === slugParam);
        if (match) setSelectedLoc(match);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load map locations from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedCategory]);

  // Filter logic for Mode 1 (Sites)
  const filteredLocations = locations.filter((loc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      loc.title_en.toLowerCase().includes(q) ||
      loc.title_ta.toLowerCase().includes(q) ||
      (loc.location_name && loc.location_name.toLowerCase().includes(q)) ||
      loc.summary_en.toLowerCase().includes(q)
    );
  });

  // Filter logic for Mode 2 (Districts)
  const districtRegions = [
    "All",
    "Tondai Nadu",
    "Chola Nadu (Cauvery Delta)",
    "Pandya Nadu",
    "Kongu Nadu",
    "Chera/Western Ghats",
  ];

  const filteredDistricts = TN_DISTRICTS.filter((d) => {
    const matchesRegion =
      selectedRegionFilter === "All" || d.region === selectedRegionFilter;
    if (!districtSearch.trim()) return matchesRegion;
    const q = districtSearch.toLowerCase().trim();
    return (
      matchesRegion &&
      (d.nameEn.toLowerCase().includes(q) ||
        d.nameTa.toLowerCase().includes(q) ||
        d.headquarters.toLowerCase().includes(q) ||
        d.famousFor.some((f) => f.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Top Left Navigation */}
      <div className="flex items-center justify-start">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all text-xs font-mono"
        >
          <ArrowRight size={16} className="rotate-180" />
          <span>Back to Journey</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1.5">
          <MapIcon size={13} /> Cartographic Geography • வரைபட அரங்கம்
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
          Tamil Heritage Map Explorer <br />
          <span className="font-tamil text-amber-400 text-2xl sm:text-4xl font-semibold">
            தமிழ் வரலாற்று புவியியல் வரைபடம்
          </span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
          Explore the cartography of Tamilakam: interactive 38 districts boundary map, ancient Chera, Chola, and Pandya kingdom partitions, and archaeological sites.
        </p>
      </div>

      {/* MAIN MODE SELECTOR TABS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-2 bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-2xl max-w-3xl mx-auto">
        <button
          onClick={() => setMapMode("districts")}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mapMode === "districts"
              ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
          }`}
        >
          <Compass size={15} />
          <span>38 Districts of Tamil Nadu</span>
        </button>

        <button
          onClick={() => setMapMode("kingdoms")}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mapMode === "kingdoms"
              ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
          }`}
        >
          <Crown size={15} />
          <span>Kingdom Partitions (Chera, Chola, Pandya)</span>
        </button>

        <button
          onClick={() => setMapMode("sites")}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mapMode === "sites"
              ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
          }`}
        >
          <MapPin size={15} />
          <span>Archaeological Sites & Inscriptions</span>
        </button>
      </div>

      {/* MODE 1 SUB-BAR: SITES & INSCRIPTIONS */}
      {mapMode === "sites" && (
        <div className="bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/80 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Filter by location, Mangulam, Tanjavur, Keezhadi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 mr-1">Layer:</span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {cat === "inscription"
                      ? "Inscriptions"
                      : cat === "history"
                      ? "Historical Sites"
                      : cat === "culture"
                      ? "Culture"
                      : "All Layers"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2 SUB-BAR: 38 DISTRICTS OF TAMIL NADU */}
      {mapMode === "districts" && (
        <div className="bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/80 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search 38 districts, Madurai, Thanjavur..."
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full">
              <span className="text-xs font-mono text-zinc-400 mr-1 shrink-0">Region:</span>
              {districtRegions.map((region) => {
                const isSel = selectedRegionFilter === region;
                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegionFilter(region)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                      isSel
                        ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3 SUB-BAR: HISTORICAL KINGDOM PARTITIONS */}
      {mapMode === "kingdoms" && (
        <div className="bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800/80 space-y-5 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Select Historical Era Timeline:
              </span>
              <h3 className="text-xl font-bold font-serif text-zinc-100 flex items-center gap-2">
                {currentEra.titleEn}
                <span className="font-tamil text-amber-400 text-sm font-semibold">
                  ({currentEra.titleTa})
                </span>
              </h3>
              <p className="text-xs text-zinc-400 max-w-2xl font-light">
                {currentEra.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {HISTORICAL_ERAS.map((era, idx) => {
                const isSelected = activeEraIndex === idx;
                return (
                  <button
                    key={era.id}
                    onClick={() => {
                      setActiveEraIndex(idx);
                      setSelectedKingdom(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {era.timePeriod}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Legend Bar */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-zinc-400 text-[11px]">Kingdom Color Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-amber-300 inline-block" />
              <span className="text-zinc-200">Chola (Tiger Flag)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-300 inline-block" />
              <span className="text-zinc-200">Pandya (Twin Fish Flag)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-300 inline-block" />
              <span className="text-zinc-200">Chera (Bow & Arrow Flag)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-violet-500 border border-violet-300 inline-block" />
              <span className="text-zinc-200">Pallava (Nandi Bull Flag)</span>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {mapMode === "sites" && !loading && error && (
        <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/50 text-center space-y-4 max-w-xl mx-auto">
          <AlertCircle className="mx-auto text-red-400" size={36} />
          <h3 className="text-lg font-bold text-zinc-100">Unable to load map data</h3>
          <p className="text-xs text-zinc-400 font-mono">{error}</p>
          <button
            onClick={fetchLocations}
            className="px-4 py-2 rounded-xl bg-red-900/40 text-red-200 text-xs font-semibold inline-flex items-center gap-2 border border-red-700/50 cursor-pointer"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* MAIN MAP & DIRECTORY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Top: Interactive Leaflet Map (2 Cols) */}
        <div className="lg:col-span-2">
          <MapContainer
            mapMode={mapMode}
            locations={filteredLocations}
            selectedSlug={selectedLoc?.slug}
            onSelectLocation={(loc) => setSelectedLoc(loc)}
            districts={filteredDistricts}
            selectedDistrictId={selectedDistrict?.id}
            onSelectDistrict={(d) => setSelectedDistrict(d)}
            activeEra={currentEra}
            selectedKingdomId={selectedKingdom?.id}
            onSelectKingdom={(k) => setSelectedKingdom(k)}
          />
        </div>

        {/* Right Side: Directory Panel (1 Col) */}
        <div className="bg-zinc-950/80 rounded-3xl p-6 border border-zinc-800/80 space-y-4 shadow-2xl h-[550px] sm:h-[650px] flex flex-col">
          {/* MODE 1 DIRECTORY PANEL */}
          {mapMode === "sites" && (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <MapPin size={18} className="text-amber-400" /> Mapped Sites ({filteredLocations.length})
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">Click to locate</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLoc?.slug === loc.slug;
                  return (
                    <button
                      key={loc.slug}
                      onClick={() => setSelectedLoc(loc)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1.5 group cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/50 shadow-lg"
                          : "bg-zinc-900/60 border-zinc-800/80 hover:border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                          {loc.content_type}
                        </span>
                        {loc.period && <span className="text-[10px] font-mono text-zinc-500">{loc.period}</span>}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                        {loc.title_en}
                      </h4>
                      <h5 className="font-tamil text-xs font-semibold text-amber-400/80">
                        {loc.title_ta}
                      </h5>
                      {loc.location_name && (
                        <p className="text-[11px] font-mono text-zinc-400 truncate flex items-center gap-1">
                          <MapPin size={11} className="text-amber-400" /> {loc.location_name}
                        </p>
                      )}
                    </button>
                  );
                })}

                {filteredLocations.length === 0 && (
                  <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                    No mapped sites found matching "{searchQuery}".
                  </div>
                )}
              </div>
            </>
          )}

          {/* MODE 2 DIRECTORY PANEL: 38 DISTRICTS */}
          {mapMode === "districts" && (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Compass size={18} className="text-amber-400" /> TN Districts ({filteredDistricts.length})
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">Tap to inspect</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {filteredDistricts.map((dist) => {
                  const isSelected = selectedDistrict?.id === dist.id;
                  return (
                    <button
                      key={dist.id}
                      onClick={() => setSelectedDistrict(dist)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2 group cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/50 shadow-lg"
                          : "bg-zinc-900/60 border-zinc-800/80 hover:border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border"
                          style={{
                            backgroundColor: `${dist.color}25`,
                            borderColor: `${dist.color}60`,
                            color: "#ffffff",
                          }}
                        >
                          {dist.region}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">HQ: {dist.headquarters}</span>
                      </div>

                      <div>
                        <h4 className="font-serif text-base font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                          {dist.nameEn} ({dist.nameTa})
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {dist.famousFor.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}

                {filteredDistricts.length === 0 && (
                  <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                    No districts found matching "{districtSearch}".
                  </div>
                )}
              </div>
            </>
          )}

          {/* MODE 3 DIRECTORY PANEL: KINGDOM PARTITIONS */}
          {mapMode === "kingdoms" && (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Crown size={18} className="text-amber-400" /> Kingdoms in {currentEra.timePeriod}
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">Territories ({currentEra.kingdoms.length})</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {currentEra.kingdoms.map((kingdom) => {
                  const isSelected = selectedKingdom?.id === kingdom.id;
                  return (
                    <button
                      key={kingdom.id}
                      onClick={() => setSelectedKingdom(kingdom)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all space-y-3 group cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500/50 shadow-lg"
                          : "bg-zinc-900/60 border-zinc-800/80 hover:border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                          style={{
                            backgroundColor: `${kingdom.color}20`,
                            borderColor: `${kingdom.color}50`,
                          }}
                        >
                          <Crown size={18} style={{ color: kingdom.color }} />
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-mono font-bold uppercase"
                            style={{ color: kingdom.color }}
                          >
                            {kingdom.reignYears}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                            {kingdom.nameEn}
                          </h4>
                          <h5 className="font-tamil text-xs text-amber-400/90">{kingdom.nameTa}</h5>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                        {kingdom.historicalOverview}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/60">
                        <span>Capital: <strong className="text-amber-300">{kingdom.capitalEn}</strong></span>
                        <span>Flag: {kingdom.symbolName}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* KINGDOM HISTORY DEEP-DIVE SECTION */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/20 border border-zinc-800 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold inline-flex items-center gap-1.5">
              <Swords size={14} /> Muvendar Histories • மூவேந்தர் வரலாறு
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-zinc-100">
              The Three Crowned Dynasties of Tamilakam
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-3xl">
              Detailed historical accounts of Chola, Pandya, Chera, and Pallava rulers, capital cities, famous battles, naval trade ports, and cultural monuments.
            </p>
          </div>

          {/* Dynasty Selection Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveDynastyTab("chola")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDynastyTab === "chola"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
              }`}
            >
              Chola (சோழர்)
            </button>
            <button
              onClick={() => setActiveDynastyTab("pandya")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDynastyTab === "pandya"
                  ? "bg-red-500 text-zinc-950 shadow-md shadow-red-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
              }`}
            >
              Pandya (பாண்டியர்)
            </button>
            <button
              onClick={() => setActiveDynastyTab("chera")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDynastyTab === "chera"
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
              }`}
            >
              Chera (சேரர்)
            </button>
            <button
              onClick={() => setActiveDynastyTab("pallava")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDynastyTab === "pallava"
                  ? "bg-violet-500 text-zinc-950 shadow-md shadow-violet-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800"
              }`}
            >
              Pallava (பல்லவர்)
            </button>
          </div>
        </div>

        {/* TAB 1: CHOLA HISTORY */}
        {activeDynastyTab === "chola" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Crown size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-amber-400">
                    The Great Chola Empire (சோழ சாம்ராஜ்யம்)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Capitals: Uraiyur, Poompuhar, Thanjavur, Gangaikonda Cholapuram
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                The Cholas were one of the longest-ruling dynasties in world history. From the early Sangam period under Karikala Chola to the medieval empire of Rajaraja Chola I and Rajendra Chola I, the Cholas transformed the Bay of Bengal into a 'Chola Lake'.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Crown size={14} /> Legendary Emperors
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Karikala Chola (Kallanai Dam builder)</li>
                    <li>Rajaraja Chola I (Brihadisvara Temple)</li>
                    <li>Rajendra Chola I (Ganges & Srivijaya Conqueror)</li>
                    <li>Kulottunga Chola I</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Swords size={14} /> Famous Military & Naval Expeditions
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Battle of Venni (Sangam Era triumph)</li>
                    <li>Battle of Kandalur Salai (Naval fleet victory)</li>
                    <li>Expedition to River Ganges (1023 CE)</li>
                    <li>Srivijaya Invasion (Malaysia & Sumatra)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Castle size={14} /> Chola Architectural Marvels
              </h4>
              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Brihadisvara Temple (Big Temple)</strong>
                  <span>UNESCO World Heritage Site in Thanjavur with 216ft central granite Vimana shadowless design.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Gangaikonda Cholapuram</strong>
                  <span>Built by Rajendra I with liquid water brought from River Ganges deposited in Cholagangam Lake.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Airavatesvara Temple (Darasuram)</strong>
                  <span>Chariot-shaped stone temple with musical acoustic steps.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: PANDYA HISTORY */}
        {activeDynastyTab === "pandya" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-red-400">
                    The Pandya Dynasty & Sangam Academies (பாண்டிய பேரரசு)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Capitals: Madurai, Korkai, Tenkasi
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                The Pandyas were traditional rulers of Southern Tamilakam and immortal patrons of the Tamil Sangam literature assemblies. Renowned worldwide for Korkai sea pearls, Madurai textiles, and rock-cut cave architecture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Crown size={14} /> Iconic Monarchs
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Nedunjeliyan II (Talaiyalanganam hero)</li>
                    <li>Kadungon (Kalabhra revivalist)</li>
                    <li>Jatavarman Sundara Pandyan I (Empire Zenith)</li>
                    <li>Maravarman Kulasekara Pandyan I</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Globe size={14} /> Global Trade & Pearl Coast
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Korkai Natural Pearl Fisheries</li>
                    <li>Trade relations with Roman Empire</li>
                    <li>Marco Polo's Chronicles (1292 CE)</li>
                    <li>Gold coins exported to Arabia and China</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Castle size={14} /> Pandya Monuments & Heritage
              </h4>
              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Madurai Meenakshi Sundareswarar Temple</strong>
                  <span>Historical center of Madurai city layout with 14 iconic colorful sculpted gopurams.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Kazhugumalai Vettuvan Koil</strong>
                  <span>Monolithic rock-cut temple sculpted out of single granite hill ('Ellora of the South').</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Tenkasi Kasi Viswanathar Temple</strong>
                  <span>Built by Parakrama Pandyan with giant 180ft entrance tower.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: CHERA HISTORY */}
        {activeDynastyTab === "chera" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-emerald-400">
                    The Chera Dynasty & Western Ghats (சேர பேரரசு)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Capitals: Vanchi (Karur), Muziris (Kodungallur), Mahodayapuram
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                The Cheras ruled the lush western territories of Kongu Nadu and Malabar Coast. They maintained lucrative spice trade routes with Roman and Greek merchants, importing Roman gold in exchange for Malabar black pepper, ivory, and beryl gems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Crown size={14} /> Great Chera Kings
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Cheran Senguttuvan (Hero of Silappatikaram)</li>
                    <li>Imayavaramban Neduncheralathan</li>
                    <li>Kulashekara Alvar (Bhakti Saint King)</li>
                    <li>Rama Varma Kulasekhara</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Globe size={14} /> Muziris Port & Roman Spice Route
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Muziris ancient port described in Periplus</li>
                    <li>Temple of Augustus built by Romans at Muziris</li>
                    <li>Roman Coin Hoards excavated at Karur & Coimbatore</li>
                    <li>Spices, Beryl Gems, and Fine Muslin Export</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} /> Chera Literature & Legacy
              </h4>
              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Silappatikaram Epic</strong>
                  <span>Authored by Chera prince Ilango Adigal, detailing the journey of Kannagi and Kovalan.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Padirruppattu (பதிற்றுப்பத்து)</strong>
                  <span>Sangam anthology devoted entirely to ten Chera kings and their exploits.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: PALLAVA HISTORY */}
        {activeDynastyTab === "pallava" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-violet-400">
                    The Pallava Empire of Tondaimandalam (பல்லவ பேரரசு)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Capitals: Kanchipuram & Mamallapuram Port
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                The Pallavas laid the bedrock of South Indian Dravidian stone temple architecture. Under Mahendravarman I and Narasimhavarman I (Mamalla), Mamallapuram became a world monument of monolithic rock relief sculpture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-violet-400 flex items-center gap-1.5">
                    <Crown size={14} /> Renowned Pallava Monarchs
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Mahendravarman I (Vichitrachitta - Playwright & Architect)</li>
                    <li>Narasimhavarman I (Mamalla - Conqueror of Vatapi)</li>
                    <li>Narasimhavarman II (Rajasimha - Shore Temple Builder)</li>
                    <li>Nandivarman II</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-violet-400 flex items-center gap-1.5">
                    <Swords size={14} /> Military Triumphs & Travels
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside font-light">
                    <li>Conquest of Vatapi against Chalukya Pulakeshin II</li>
                    <li>Naval Expedition to Ceylon to enthrone Manavamma</li>
                    <li>Chinese monk Xuanzang's Visit to Kanchipuram (640 CE)</li>
                    <li>Maritime trade with Srivijaya & China</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="font-mono text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                <Castle size={14} /> UNESCO Pallava Landmarks
              </h4>
              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Mamallapuram Shore Temple & Rathas</strong>
                  <span>Structural granite sea temple and Five Rathas carved out of single boulders.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Descent of the Ganges (Arjuna's Penance)</strong>
                  <span>World's largest open-air stone bas-relief carving.</span>
                </li>
                <li className="space-y-0.5">
                  <strong className="text-zinc-100 font-bold block">Kanchi Kailasanathar Temple</strong>
                  <span>Oldest standing structural sandstone temple in Kanchipuram.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 font-mono text-xs font-mono">Initializing Tamil Heritage Cartography...</p>
        </div>
      }
    >
      <MapExplorerContent />
    </Suspense>
  );
}
