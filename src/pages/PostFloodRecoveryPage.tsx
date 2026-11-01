import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import {
  RotateCcw,
  ShieldCheck,
  Droplets,
  Sprout,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const PostFloodRecoveryPage: React.FC = () => {
  const { t, activeFarm, setActivePage, language } = useApp();
  const cropInfo = activeFarm ? CROPS_DATA[activeFarm.cropType] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t.recovery.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.recovery.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('reports')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>{t.recovery.generateReportCta}</span>
        </button>
      </div>

      {/* 5-Step Agronomic Field Recovery Pipeline */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Sequential Field Recovery Protocol
        </h2>

        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center shrink-0 font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              {t.recovery.stepSafeEntry}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.recovery.stepSafeEntryDesc}
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center shrink-0 font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              {t.recovery.stepDrainage}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.recovery.stepDrainageDesc}
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center shrink-0 font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              {t.recovery.stepSilt}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.recovery.stepSiltDesc}
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center shrink-0 font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              {t.recovery.stepNutrition}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.recovery.stepNutritionDesc}
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-center shrink-0 font-bold text-sm">
            5
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              {t.recovery.stepDisease}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.recovery.stepDiseaseDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Crop-Specific Recovery Guidance for Active Farm */}
      {cropInfo && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sprout className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {cropInfo.postFloodRecoveryGuidelines.title[language as 'en' | 'hi' | 'pa'] || cropInfo.postFloodRecoveryGuidelines.title.en}
            </h2>
          </div>

          <div className="space-y-3">
            {cropInfo.postFloodRecoveryGuidelines.steps.map((st, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs leading-relaxed"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  {st[language as 'en' | 'hi' | 'pa'] || st.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documentation Prompt */}
      <div className="bg-slate-100 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Photograph Visible Crop Damage & Silt
          </h3>
          <p className="text-xs text-slate-500">
            Use our AI Crop Photo Assessment tool to evaluate visible symptoms and compile formal insurance documentation.
          </p>
        </div>
        <button
          onClick={() => setActivePage('photoAssess')}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition shrink-0"
        >
          {t.nav.photoAssess} →
        </button>
      </div>
    </div>
  );
};
