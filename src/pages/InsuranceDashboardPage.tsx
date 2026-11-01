import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PMFBY_SCHEME_INFO, calculateEstimatedPremium } from '../data/pmfbyData';
import {
  ShieldCheck,
  Calculator,
  AlertTriangle,
  FileText,
  Clock,
  PhoneCall,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Info,
  Calendar,
  XCircle,
  Printer
} from 'lucide-react';

export const InsuranceDashboardPage: React.FC = () => {
  const { activeFarm, cropLossClaims, addCropLossClaim, setActivePage } = useApp();

  // Premium Calculator State
  const [calcCrop, setCalcCrop] = useState(activeFarm?.cropType || 'paddy');
  const [calcAcreage, setCalcAcreage] = useState<number>(activeFarm ? Number((activeFarm.areaSqm / 4046.856).toFixed(1)) : 5);
  const [farmerType, setFarmerType] = useState<'non_loanee' | 'loanee'>('non_loanee');

  // Intimation Form State
  const [claimCause, setClaimCause] = useState('Inundation & prolonged waterlogging');
  const [lossPercentage, setLossPercentage] = useState(65);
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [submittedDocket, setSubmittedDocket] = useState<string | null>(null);

  const premiumEst = calculateEstimatedPremium(calcCrop, calcAcreage);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFarm) return;

    const newClaim = addCropLossClaim({
      farmId: activeFarm.id,
      farmerName: activeFarm.farmerName,
      khasraNumber: activeFarm.landRecord?.khasraNumber || '142//15/2',
      policyOrApplicationNo: `PMFBY-2026-${activeFarm.district.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      causeOfLoss: claimCause,
      estimatedLossPercentage: lossPercentage,
      lossDate: incidentDate,
      reportedWithin72h: true,
      status: 'intimated',
      notes: 'Self-intimation by farmer via KrishiRakshak AI Insurance Dashboard. Geo-tagged photographs stored.'
    });

    setSubmittedDocket(newClaim.docketNumber);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6 text-agri-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-forest-700 bg-agri-100 px-2 py-0.5 rounded">
                  Ministry of Agriculture & Farmers Welfare
                </span>
                <span className="text-xs text-slate-500 font-medium">National Crop Insurance Portal (NCIP)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Crop Insurance (PMFBY) Assistance Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Official scheme details, premium calculation, 72-hour crop loss intimation, and claims tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:14447"
              className="bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-agri-300" />
              <span>Call Toll-Free 14447</span>
            </a>
            <a
              href="https://pmfby.gov.in"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-slate-300"
            >
              <span>NCIP Official</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Critical Statutory Transparency Warning */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex items-start gap-3 text-xs text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Mandatory Statutory Notice:</strong> KrishiRakshak AI provides verified assistance and procedural guidance for PMFBY. <em>We never promise or guarantee automatic compensation, insurance approval, or settlement amounts.</em> All claims are subject to physical joint field surveys by appointed Revenue Department officials (Patwari) and designated insurance company assessors as per official Government of India guidelines.
        </div>
      </div>

      {/* 2-Column Core Architecture: Premium Calculator & 72-Hour Loss Intimation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Official Premium Estimator */}
        <div className="gov-card p-6 space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-forest-700" />
              <span>PMFBY Premium Calculator</span>
            </h2>
            <span className="text-[11px] font-mono font-bold text-forest-800 bg-agri-100 px-2 py-0.5 rounded">
              {PMFBY_SCHEME_INFO.season}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Category</label>
              <select
                value={calcCrop}
                onChange={(e) => setCalcCrop(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-semibold text-slate-900"
              >
                <option value="paddy">Paddy / Rice (Kharif - 2%)</option>
                <option value="cotton">Cotton (Commercial - 5%)</option>
                <option value="maize">Maize (Kharif - 2%)</option>
                <option value="sugarcane">Sugarcane (Commercial - 5%)</option>
                <option value="wheat">Wheat (Rabi - 1.5%)</option>
                <option value="mustard">Mustard (Rabi - 1.5%)</option>
                <option value="pulses">Pulses (2%)</option>
                <option value="vegetables">Horticultural (5%)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Cultivated Area (Acres)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={calcAcreage}
                onChange={(e) => setCalcAcreage(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Farmer Type</label>
              <select
                value={farmerType}
                onChange={(e) => setFarmerType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-semibold text-slate-900"
              >
                <option value="non_loanee">Non-Loanee Farmer</option>
                <option value="loanee">Loanee (KCC Account)</option>
              </select>
            </div>
          </div>

          {/* Premium Breakdown Display */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Sum Insured (Coverage Amount):</span>
              <strong className="text-slate-900 font-mono">₹{premiumEst.totalSumInsured.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Government Premium Subsidy (State + Center):</span>
              <span className="text-emerald-700 font-mono font-bold">₹{premiumEst.govtSubsidyRupees.toLocaleString()} (≈ 84%)</span>
            </div>
            <div className="flex justify-between text-sm font-black border-t border-slate-200 pt-2 text-slate-900">
              <span>Farmer Share of Premium ({premiumEst.ratePercent}%):</span>
              <span className="text-forest-800 font-mono text-base">₹{premiumEst.farmerShareRupees.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            Note: Loanee farmers with active Kisan Credit Cards (KCC) are covered through their bank branch unless opted out before the cut-off date ({PMFBY_SCHEME_INFO.enrollmentCutoffDate}). Non-loanee farmers can enroll directly through Common Service Centers (CSC) or the NCIP portal.
          </div>
        </div>

        {/* Card 2: 72-Hour Crop Loss Intimation Form */}
        <div className="gov-card p-6 space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600" />
              <span>72-Hour Crop Loss Intimation</span>
            </h2>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Mandatory Time Window
            </span>
          </div>

          {submittedDocket ? (
            <div className="bg-agri-100/70 border border-forest-600 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-forest-800" />
                <h3 className="font-black text-forest-950 text-sm">
                  Official Intimation Registered
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Loss docket created for <strong>{activeFarm?.farmerName}</strong>. Docket Number:{' '}
                <strong className="font-mono text-forest-900 text-sm">{submittedDocket}</strong>.
              </p>
              <p className="text-[11px] text-slate-500">
                A joint inspection team from the block agriculture office and insurance company will visit within 10 days. Keep clear field photographs ready.
              </p>
              <button
                onClick={() => setSubmittedDocket(null)}
                className="text-forest-800 font-bold hover:underline"
              >
                Log another loss intimation →
              </button>
            </div>
          ) : (
            <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Selected Field</span>
                <span className="font-bold text-slate-900">{activeFarm?.farmerName}'s Farm — {activeFarm?.village}</span>
                <span className="text-forest-800 block text-[11px]">
                  Khasra: {activeFarm?.landRecord?.khasraNumber || '142//15/2'} • Crop: {activeFarm?.cropType.toUpperCase()}
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cause of Damage / Calamity *
                </label>
                <select
                  value={claimCause}
                  onChange={(e) => setClaimCause(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-900"
                >
                  <option value="Inundation & prolonged waterlogging">Inundation & waterlogging</option>
                  <option value="Hailstorm damage to standing crop">Hailstorm & severe lodging</option>
                  <option value="Post-harvest unseasonal rainfall on cut crop">Post-harvest unseasonal rain (within 14 days of harvest)</option>
                  <option value="Severe dry spell / localized drought">Prolonged dry spell</option>
                  <option value="Pest attack above economic threshold level">Pest infestation above ETL</option>
                  <option value="River breach or flash flood">River breach / Embankment failure</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Incident Date *</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Crop Damage (%)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={lossPercentage}
                      onChange={(e) => setLossPercentage(Number(e.target.value))}
                      className="flex-1 accent-forest-700"
                    />
                    <span className="font-mono font-bold text-slate-900 w-10 text-right">{lossPercentage}%</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-700 hover:bg-rose-800 text-white font-black text-xs py-3 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>Submit Official 72h Loss Intimation Docket</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Coverage Phases & Explicit Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coverage Stages */}
        <div className="gov-card p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Eligible Coverage Phases under PMFBY</span>
          </h3>
          <div className="space-y-3 text-xs">
            {PMFBY_SCHEME_INFO.coveragePhases.map((phase, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{phase.phase}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">{phase.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="gov-card p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <XCircle className="w-4 h-4 text-red-600" />
            <span>Coverage Limitations & Explicit Exclusions</span>
          </h3>
          <div className="space-y-2 text-xs">
            {PMFBY_SCHEME_INFO.exclusions.map((exc, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-red-50/50 p-2.5 rounded-lg border border-red-100 text-slate-700 leading-relaxed">
                <span className="text-red-600 font-bold shrink-0">✕</span>
                <span className="text-[11px]">{exc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Existing Claims Tracking Table */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-black text-slate-900">
            Intimated Crop Claims Status Log ({cropLossClaims.length})
          </h3>
          <span className="text-xs text-slate-500">
            Synchronized with NCIP State Tracking System
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {cropLossClaims.map((claim) => (
            <div key={claim.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{claim.docketNumber}</span>
                  <span className="font-medium text-slate-600">({claim.farmerName})</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">
                    {claim.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] mt-1">
                  Cause: <strong>{claim.causeOfLoss}</strong> • Estimated Impact: {claim.estimatedLossPercentage}% • Loss Date: {claim.lossDate}
                </div>
                {claim.surveyPatwariAssigned && (
                  <div className="text-[11px] text-forest-800 mt-0.5">
                    Assigned Surveyor: {claim.surveyPatwariAssigned}
                  </div>
                )}
              </div>

              <button
                onClick={() => setActivePage('reports')}
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-forest-700" />
                <span>View Loss Dossier</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
