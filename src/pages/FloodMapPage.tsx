import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FarmMap } from '../components/FarmMap';
import { SATELLITE_FLOOD_OBSERVATIONS } from '../data/mockFloodData';
import { calculateFloodOverlap } from '../utils/geo';
import {
  Map,
  Compass,
  Cpu,
  Info,
  PlusCircle
} from 'lucide-react';

export const FloodMapPage: React.FC = () => {
  const { t, activeFarm, farms, setActiveFarmId, setActivePage } = useApp();

  const [selectedObsId, setSelectedObsId] = useState<string>(SATELLITE_FLOOD_OBSERVATIONS[0].id);

  const activeObservation = useMemo(() => {
    return SATELLITE_FLOOD_OBSERVATIONS.find((o) => o.id === selectedObsId) || SATELLITE_FLOOD_OBSERVATIONS[0];
  }, [selectedObsId]);

  // Geospatial Overlap Analysis Calculation
  const overlapAnalysis = useMemo(() => {
    if (!activeFarm || !activeObservation) return null;
    return calculateFloodOverlap(
      activeFarm.polygon,
      activeObservation.geoJson,
      activeFarm.id,
      activeObservation.observationDate,
      activeObservation.satelliteSensor
    );
  }, [activeFarm, activeObservation]);

  return (
    <div className="space-y-6 pb-12 text-[#DAF1DE]">
      {/* Header */}
      <div className="bg-[#0B2B26] p-6 sm:p-7 rounded-3xl border border-[#235347] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#163832] border border-[#235347] text-[#8EB69B] flex items-center justify-center font-bold">
            <Map className="w-6 h-6 text-[#8EB69B]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#DAF1DE] tracking-tight">
              {t.floodMap.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#8EB69B]">
              {t.floodMap.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons: Register Farm Focus & Field Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePage('register')}
            className="flex items-center gap-2 bg-[#8EB69B] hover:bg-[#DAF1DE] text-[#051F20] font-black px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-[#8EB69B]/25 transform active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#051F20]" />
            <span>+ Register Farm</span>
          </button>

          {farms.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8EB69B]">Field:</span>
              <select
                value={activeFarm?.id}
                onChange={(e) => setActiveFarmId(e.target.value)}
                className="bg-[#163832] border border-[#235347] text-xs rounded-xl px-3 py-2 font-bold text-[#DAF1DE] focus:outline-none focus:border-[#8EB69B]"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.farmerName} — {f.village} ({f.district})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Observation Selector & Metadata Banner */}
      <div className="bg-[#0B2B26] p-5 rounded-2xl border border-[#235347] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#8EB69B]" />
            <span className="text-xs font-bold text-[#DAF1DE]">
              Active Radar Flood Observation:
            </span>
          </div>

          <select
            value={selectedObsId}
            onChange={(e) => setSelectedObsId(e.target.value)}
            className="bg-[#163832] border border-[#235347] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#DAF1DE] focus:outline-none focus:border-[#8EB69B]"
          >
            {SATELLITE_FLOOD_OBSERVATIONS.map((obs) => (
              <option key={obs.id} value={obs.id}>
                {obs.title} {obs.isSimulatedOrHistorical ? '[SIMULATION / HISTORICAL]' : '[OBSERVED RADAR]'}
              </option>
            ))}
          </select>
        </div>

        {activeObservation && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#163832] p-3.5 rounded-xl border border-[#235347] text-xs">
            <div>
              <span className="text-[#8EB69B] block text-[10px]">Sensor & Provider</span>
              <span className="font-semibold text-[#DAF1DE]">
                {activeObservation.satelliteSensor}
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[10px]">Observation Timestamp</span>
              <span className="font-semibold text-[#DAF1DE]">
                {new Date(activeObservation.observationDate).toLocaleString()} (Resolution: {activeObservation.resolutionMeters}m)
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[10px]">Dataset Classification</span>
              <span className={`font-bold inline-block px-2 py-0.5 rounded text-[10px] ${
                activeObservation.isSimulatedOrHistorical
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                  : 'bg-[#0B2B26] text-[#8EB69B] border border-[#235347]'
              }`}>
                {activeObservation.isSimulatedOrHistorical ? 'CALIBRATED SIMULATION / HISTORICAL' : 'OBSERVED SATELLITE RADAR'}
              </span>
            </div>
            <div className="sm:col-span-3 text-[11px] text-[#8EB69B] pt-1.5 border-t border-[#235347] italic">
              {activeObservation.disclaimer}
            </div>
          </div>
        )}
      </div>

      {/* Main Map Visualizer */}
      <div className="space-y-4">
        <FarmMap
          initialCenter={activeFarm?.centerLocation}
          initialPolygon={activeFarm?.polygon}
          selectedDistrict={activeFarm?.district}
          selectedState={activeFarm?.state}
          autoCenterOnDistrict={true}
          isEditable={false}
          showFloodOverlays={true}
          showRiverGauges={true}
          heightClass="h-[520px]"
        />
      </div>

      {/* Overlap Calculation Results Panel */}
      {overlapAnalysis && (
        <div className="bg-[#0B2B26] p-6 rounded-3xl border border-[#235347] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#235347] pb-3">
            <h2 className="text-base font-bold text-[#DAF1DE] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#8EB69B]" />
              <span>{t.floodMap.overlapResultTitle}</span>
            </h2>
            <div className="text-xs text-[#8EB69B]">
              Calculation method: Projected WGS84 Geodesic Intersection
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347]">
              <div className="text-xs text-[#8EB69B]">Total Farm Area</div>
              <div className="text-xl sm:text-2xl font-black text-[#DAF1DE] mt-1">
                {overlapAnalysis.farmAreaSqm.toLocaleString()} m²
              </div>
              <div className="text-xs text-[#8EB69B] mt-0.5">
                ≈ {(overlapAnalysis.farmAreaSqm / 4046.856).toFixed(2)} Acres
              </div>
            </div>

            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347]">
              <div className="text-xs text-[#8EB69B]">Flooded Overlap Area</div>
              <div className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                {overlapAnalysis.floodedAreaSqm.toLocaleString()} m²
              </div>
              <div className="text-xs text-[#8EB69B] mt-0.5">
                Radar intersection
              </div>
            </div>

            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347]">
              <div className="text-xs text-[#8EB69B]">Exposure Percentage</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                {overlapAnalysis.overlapPercentage}%
              </div>
              <div className="text-xs text-[#8EB69B] mt-0.5">
                of mapped boundary
              </div>
            </div>

            <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347]">
              <div className="text-xs text-[#8EB69B]">Exposure Classification</div>
              <div className={`text-xl sm:text-2xl font-black uppercase mt-1 ${
                overlapAnalysis.exposureCategory === 'severe'
                  ? 'text-rose-400'
                  : overlapAnalysis.exposureCategory === 'high'
                  ? 'text-orange-400'
                  : overlapAnalysis.exposureCategory === 'moderate'
                  ? 'text-amber-400'
                  : 'text-[#8EB69B]'
              }`}>
                {overlapAnalysis.exposureCategory}
              </div>
              <div className="text-xs text-[#8EB69B] mt-0.5">
                Exposure Tier
              </div>
            </div>
          </div>

          <div className="bg-[#163832] p-4 rounded-2xl border border-[#235347] text-xs space-y-2">
            <div className="font-bold text-[#DAF1DE] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#8EB69B]" />
              <span>Scientific Disclaimer & Agronomic Truth:</span>
            </div>
            <p className="text-[#DAF1DE]/90 leading-relaxed">
              {overlapAnalysis.disclaimer}
            </p>
            <div className="pt-2 border-t border-[#235347] space-y-1">
              <span className="font-semibold text-[#DAF1DE]">Technical Caveats:</span>
              <ul className="list-disc list-inside text-[11px] text-[#8EB69B] space-y-1">
                {overlapAnalysis.caveats.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
