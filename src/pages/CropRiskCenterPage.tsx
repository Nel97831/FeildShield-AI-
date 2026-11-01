import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AGRICULTURAL_RISK_ITEMS, RISK_CATEGORIES } from '../data/agriculturalRisks';
import { RiskCategoryKey } from '../types';
import {
  ShieldAlert,
  Droplets,
  SunMedium,
  Flame,
  CloudLightning,
  Biohazard,
  Bug,
  Activity,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Info,
  CalendarCheck
} from 'lucide-react';

export const CropRiskCenterPage: React.FC = () => {
  const { activeFarm, setActivePage, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<RiskCategoryKey | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'severe' | 'high' | 'moderate' | 'low'>('all');

  const filteredRisks = useMemo(() => {
    return AGRICULTURAL_RISK_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSev = severityFilter === 'all' || item.severity === severityFilter;
      return matchCat && matchSev;
    });
  }, [selectedCategory, severityFilter]);

  const getCategoryIcon = (key: RiskCategoryKey) => {
    switch (key) {
      case 'floods_waterlogging':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'drought_deficit':
        return <SunMedium className="w-5 h-5 text-amber-600" />;
      case 'heatwave_frost':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'excessive_rain_storm':
        return <CloudLightning className="w-5 h-5 text-indigo-600" />;
      case 'crop_diseases':
        return <Biohazard className="w-5 h-5 text-rose-600" />;
      case 'pest_attacks':
        return <Bug className="w-5 h-5 text-purple-600" />;
      case 'soil_irrigation_issues':
        return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'post_harvest_storage':
        return <Package className="w-5 h-5 text-teal-600" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-forest-700" />;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      {/* Header */}
      <div className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#163832] border border-[#8EB69B]/40 text-[#8EB69B] flex items-center justify-center font-bold shadow-sm">
              <ShieldAlert className="w-6 h-6 text-[#8EB69B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#051F20] bg-[#8EB69B] px-2.5 py-0.5 rounded-md">
                  All-Hazard Agricultural Defense
                </span>
                <span className="text-xs text-[#8EB69B] font-medium">IMD / CWC / ICAR Synoptic Grid</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Agricultural Risk & Early Warning Center
              </h1>
              <p className="text-xs sm:text-sm text-[#DAF1DE]">
                Continuous risk surveillance covering 8 major threat categories throughout the Indian crop lifecycle.
              </p>
            </div>
          </div>

          {activeFarm && (
            <div className="bg-[#163832] p-3 rounded-2xl border border-[#235347] text-xs">
              <span className="text-[#8EB69B] block text-[11px]">Active Monitored Farm</span>
              <strong className="text-white">{activeFarm.farmerName}'s Farm</strong>
              <div className="text-emerald-300 font-semibold">{activeFarm.village}, {activeFarm.district} ({activeFarm.cropType.toUpperCase()})</div>
            </div>
          )}
        </div>
      </div>

      {/* Accuracy & Grounding Transparency Notice */}
      <div className="bg-[#163832] border border-[#235347] p-4 rounded-2xl flex items-start gap-3 text-xs text-[#DAF1DE]">
        <Info className="w-5 h-5 text-[#8EB69B] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Scientific Transparency Guarantee:</strong> FieldShield AI never fabricates live forecasts or claims unsupported AI precision. Risk ratings and surveillance indicators are derived directly from certified data feeds: India Meteorological Department (IMD) Agromet bulletins, Central Water Commission (CWC) river gauges, ICAR Directorate of Plant Protection, and National Center for Integrated Pest Management (NCIPM).
        </div>
      </div>

      {/* Category Filter Pills (Interactive Buttons) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#8EB69B]">
            Select Risk Module:
          </span>
          <span className="text-xs text-[#DAF1DE]">
            Showing {filteredRisks.length} active risk bulletins
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#8EB69B] text-[#051F20] shadow-md font-black'
                : 'bg-[#0B2B26] border border-[#235347] text-[#DAF1DE] hover:bg-[#163832]'
            }`}
          >
            <span>All 8 Risk Modules</span>
          </button>

          {RISK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#8EB69B] text-[#051F20] shadow-md font-black'
                    : 'bg-[#0B2B26] border border-[#235347] text-[#DAF1DE] hover:bg-[#163832]'
                }`}
              >
                <span>{cat.nativeLabel[language as 'en' | 'hi' | 'pa'] || cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Risk Items Feed */}
      <div className="space-y-5">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="gov-card p-6 space-y-4 border-l-4 border-l-forest-700"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  {getCategoryIcon(risk.category)}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {RISK_CATEGORIES.find((c) => c.key === risk.category)?.label}
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {risk.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border ${getSeverityBadge(risk.severity)}`}>
                  {risk.severity} Severity
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {risk.lastUpdated}
                </span>
              </div>
            </div>

            {/* Affected Crop & Verified Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#051F20] p-3.5 rounded-2xl border border-[#235347]">
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold">Affected Crops & Zones</span>
                <span className="font-bold text-white">{risk.affectedFarmOrCrop}</span>
              </div>
              <div>
                <span className="text-[#8EB69B] block text-[11px] font-semibold">Official Data Source</span>
                <span className="font-semibold text-emerald-300">{risk.dataSource}</span>
              </div>
            </div>

            {/* Preventive Actions & Recovery Guidance Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Preventive Steps */}
              <div className="space-y-2">
                <h4 className="font-black text-[#8EB69B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8EB69B]" />
                  <span>Immediate Preventive Safeguards</span>
                </h4>
                <ul className="space-y-1.5 text-[#DAF1DE] leading-relaxed">
                  {risk.preventiveActions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8EB69B] font-bold">1.{idx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recovery Guidance */}
              <div className="space-y-2">
                <h4 className="font-black text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Field Recovery Guidance & Restoration</span>
                </h4>
                <ul className="space-y-1.5 text-[#DAF1DE] leading-relaxed">
                  {risk.recoveryGuidance.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">2.{idx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scientific Notice Footer */}
            <div className="pt-2 border-t border-[#235347] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#DAF1DE]">
              <div>{risk.dataReliabilityNotice}</div>
              <button
                onClick={() => setActivePage('floodMap')}
                className="text-emerald-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Real-Time Farm Map</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
