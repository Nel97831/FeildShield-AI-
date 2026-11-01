import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Info,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Satellite
} from 'lucide-react';

interface DataSourceItem {
  id: string;
  name: string;
  authority: string;
  url: string;
  dataType: string;
  coverage: string;
  updateFrequency: string;
  licensing: string;
  limitations: string;
}

const DATA_REGISTRY: DataSourceItem[] = [
  {
    id: 'imd',
    name: 'India Meteorological Department (IMD)',
    authority: 'Ministry of Earth Sciences, Government of India',
    url: 'https://mausam.imd.gov.in',
    dataType: 'District Agro-Meteorological Bulletins, Severe Weather Warnings, Rainfall Observations',
    coverage: 'Pan-India (All agricultural districts and agro-climatic zones)',
    updateFrequency: 'Twice daily bulletins; radar updates every 15–30 minutes during active monsoons',
    licensing: 'Government of India Open Data / Public Meteorological Information',
    limitations: 'Precipitation is forecasted over broad administrative districts. Micro-catchment cloudbursts or sudden thunderstorms can deviate locally from district forecasts.'
  },
  {
    id: 'cwc',
    name: 'Central Water Commission (CWC)',
    authority: 'Ministry of Jal Shakti, Government of India',
    url: 'https://cwc.gov.in',
    dataType: 'River Gauge Levels, Danger Mark Monitoring, Inflow/Outflow Barrage Bulletins',
    coverage: 'Major Indian River Basins (Ganga, Brahmaputra, Indus-Sutlej, Godavari, Krishna, Narmada, Mahanadi)',
    updateFrequency: 'Hourly to Daily Flood Forecast Bulletins during monsoon watch',
    licensing: 'Official Hydrological Monitoring Data',
    limitations: 'Telemetry gauge stations measure river elevation along main channels. Embankment breaches or localized drainage backflows between gauges may not be reflected instantly.'
  },
  {
    id: 'sentinel1',
    name: 'Copernicus Sentinel-1 C-SAR (Synthetic Aperture Radar)',
    authority: 'European Space Agency (ESA) / European Commission',
    url: 'https://dataspace.copernicus.eu',
    dataType: 'Synthetic Aperture Radar (SAR) Level-1 Ground Range Detected (GRD) Backscatter (VV/VH)',
    coverage: 'Global, with systematic 6–12 day repeat orbits over Indian agricultural floodplains',
    updateFrequency: 'Orbits every 6–12 days; radar penetration through dense cloud cover and night',
    licensing: 'Copernicus Open Access Full, Free, and Open Data Policy',
    limitations: 'Radar detects surface water specular reflection. Canopies of tall mature sugarcane or orchards can mask shallow water underneath. Radar acquisitions are not instantaneous real-time live feeds.'
  },
  {
    id: 'bhuvan',
    name: 'ISRO Bhuvan & National Remote Sensing Centre (NRSC)',
    authority: 'Indian Space Research Organisation (ISRO)',
    url: 'https://bhuvan-app1.nrsc.gov.in/disaster',
    dataType: 'Flood Inundation Layers, Hydro-meteorological Basin Overlays, Cartosat DEM',
    coverage: 'All flood-prone Indian states (Assam, Bihar, UP, Punjab, Odisha, West Bengal)',
    updateFrequency: 'Event-driven flood inundation vector products during major flood crises',
    licensing: 'Disaster Management Support Programme (DMSP) Public Access',
    limitations: 'Processed vector flood extents require post-pass processing. Intended for regional disaster response assessment rather than legal land plot demarcation.'
  },
  {
    id: 'openmeteo',
    name: 'Open-Meteo High-Resolution Weather Model',
    authority: 'Open-Meteo & National Weather Services Integration',
    url: 'https://open-meteo.com',
    dataType: 'Hourly Temperature, Precipitation, Relative Humidity, Wind Speed, Cloud Cover',
    coverage: 'Global 0.1° High-Resolution Grid (~11 km resolution over India)',
    updateFrequency: 'Hourly updates calibrated with regional synoptic station models',
    licensing: 'Open Database License (ODbL) / Creative Commons BY 4.0',
    limitations: 'Forecast horizon beyond 48 hours carries inherent meteorological uncertainty. Used for farm-level preparation.'
  },
  {
    id: 'revenue_manuals',
    name: 'State Revenue Department Land Records Manuals',
    authority: 'Directorates of Land Records (Punjab, UP, Bihar, Haryana, Maharashtra, Bengal, etc.)',
    url: 'https://dilrmp.gov.in',
    dataType: 'Statutory Regional Land Measurement Conversion Factors (Bigha, Biswa, Kanal, Marla, Kattha, Guntha)',
    coverage: 'State-wise and district-wise codified revenue survey standards',
    updateFrequency: 'Statutory Acts (Punjab Land Records 1966, UP Revenue Code 2006, Bihar Tenancy Act)',
    licensing: 'Public Legal Statutes and State Gazettes',
    limitations: 'Traditional village survey chains (laggi/jarib) historically varied by a few inches in remote pockets. We use verified State Revenue Board standards.'
  }
];

export const DataSourcesPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t.dataSources.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.dataSources.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-3xl border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-5 h-5" />
          <span>Core Integrity & Anti-Fabrication Constitution</span>
        </div>
        <p className="leading-relaxed">
          {t.dataSources.transparencyNote}
        </p>
        <p className="leading-relaxed text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
          We clearly distinguish: (1) Official forecasts, (2) Satellite-observed surface water, (3) Calculated farm boundary exposure overlap, and (4) Confirmed in-field crop mortality. One does not automatically prove the other.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Satellite className="w-5 h-5 text-emerald-500" />
          <span>{t.dataSources.sourcesListHeader}</span>
        </h2>

        <div className="space-y-4">
          {DATA_REGISTRY.map((source) => (
            <div
              key={source.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {source.name}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {source.authority}
                  </div>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{source.dataType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Coverage</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{source.coverage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Update Cadence</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{source.updateFrequency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Licensing & Terms</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{source.licensing}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-700 dark:text-slate-300">Known Limitations & Uncertainty:</strong> {source.limitations}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Scientific Uncertainty & Algorithmic Ethics</span>
        </h2>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            1. <strong>No Unvalidated Probabilities:</strong> We do not fabricate numerical flood probabilities or predict precise water depth unless calibrated hydrodynamic gauges or validated model outputs explicitly support it.
          </p>
          <p>
            2. <strong>Satellite Latency Awareness:</strong> Sentinel-1 SAR imagery provides cloud-piercing radar backscatter, but image capture depends on the orbital pass schedule (every 6 to 12 days). Therefore, satellite overlays represent the exact observation timestamp and are not live video streams.
          </p>
          <p>
            3. <strong>Data Privacy By Design:</strong> Farmers' phone numbers, field boundary vertices, and uploaded crop photographs are never publicly indexed or shared with advertisers. Personal data is utilized strictly for verified flood early warning dispatch and farmer report generation.
          </p>
        </div>
      </div>
    </div>
  );
};
