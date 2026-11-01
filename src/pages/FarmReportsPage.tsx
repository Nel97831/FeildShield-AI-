import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { SATELLITE_FLOOD_OBSERVATIONS, OFFICIAL_FLOOD_WARNINGS } from '../data/mockFloodData';
import { calculateFloodOverlap } from '../utils/geo';
import {
  FileText,
  Printer,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Building2,
  UserCheck,
  Sprout,
  ArrowRight,
  Map
} from 'lucide-react';

export const FarmReportsPage: React.FC = () => {
  const { activeFarm, photoAssessments, cropLossClaims, setActivePage } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);

  const cropInfo = activeFarm ? CROPS_DATA[activeFarm.cropType] : null;
  const primaryObs = SATELLITE_FLOOD_OBSERVATIONS[0];

  const overlap = activeFarm && primaryObs
    ? calculateFloodOverlap(activeFarm.polygon, primaryObs.geoJson, activeFarm.id, primaryObs.observationDate)
    : null;

  const relevantWarning = OFFICIAL_FLOOD_WARNINGS[0];
  const relatedClaim = cropLossClaims.find((c) => c.farmId === activeFarm?.id);

  const handlePrint = () => {
    window.print();
  };

  if (!activeFarm) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4 font-sans">
        <div className="w-16 h-16 rounded-3xl bg-[#163832] border border-[#235347] text-[#8EB69B] flex items-center justify-center mx-auto shadow-lg">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">No Active Farm Selected</h2>
        <p className="text-sm text-[#DAF1DE] max-w-md mx-auto">
          Please register your farm location and details first to generate an official damage and verification dossier.
        </p>
        <button
          onClick={() => setActivePage('register')}
          className="button-glow-active bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm px-6 py-3 rounded-xl transition cursor-pointer shadow-lg"
        >
          Register Farm Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-20 font-sans">
      {/* Header and Print Action */}
      <div className="bg-[#0B2B26] border border-[#235347] p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-[#8EB69B] px-2.5 py-0.5 rounded-md">
              Official Documentation
            </span>
            <span className="text-xs text-[#8EB69B] font-semibold">Ref: KR-DOSSIER-{activeFarm.id.slice(-6)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Farm Damage & Verification Dossier
          </h1>
          <p className="text-xs sm:text-sm text-[#DAF1DE]">
            Geospatial land boundary certificate, satellite hazard exposure assessment, and local disaster recovery dossier.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto shrink-0">
          <button
            onClick={() => setActivePage('floodMap')}
            className="flex-1 sm:flex-none bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] font-bold text-xs px-4 py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Map className="w-4 h-4 text-[#8EB69B]" />
            <span className="hidden md:inline">View Map</span>
          </button>
          <button
            onClick={handlePrint}
            className="button-glow-active flex-1 sm:flex-none bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs px-6 py-3.5 rounded-xl shadow-[0_0_24px_rgba(142,182,155,0.7)] transition flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4 text-[#051F20]" />
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document (Dark in UI, White & High-Contrast in Print) */}
      <div
        ref={reportRef}
        className="bg-[#0B2B26] text-white p-7 sm:p-10 rounded-3xl border border-[#235347] shadow-2xl space-y-7 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:space-y-6"
      >
        {/* Document Header */}
        <div className="border-b-2 border-[#8EB69B] pb-6 flex flex-wrap items-start justify-between gap-4 print:border-black">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#8EB69B] flex items-center gap-1.5 print:text-black">
              <span>KrishiRakshak AI • Agricultural Damage Assessment & Relief Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 print:text-black">
              Agricultural Risk, Land Boundary & Loss Assessment Certificate
            </h2>
            <div className="text-xs text-[#DAF1DE] mt-1 font-mono print:text-gray-700">
              Document Ref: KR-DOSSIER-{activeFarm.id.slice(-8)}-{new Date().getFullYear()} • Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-bold text-[#8EB69B] print:text-black">Verification Authority:</div>
            <div className="text-[#DAF1DE] font-semibold print:text-gray-800">
              District Agriculture Office / Revenue Patwari / KVK
            </div>
          </div>
        </div>

        {/* Section 1: Registered Farm Location & Cultivator Identity */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
            <Building2 className="w-3.5 h-3.5 text-[#8EB69B] print:text-black" />
            <span>Section 1: Farm Location & Cultivator Details</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#051F20] p-4 rounded-2xl border border-[#235347] text-xs print:bg-gray-50 print:border-gray-300 print:text-black">
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Farmer / Cultivator</span>
              <span className="font-bold text-white text-sm print:text-black">{activeFarm.farmerName}</span>
              <span className="text-[10px] text-[#DAF1DE] block capitalize font-medium print:text-gray-700">
                Role: {activeFarm.tenancy?.farmerRole || 'Owner'}
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Mobile Alert Contact</span>
              <span className="font-bold text-white font-mono print:text-black">{activeFarm.phone}</span>
              <span className="text-[10px] text-emerald-400 block print:text-green-800">SMS Alerts Active</span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Farm Location</span>
              <span className="font-bold text-white print:text-black">
                {activeFarm.village}, {activeFarm.district}
              </span>
              <span className="text-[10px] text-[#DAF1DE] block print:text-gray-700">{activeFarm.state}</span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Cultivated Holding Area</span>
              <span className="font-bold text-[#8EB69B] text-sm print:text-black">
                {activeFarm.enteredArea} {activeFarm.enteredUnit.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-[10px] text-[#DAF1DE] block font-mono print:text-gray-700">
                ({activeFarm.areaSqm.toLocaleString()} m²)
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Crop Profile, Soil Health & Satellite NDVI */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
            <Sprout className="w-3.5 h-3.5 text-[#8EB69B] print:text-black" />
            <span>Section 2: Seasonal Crop & Satellite NDVI Observation</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#051F20] p-4 rounded-2xl border border-[#235347] text-xs print:bg-gray-50 print:border-gray-300 print:text-black">
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Standing Crop & Variety</span>
              <span className="font-bold text-white print:text-black">
                {cropInfo?.nativeNames.en || activeFarm.cropType.toUpperCase()} ({activeFarm.cropVariety || 'Standard'})
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Growth Stage & Sowing</span>
              <span className="font-bold text-white uppercase print:text-black">
                {activeFarm.growthStage} ({activeFarm.plantingDate || 'Current Season'})
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Soil Condition</span>
              <span className="font-bold text-white print:text-black">
                pH {activeFarm.soilHealth?.ph ?? 7.4} • Moisture {activeFarm.soilHealth?.moisturePercent ?? 70}%
              </span>
            </div>
            <div>
              <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Sentinel-2 NDVI Vigor</span>
              <span className="font-bold text-[#8EB69B] font-mono print:text-black">
                {activeFarm.vegetationIndex?.ndviValue ?? 0.74} ({activeFarm.vegetationIndex?.vegetationHealth.toUpperCase() ?? 'VIGOROUS'})
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Official Hydrological & Meteorological Bulletins */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 print:text-black" />
            <span>Section 3: Documented Hydro-Meteorological Bulletins (CWC / IMD)</span>
          </h3>
          {relevantWarning && (
            <div className="p-4 rounded-2xl bg-[#051F20] border border-[#235347] text-xs space-y-2 print:bg-gray-50 print:border-gray-300 print:text-black">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-400 uppercase print:text-red-700">
                  {relevantWarning.severity} Alert: {relevantWarning.headline}
                </span>
                <span className="text-[11px] text-[#DAF1DE] print:text-gray-600">{relevantWarning.lastUpdated}</span>
              </div>
              <p className="text-[#DAF1DE] leading-relaxed text-[11px] print:text-gray-800">
                {relevantWarning.description}
              </p>
              <div className="text-[10px] text-[#8EB69B] pt-1 border-t border-[#235347] print:border-gray-300 print:text-gray-700">
                River Basin: {relevantWarning.riverBasin} • Water Level: {relevantWarning.waterLevelCurrent || 'Fluctuating Above Normal'} • Source: {relevantWarning.source}
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Satellite Radar Water Overlap (Sentinel-1 SAR) */}
        {overlap && primaryObs && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8EB69B] print:text-black" />
              <span>Section 4: Geospatial Satellite Radar Exposure (Sentinel-1 C-SAR)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#051F20] p-4 rounded-2xl border border-[#235347] text-xs print:bg-gray-50 print:border-gray-300 print:text-black">
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Satellite Sensor</span>
                <span className="font-bold text-white print:text-black">{primaryObs.satelliteSensor}</span>
              </div>
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Observation Date</span>
                <span className="font-bold text-white print:text-black">
                  {new Date(primaryObs.observationDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Inundated Field Area</span>
                <span className="font-bold text-white font-mono print:text-black">
                  {overlap.floodedAreaSqm.toLocaleString()} m²
                </span>
              </div>
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold print:text-gray-600">Calculated Exposure</span>
                <span className="font-black text-rose-400 text-sm font-mono print:text-red-700">
                  {overlap.overlapPercentage}% ({overlap.exposureCategory.toUpperCase()})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Field Damage & Disaster Incident Docket Record */}
        {relatedClaim && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
              <span>Section 5: Logged Crop Damage & Calamity Docket Record</span>
            </h3>
            <div className="p-4 rounded-2xl bg-[#051F20] border border-[#235347] text-xs space-y-2 print:bg-gray-50 print:border-gray-300 print:text-black">
              <div className="flex justify-between items-center">
                <span className="font-mono font-black text-white text-sm print:text-black">
                  Docket Ref: {relatedClaim.docketNumber}
                </span>
                <span className="bg-[#163832] text-[#8EB69B] border border-[#235347] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase print:bg-gray-200 print:text-black">
                  {relatedClaim.status.replace('_', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#DAF1DE] print:text-gray-800">
                <div>Cause of Damage: <strong className="text-white print:text-black">{relatedClaim.causeOfLoss}</strong></div>
                <div>Estimated Crop Damage: <strong className="text-white print:text-black">{relatedClaim.estimatedLossPercentage}%</strong></div>
                <div>Incident Date: <strong className="text-white print:text-black">{relatedClaim.lossDate}</strong></div>
              </div>
              {relatedClaim.notes && (
                <div className="text-[11px] text-[#8EB69B] pt-1 border-t border-[#235347] print:border-gray-300 print:text-gray-700">
                  Field Notes: {relatedClaim.notes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 6: Attached Visual Crop Photo Evidence */}
        {photoAssessments.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8EB69B] border-b border-[#235347] pb-1 flex items-center gap-1.5 print:text-black print:border-gray-300">
              <UserCheck className="w-3.5 h-3.5 text-[#8EB69B] print:text-black" />
              <span>Section 6: Attached Visual Crop Photo Evidence</span>
            </h3>
            <div className="space-y-2 text-xs">
              {photoAssessments.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3 bg-[#051F20] rounded-2xl border border-[#235347] flex items-center gap-4 print:bg-gray-50 print:border-gray-300 print:text-black">
                  <img src={item.imageUrl} alt="Symptom" className="w-16 h-16 object-cover rounded-xl border border-[#235347] print:border-gray-400" />
                  <div>
                    <div className="font-bold text-white print:text-black">
                      Symptoms: {item.visibleSymptoms.join(', ')}
                    </div>
                    <div className="text-[#DAF1DE] text-[11px] mt-0.5 print:text-gray-700">
                      Suspected Stress: {item.suspectedConditions.join('; ')} • Severity: {item.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Official Signatures & Certification */}
        <div className="border-t-2 border-[#235347] pt-6 space-y-4 text-[10px] text-[#DAF1DE] leading-relaxed print:border-black print:text-gray-600">
          <p>
            <strong>Official Certification & Evidentiary Notice:</strong> This dossier compiles registered farm boundary coordinates, meteorological bulletins issued by IMD/CWC, and European Space Agency Copernicus Sentinel-1 synthetic aperture radar surface observations. The calculated exposure serves as verified evidentiary documentation for block agricultural officers, Krishi Vigyan Kendra scientists, and disaster recovery administration.
          </p>

          <div className="grid grid-cols-2 pt-8 text-center text-xs text-white print:text-black">
            <div>
              <div className="border-b border-[#235347] w-48 mx-auto mb-1 print:border-black"></div>
              <span className="font-bold">Farmer / Cultivator Signature</span>
            </div>
            <div>
              <div className="border-b border-[#235347] w-48 mx-auto mb-1 print:border-black"></div>
              <span className="font-bold">Agricultural Officer / KVK Seal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
