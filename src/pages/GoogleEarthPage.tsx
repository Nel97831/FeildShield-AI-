import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleEarthViewer } from '../components/GoogleEarthViewer';
import { SATELLITE_FLOOD_OBSERVATIONS, RIVER_GAUGES } from '../data/mockFloodData';
import { DISTRICT_COORDINATES, getDistrictCoordinates } from '../data/districtCoordinates';
import { calculateGeodesicAreaSqm, calculateFloodOverlap } from '../utils/geo';
import { getGoogleEarthWebUrl, generateGoogleEarthKml, downloadKmlFile } from '../utils/googleEarth';
import {
  Globe,
  Layers,
  MapPin,
  ExternalLink,
  Download,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  Compass,
  Sprout,
  Activity,
  FileCheck2,
  Calendar,
  Waves,
  Eye,
  Maximize2
} from 'lucide-react';

export const GoogleEarthPage: React.FC = () => {
  const { t, farms, activeFarm, setActiveFarmId } = useApp();
  const [selectedObsId, setSelectedObsId] = useState<string>(SATELLITE_FLOOD_OBSERVATIONS[0].id);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(activeFarm?.district || 'Sangrur');

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

  const districtCoords = useMemo(() => {
    return getDistrictCoordinates(selectedDistrict);
  }, [selectedDistrict]);

  const earthWebLink = useMemo(() => {
    const pt = activeFarm?.polygon && activeFarm.polygon.length > 0
      ? activeFarm.polygon[0]
      : districtCoords;
    return getGoogleEarthWebUrl(pt, 300, 1200, 20, 60);
  }, [activeFarm, districtCoords]);

  const handleExportKml = () => {
    const kml = generateGoogleEarthKml(activeFarm, activeFarm?.polygon, activeObservation);
    const filename = activeFarm
      ? `KrishiRakshak_GoogleEarth_${activeFarm.farmerName.replace(/\s+/g, '_')}.kml`
      : 'KrishiRakshak_GoogleEarth_Analysis.kml';
    downloadKmlFile(filename, kml);
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-[#DAF1DE]">
      {/* Page Header */}
      <div className="bg-[#0B2B26] p-6 sm:p-8 rounded-3xl border border-[#235347] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#163832] border border-[#235347] text-[#8EB69B] flex items-center justify-center font-bold shadow-lg shadow-[#8EB69B]/10">
            <Globe className="w-7 h-7 text-[#8EB69B] animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#DAF1DE]">
                Google Earth 3D Agricultural Center
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#163832] text-[#8EB69B] border border-[#8EB69B]/40 text-xs font-black">
                PHOTOREALISTIC 3D
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8EB69B] mt-1">
              Explore your farm parcels, survey boundaries, and radar flood inundation in high-resolution Google Earth 3D.
            </p>
          </div>
        </div>

        {/* Global Earth Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={earthWebLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#163832] hover:bg-[#235347] text-[#DAF1DE] border border-[#235347] hover:border-[#8EB69B]/50 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
            title="Launch in Google Earth Web"
          >
            <ExternalLink className="w-4 h-4 text-sky-400" />
            <span>Launch Google Earth Web</span>
          </a>

          <button
            type="button"
            onClick={handleExportKml}
            className="flex items-center gap-2 bg-[#8EB69B] hover:bg-[#DAF1DE] text-[#051F20] px-4 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-[#8EB69B]/25 transform active:scale-95 cursor-pointer"
            title="Download full KML for Google Earth Pro Desktop"
          >
            <Download className="w-4 h-4 text-[#051F20]" />
            <span>Export KML for Earth Pro</span>
          </button>
        </div>
      </div>

      {/* Selector & Status Bar */}
      <div className="bg-[#0E1628] p-5 rounded-2xl border border-[#1E293B] shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Farm Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-[#CCFF00]" />
            Selected Farm Plot:
          </label>
          <select
            value={activeFarm?.id || ''}
            onChange={(e) => setActiveFarmId(e.target.value)}
            className="w-full bg-[#080D1A] border border-[#1E293B] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[#CCFF00]"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.farmerName} — {f.village} ({f.district}) [Khasra: {f.landRecord?.khasraNumber || 'N/A'}]
              </option>
            ))}
          </select>
        </div>

        {/* Satellite Flood Radar Layer Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-sky-400" />
            Active Radar Flood Observation:
          </label>
          <select
            value={selectedObsId}
            onChange={(e) => setSelectedObsId(e.target.value)}
            className="w-full bg-[#080D1A] border border-[#1E293B] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[#CCFF00]"
          >
            {SATELLITE_FLOOD_OBSERVATIONS.map((obs) => (
              <option key={obs.id} value={obs.id}>
                {obs.title} — {obs.observationDate}
              </option>
            ))}
          </select>
        </div>

        {/* Geographic District Zoom */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            District Center:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-[#080D1A] border border-[#1E293B] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[#CCFF00]"
          >
            {Object.keys(DISTRICT_COORDINATES).sort().map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Google Earth 3D Viewer Component */}
      <GoogleEarthViewer
        initialCenter={districtCoords}
        farm={activeFarm}
        floodObservation={activeObservation}
        heightClass="h-[600px]"
        isEditable={false}
      />

      {/* Geospatial Stats & Crop Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Plot Area */}
        <div className="bg-[#0E1628] p-5 rounded-2xl border border-[#1E293B] shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Demarcated Plot</span>
            <MapPin className="w-4 h-4 text-[#CCFF00]" />
          </div>
          <div className="mt-2 text-xl font-black text-white">
            {activeFarm?.areaSqm ? `${activeFarm.areaSqm.toLocaleString()} m²` : '0 m²'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            ≈ {activeFarm?.areaSqm ? (activeFarm.areaSqm / 4046.86).toFixed(2) : 0} Acres ({activeFarm?.village})
          </div>
        </div>

        {/* Flood Overlap */}
        <div className="bg-[#0E1628] p-5 rounded-2xl border border-[#1E293B] shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Radar Flood Inundation</span>
            <Droplets className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-xl font-black text-white flex items-center gap-2">
            <span>{overlapAnalysis?.overlapPercentage.toFixed(1) || '0'}%</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
              (overlapAnalysis?.overlapPercentage || 0) > 50
                ? 'bg-red-950 text-red-300 border border-red-700'
                : (overlapAnalysis?.overlapPercentage || 0) > 10
                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                : 'bg-emerald-950 text-[#CCFF00] border border-emerald-700'
            }`}>
              {(overlapAnalysis?.overlapPercentage || 0) > 50 ? 'Submerged' : (overlapAnalysis?.overlapPercentage || 0) > 10 ? 'Partial Risk' : 'Safe'}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {overlapAnalysis?.floodedAreaSqm.toLocaleString() || '0'} m² submerged
          </div>
        </div>

        {/* Estimated Crop Loss Value */}
        <div className="bg-[#0E1628] p-5 rounded-2xl border border-[#1E293B] shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Estimated Crop Exposure</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-xl font-black text-[#CCFF00]">
            ₹{(((overlapAnalysis?.floodedAreaSqm || 0) / 4046.86) * 38000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            PMFBY Claim: {(overlapAnalysis?.overlapPercentage || 0) > 33 ? 'YES (72hr Window)' : 'Monitoring'}
          </div>
        </div>

        {/* Government Cadastral Status */}
        <div className="bg-[#0E1628] p-5 rounded-2xl border border-[#1E293B] shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Land Record Status</span>
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          </div>
          <div className="mt-2 text-base font-black text-white truncate">
            Khasra {activeFarm?.landRecord?.khasraNumber || 'N/A'}
          </div>
          <div className="text-[11px] text-[#CCFF00] mt-1 font-semibold flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Land Registry Matched</span>
          </div>
        </div>
      </div>

      {/* Google Earth Features Info Card */}
      <div className="bg-[#0E1628] p-6 rounded-2xl border border-[#1E293B] shadow-md">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#CCFF00]" />
          <span>About KrishiRakshak Google Earth Integration</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="bg-[#080D1A] p-4 rounded-xl border border-[#1E293B]">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-400" />
              Photorealistic 3D Globe
            </h4>
            <p>
              Render high-resolution Google Earth satellite terrain models with camera pitch up to 65°, 360° orbital animation, and altitude zoom down to 100 meters above field bunds.
            </p>
          </div>
          <div className="bg-[#080D1A] p-4 rounded-xl border border-[#1E293B]">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#CCFF00]" />
              Radar Flood Overlay
            </h4>
            <p>
              Directly visualizes European Space Agency (ESA) Copernicus Sentinel-1 Synthetic Aperture Radar (SAR) flood observation polygons on top of Google Earth imagery to verify crop submersion.
            </p>
          </div>
          <div className="bg-[#080D1A] p-4 rounded-xl border border-[#1E293B]">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-amber-400" />
              KML Export & Web Deep-Linking
            </h4>
            <p>
              Generate OGC KML 2.2 files compatible with Google Earth Pro Desktop and Google Earth Mobile, with full cadastral survey metadata, farmer KYC, and crop loss assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
