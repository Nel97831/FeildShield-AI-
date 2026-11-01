import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_FLOOD_WARNINGS, RIVER_GAUGES } from '../data/mockFloodData';
import { WarningSeverity } from '../types';
import {
  AlertTriangle,
  CloudRain,
  ExternalLink,
  ShieldAlert,
  Droplets,
  Wind,
  Clock,
  Compass,
  Info
} from 'lucide-react';

export const WeatherWarningsPage: React.FC = () => {
  const { t, weatherData, activeFarm } = useApp();
  const [severityFilter, setSeverityFilter] = useState<'all' | WarningSeverity>('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');

  const filteredWarnings = OFFICIAL_FLOOD_WARNINGS.filter((w) => {
    if (severityFilter !== 'all' && w.severity !== severityFilter) return false;
    if (selectedStateFilter !== 'all' && w.state !== selectedStateFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t.warnings.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.warnings.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Official Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          {t.warnings.officialDisclaimer}
        </div>
      </div>

      {/* Localized Weather Forecast Card */}
      {weatherData && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Localized Agro-Meteorological Forecast ({activeFarm?.district || 'General'}, {activeFarm?.state || 'India'})
              </h2>
            </div>
            <div className="text-[11px] text-slate-500">
              Updated: {weatherData.lastUpdated}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500">Surface Temp</div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {weatherData.temp}°C
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-0.5">
                {weatherData.condition}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500">24-Hour Observed Rain</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {weatherData.rainfall24h} mm
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Relative Humidity: {weatherData.humidity}%
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500">Expected 48h Precipitation</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {weatherData.forecastRainfall48h} mm
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                24h Window: {weatherData.forecastRainfall24h} mm
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500">Wind & Cloud</div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {weatherData.windSpeed} km/h
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Cloud Cover: {weatherData.cloudCover}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1">
            Filter Alerts:
          </span>
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              severityFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {t.warnings.filterAll}
          </button>
          <button
            onClick={() => setSeverityFilter('red')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              severityFilter === 'red'
                ? 'bg-red-600 text-white shadow'
                : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
            }`}
          >
            {t.warnings.filterRed}
          </button>
          <button
            onClick={() => setSeverityFilter('orange')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              severityFilter === 'orange'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
            }`}
          >
            {t.warnings.filterOrange}
          </button>
          <button
            onClick={() => setSeverityFilter('yellow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              severityFilter === 'yellow'
                ? 'bg-yellow-400 text-slate-950 shadow'
                : 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300'
            }`}
          >
            {t.warnings.filterYellow}
          </button>
        </div>

        <div>
          <select
            value={selectedStateFilter}
            onChange={(e) => setSelectedStateFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold"
          >
            <option value="all">All States</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Bihar">Bihar</option>
            <option value="Assam">Assam</option>
          </select>
        </div>
      </div>

      {/* Official Flood Bulletins List */}
      <div className="space-y-4">
        {filteredWarnings.map((warn) => {
          const isRed = warn.severity === 'red';
          const isOrange = warn.severity === 'orange';
          return (
            <div
              key={warn.id}
              className={`p-6 rounded-3xl border transition shadow-sm ${
                isRed
                  ? 'bg-red-50/80 dark:bg-red-950/40 border-red-300 dark:border-red-900'
                  : isOrange
                  ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900'
                  : 'bg-yellow-50/80 dark:bg-yellow-950/40 border-yellow-300 dark:border-yellow-900'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs uppercase font-black px-2.5 py-1 rounded-lg tracking-wider ${
                      isRed
                        ? 'bg-red-600 text-white'
                        : isOrange
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-yellow-400 text-slate-950'
                    }`}
                  >
                    {warn.severity.toUpperCase()} FLOOD WARNING
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {warn.district}, {warn.state}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.warnings.updatedAtPrefix} {warn.lastUpdated}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {warn.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {warn.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px]">{t.warnings.basinPrefix}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{warn.riverBasin}</div>
                  {warn.waterLevelCurrent && (
                    <div className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-0.5">
                      Current Water Level: {warn.waterLevelCurrent}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-slate-500 text-[11px]">{t.warnings.threatPeriodPrefix}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{warn.expectedThreatPeriod}</div>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 text-[11px]">{t.warnings.uncertaintyPrefix}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {warn.uncertaintyNotes}
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    {t.warnings.sourcePrefix} {warn.source}
                  </span>
                  <a
                    href={warn.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* River Gauges Directory */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span>Central Water Commission (CWC) Key River Gauge Monitoring Stations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RIVER_GAUGES.map((gauge) => {
            const isDanger = gauge.status === 'danger';
            return (
              <div
                key={gauge.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {gauge.stationName}
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    isDanger ? 'bg-red-600 text-white' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {gauge.status}
                  </span>
                </div>
                <div className="text-slate-500">
                  River {gauge.river} • {gauge.district}, {gauge.state}
                </div>
                <div className="flex justify-between items-center text-sm font-extrabold pt-1">
                  <span>Current: {gauge.currentLevelMeters} m</span>
                  <span className="text-xs text-slate-400 font-normal">Danger: {gauge.dangerLevelMeters} m</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Trend: {gauge.trend.toUpperCase()} • {gauge.lastObserved}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
