import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, Sprout, BellRing, ShieldAlert, Map, Camera, CalendarCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-[#051F20] border-t border-[#235347] text-slate-300 mt-20 pt-14 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#163832] border border-[#235347] flex items-center justify-center text-emerald-400 shadow-md">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">FieldShield AI</span>
            </div>
            <p className="text-xs text-[#DAF1DE] leading-relaxed">
              Comprehensive crop protection, farm location mapping, 8-hazard agricultural risk surveillance, and disaster recovery assistance platform for Indian farmers.
            </p>
            <div className="p-3 rounded-xl bg-[#0B2B26] border border-[#235347] text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block mb-0.5">
                Official Vision:
              </span>
              "Protect Every Crop. Reduce Every Loss."
            </div>
          </div>

          {/* Col 2: Core Agricultural Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
              Core Agricultural Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => setActivePage('register')} className="hover:text-white transition font-bold text-emerald-400 cursor-pointer">
                  + Register Farm Location
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-white transition cursor-pointer">
                  Farmer Field Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('risks')} className="hover:text-white transition font-medium cursor-pointer">
                  8-Hazard Agricultural Risk Center
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('floodMap')} className="hover:text-white transition cursor-pointer">
                  Interactive Cadastral & Satellite Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Advisory & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3">
              Advisory & Safety Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => setActivePage('photoAssess')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Crop Symptom Photo Assessment</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('planner')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Crop Planner & Tasks</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('smsAlerts')} className="hover:text-white transition flex items-center gap-1.5 font-bold text-amber-300 cursor-pointer">
                  <BellRing className="w-3.5 h-3.5 text-amber-400" />
                  <span>SMS Warning System</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('customerCare')} className="hover:text-white transition cursor-pointer flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>Emergency & Disaster Helplines</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dataSources')} className="hover:text-white transition cursor-pointer">
                  Data Sources & Standards
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-custom-domain-modal'))}
                  className="hover:text-emerald-300 text-emerald-400 font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Custom Domain & GitHub Deploy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official 24x7 Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Official 24x7 Helplines</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="card-interactive bg-[#0B2B26] p-2.5 rounded-xl border border-amber-500/40">
                <div className="text-[11px] text-slate-300">National Disaster Helpline (NDMA)</div>
                <a href="tel:1078" className="font-black text-amber-300 hover:text-white hover:underline text-sm block mt-0.5">
                  1078 (Disaster Hotline)
                </a>
              </div>
              <div className="card-interactive bg-[#0B2B26] p-2.5 rounded-xl border border-rose-500/40">
                <div className="text-[11px] text-slate-300">National Emergency Response</div>
                <a href="tel:112" className="font-black text-rose-300 hover:text-white hover:underline text-sm block mt-0.5">
                  112 (Emergency Rescue)
                </a>
              </div>
              <div className="card-interactive bg-[#0B2B26] p-2.5 rounded-xl border border-emerald-500/40">
                <div className="text-[11px] text-slate-300">State Disaster Management (SDMA)</div>
                <a href="tel:1070" className="font-black text-emerald-300 hover:text-white hover:underline text-sm block mt-0.5">
                  1070 (State Control Room)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#235347] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-white font-medium">
            FieldShield AI · Agricultural Defense & Disaster Preparedness Platform
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="text-[#DAF1DE]">CWC · IMD · ICAR · ESA Sentinel-1 Satellite Data Integrated</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
