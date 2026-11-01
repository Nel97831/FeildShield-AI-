import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  NATIONAL_EMERGENCY_CONTACTS,
  STATE_EMERGENCY_CONTACTS,
  getEmergencyContactsForState
} from '../data/emergencyContacts';
import {
  ShieldAlert,
  PhoneCall,
  Zap,
  Waves,
  Users,
  Compass,
  CheckCircle,
  Download,
  AlertTriangle,
  Info
} from 'lucide-react';

export const DuringFloodSafetyPage: React.FC = () => {
  const { t, activeFarm, language } = useApp();
  const [selectedState, setSelectedState] = useState(activeFarm?.state || 'Punjab');

  const emergencyContacts = getEmergencyContactsForState(selectedState);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-red-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {t.safety.title}
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1">
              {t.safety.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Save / Print Offline Guide</span>
        </button>
      </div>

      {/* Offline Availability Notice */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="leading-relaxed">
          {t.safety.offlineNotice}
        </div>
      </div>

      {/* 5 Non-Negotiable Survival Protocols */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span>Mandatory Life-Safety Protocols</span>
        </h2>

        {/* Rule 1 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 font-black">
            1
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 text-red-600 dark:text-red-400">
              {t.safety.rule1Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.safety.rule1Desc}
            </p>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-black">
            2
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.safety.rule2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.safety.rule2Desc}
            </p>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-black">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.safety.rule3Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.safety.rule3Desc}
            </p>
          </div>
        </div>

        {/* Rule 4 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-black">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.safety.rule4Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.safety.rule4Desc}
            </p>
          </div>
        </div>

        {/* Rule 5 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-black">
            <Waves className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.safety.rule5Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.safety.rule5Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Verified 24x7 Helplines Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-500" />
              <span>{t.safety.emergencyHotlineHeader}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Direct emergency helpline desk for state & national flood response
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100"
            >
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Assam">Assam</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {contact.nativeAgencyName[language as 'en' | 'hi' | 'pa'] || contact.agencyName}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                    {contact.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {contact.hours} • State: {contact.state}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Direct Emergency Dial:</span>
                <a
                  href={`tel:${contact.tollFree || contact.phone}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{contact.tollFree || contact.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
