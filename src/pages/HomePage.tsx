import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ArrowRight,
  Map,
  ShieldCheck,
  Building2,
  Sprout,
  PlusCircle,
  PhoneCall,
  Radio,
  CloudRain,
  Flame,
  Bug,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, language, t } = useApp();

  // Dynamic localization strings based on active language
  const isHi = language === 'hi';
  const isPa = language === 'pa';

  return (
    <div className="space-y-8 pb-16 font-sans max-w-6xl mx-auto text-slate-200 animate-fade-in-up">
      {/* 1. Live Animated Emergency & Surveillance Ticker Marquee */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B2B26] border border-[#235347] py-2.5 px-3 shadow-md flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0 bg-[#051F20] px-3 py-1 rounded-xl border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Radio className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHi ? 'लाइव राष्ट्रीय फीड' : isPa ? 'ਲਾਈਵ ਕੌਮੀ ਫੀਡ' : 'Live National Feed'}</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 mask-linear">
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2 text-white">
              <span className="text-sky-400 font-bold">🌧️ {isHi ? 'मौसम अलर्ट:' : isPa ? 'ਮੌਸਮ ਅਲਰਟ:' : 'IMD Agromet:'}</span>
              <span>{isHi ? 'पंजाब और हरियाणा नहरी क्षेत्रों में हल्की से मध्यम वर्षा' : isPa ? 'ਪੰਜਾਬ ਅਤੇ ਹਰਿਆਣਾ ਨਹਿਰੀ ਇਲਾਕਿਆਂ ਵਿੱਚ ਬਾਰਿਸ਼' : 'Isolated intense spells in Punjab & Haryana canal command zones'}</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-2 text-white">
              <span className="text-rose-400 font-bold">🌊 {isHi ? 'नदी गेज:' : isPa ? 'ਦਰਿਆਈ ਗੇਜ:' : 'CWC Gauge Alert:'}</span>
              <span>{isHi ? 'हथिनीकुंड बैराज से 42,100 क्यूसेक पानी (चेतावनी स्तर पर सुरक्षित)' : isPa ? 'ਹਥਨੀਕੁੰਡ ਬੈਰਾਜ ਤੋਂ 42,100 ਕਿਊਸਿਕ ਪਾਣੀ ਡਿਸਚਾਰਜ' : 'Yamuna Hathnikund barrage discharge at 42,100 cusecs (Warning level safe)'}</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-2 text-white">
              <span className="text-emerald-400 font-bold">🛡️ {isHi ? 'फसल बीमा (PMFBY):' : isPa ? 'ਫਸਲ ਬੀਮਾ:' : 'PMFBY Insurance:'}</span>
              <span>{isHi ? 'जलभराव की सूचना 72 घंटे के भीतर दर्ज करें' : isPa ? '72 ਘੰਟਿਆਂ ਅੰਦਰ ਨੁਕਸਾਨ ਦੀ ਰਿਪੋਰਟ ਦਰਜ ਕਰੋ' : 'Mandatory 72-hour crop inundation intimation portal live for all registered farmers'}</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('risks')}
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white shrink-0 hover:underline cursor-pointer pl-2"
        >
          <span>{isHi ? 'सभी चेतावनियां' : isPa ? 'ਸਾਰੀਆਂ ਚਿਤਾਵਨੀਆਂ' : 'All Advisories'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Hero Section: Direct Focus on Register Farm */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2B26] via-[#0F352E] to-[#072521] border border-[#235347] p-7 sm:p-12 shadow-2xl">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-float-subtle" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1.5 font-black uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <Sprout className="w-3.5 h-3.5" />
              FieldShield AI
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">
              {isHi ? 'डिजिटल कृषि सुरक्षा एवं खेत सीमांकन' : isPa ? 'ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਸੁਰੱਖਿਆ ਅਤੇ ਖੇਤ ਹੱਦਬੰਦੀ' : 'Digital Agricultural Defense & Farm Demarcation'}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-sky-300 font-medium">
              {isHi ? '11 भारतीय भाषाओं में उपलब्ध' : isPa ? '11 ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਉਪਲਬਧ' : 'Available in 11 Indian Languages'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {isHi ? (
              <>
                प्रत्येक फसल की सुरक्षा। <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300">
                  हर नुकसान में कमी।
                </span>
              </>
            ) : isPa ? (
              <>
                ਹਰ ਫਸਲ ਦੀ ਸੁਰੱਖਿਆ। <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300">
                  ਹਰ ਨੁਕਸਾਨ ਨੂੰ ਘਟਾਓ।
                </span>
              </>
            ) : (
              <>
                Protect Every Crop. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300">
                  Reduce Every Loss.
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#DAF1DE] leading-relaxed font-normal max-w-2xl">
            {t.home?.heroSubtitle || (isHi
              ? 'भारतीय किसानों के लिए विशेष रूप से डिज़ाइन किया गया। खेत के नक्शे, उपग्रह निगरानी, बहु-जोखिम अलर्ट और आपदा फसल क्षति सुधार की संपूर्ण सुविधा।'
              : isPa
              ? 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਤਿਆਰ। ਖੇਤ ਹੱਦਬੰਦੀ, ਉਪਗ੍ਰਹਿ ਨਿਗਰਾਨੀ, ਹੜ੍ਹ ਤੇ ਮੌਸਮ ਅਲਰਟ ਅਤੇ ਫਸਲ ਨੁਕਸਾਨ ਮੁਆਵਜ਼ਾ ਸਹਾਇਤਾ।'
              : 'A comprehensive agricultural protection platform empowering Indian farmers throughout the crop lifecycle — from farm location mapping and boundary demarcation to multi-hazard risk monitoring, automated alerts, and disaster recovery.')}
          </p>

          {/* Primary Action Buttons: ONE UNIFIED REGISTER FARM BUTTON */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => setActivePage('register')}
              className="button-glow-active btn-shimmer bg-gradient-to-r from-[#8EB69B] via-[#b4dfb4] to-[#8EB69B] hover:bg-white text-[#051F20] font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(142,182,155,0.7)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center gap-3 cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
            >
              <PlusCircle className="w-5 h-5 text-[#051F20]" />
              <span>
                {isHi ? 'खेत पंजीकृत करें और सीमांकन करें' : isPa ? 'ਖੇਤ ਰਜਿਸਟਰ ਕਰੋ ਅਤੇ ਹੱਦਬੰਦੀ ਕਰੋ' : 'Register Farm & Demarcate Location'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#051F20]" />
            </button>

            <button
              onClick={() => setActivePage('dashboard')}
              className="card-interactive bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] hover:border-slate-400 font-bold text-xs sm:text-sm px-6 py-4 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.nav?.dashboard || (isHi ? 'किसान डैशबोर्ड खोलें' : isPa ? 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ' : 'Open Farmer Dashboard')}</span>
            </button>

            <button
              onClick={() => setActivePage('floodMap')}
              className="card-interactive bg-[#163832] hover:bg-[#235347] text-slate-200 hover:text-white border border-[#235347] hover:border-sky-400/50 font-bold text-xs sm:text-sm px-5 py-4 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <Map className="w-4 h-4 text-sky-400" />
              <span>{t.nav?.floodMap || (isHi ? 'खेत नक्शा व उपग्रह' : isPa ? 'ਖੇਤ ਨਕਸ਼ਾ ਅਤੇ ਉਪਗ੍ਰਹਿ' : 'Farm Map & Satellite')}</span>
            </button>

            <button
              onClick={() => setActivePage('risks')}
              className="card-interactive bg-[#163832] hover:bg-[#235347] text-amber-200 hover:text-white border border-amber-500/30 hover:border-amber-400 font-bold text-xs sm:text-sm px-5 py-4 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{isHi ? '8-जोखिम निगरानी' : isPa ? '8-ਜੋਖਮ ਨਿਗਰਾਨੀ' : '8-Risk Monitoring'}</span>
            </button>
          </div>
        </div>

        {/* Workflow Chain Strip */}
        <div className="mt-10 pt-6 border-t border-[#235347] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Complete Agricultural Lifecycle Chain:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300 font-medium">
            <span className="text-emerald-300 font-bold">1. Farm Location & Details</span>
            <span className="text-slate-600">→</span>
            <span className="text-sky-300 font-bold">2. Boundary Demarcation</span>
            <span className="text-slate-600">→</span>
            <span className="text-teal-300 font-bold">3. Satellite Surveillance</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-300 font-bold">4. Multi-Risk Monitoring</span>
            <span className="text-slate-600">→</span>
            <span className="text-rose-300 font-bold">5. Real-Time Warnings</span>
            <span className="text-slate-600">→</span>
            <span className="text-white font-bold">6. Rapid Loss Recovery</span>
          </div>
        </div>
      </section>

      {/* 3. Three Core Service Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: Cadastral Farm Demarcation & Google Earth 3D */}
        <div
          onClick={() => setActivePage('dashboard')}
          className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-emerald-400/60 rounded-2xl p-6 cursor-pointer space-y-4 flex flex-col justify-between shadow-md group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base group-hover:text-emerald-300 transition-colors">
                Cadastral Farm Demarcation & Portfolio
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-black">
                Active Parcels
              </span>
            </div>
            <p className="text-xs text-[#DAF1DE] leading-relaxed">
              Inspect cadastral boundary coordinates, high-resolution NDVI vegetation health index, and live waterlogging risk across all registered farm holdings.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
            <span>View Farm Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Pillar 2: 8 Agricultural Risk Modules */}
        <div
          onClick={() => setActivePage('risks')}
          className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-amber-400/60 rounded-2xl p-6 cursor-pointer space-y-4 flex flex-col justify-between shadow-md group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <ShieldAlert className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base group-hover:text-amber-200 transition-colors">
                8 Agricultural Risk Modules
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-black">
                All-Hazard
              </span>
            </div>
            <p className="text-xs text-[#DAF1DE] leading-relaxed">
              Separate surveillance modules for Floods, Drought, Heatwaves/Frost, Storms, Diseases, Pests, Soil stress, and Post-Harvest Storage losses.
            </p>
          </div>
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 pt-1">
            <span>Explore Risk Center</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Pillar 3: Interactive Farm Map & Google Earth */}
        <div
          onClick={() => setActivePage('floodMap')}
          className="card-interactive bg-[#0B2B26] border border-[#235347] hover:border-sky-400/60 rounded-2xl p-6 cursor-pointer space-y-4 flex flex-col justify-between shadow-md group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
              <Map className="w-6 h-6 text-sky-400" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base group-hover:text-sky-300 transition-colors">
                Farm Map & Google Earth
              </h3>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded font-black">
                Geospatial
              </span>
            </div>
            <p className="text-xs text-[#DAF1DE] leading-relaxed">
              High-resolution satellite view, 3D terrain exploration, real-time river gauge levels, and flood extent risk calculation for your parcel.
            </p>
          </div>
          <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5 pt-1">
            <span>Open Farm Map</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* 4. 8 Risk Categories Overview Card */}
      <section className="bg-[#0B2B26] border border-[#235347] rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#235347] pb-4">
          <div>
            <h2 className="text-lg font-black text-white">
              Surveillance Across 8 Agricultural Threat Categories
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Backed by verified data from IMD, Central Water Commission, and Google Earth Satellite Observation.
            </p>
          </div>
          <button
            onClick={() => setActivePage('risks')}
            className="text-xs font-bold text-emerald-400 hover:text-white flex items-center gap-1 cursor-pointer transition hover:underline"
          >
            <span>View All Modules</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-sky-500/20 space-y-1.5">
            <div className="font-bold text-sky-300 flex items-center gap-1.5">
              <span>🌊 Floods & Waterlogging</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Barrage discharge, canal breach & prolonged field water stagnation.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-amber-500/20 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>☀️ Drought & Dry Spells</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Monsoon rainfall deficits, AWD scheduling & root zone moisture stress.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-rose-500/20 space-y-1.5">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>🔥 Heatwaves & Frost</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Thermal shock during flowering and winter ground frost defense.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-indigo-500/20 space-y-1.5">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <span>⛈️ Excessive Rain & Storms</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Squalls above 50 km/h, crop lodging risk & hailstorm field surveys.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-teal-500/20 space-y-1.5">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <span>🦠 Crop Diseases</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Bacterial leaf blight, sheath rot, blast & fungal wilt advisories.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-emerald-500/20 space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <span>🐛 Pest Attacks</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Pink bollworm, stem borer, whitefly & Economic Threshold surveillance.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-amber-500/20 space-y-1.5">
            <div className="font-bold text-amber-200 flex items-center gap-1.5">
              <span>🌱 Soil & Irrigation</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Salinity, sodicity hardpan, tubewell power failure & gypsum treatment.</p>
          </div>
          <div className="card-interactive p-3.5 bg-[#163832] rounded-xl border border-slate-500/20 space-y-1.5">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span>📦 Post-Harvest Storage</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">Grain moisture &lt;12%, mold/aflatoxins & open-mandi rain protection.</p>
          </div>
        </div>
      </section>

      {/* 5. 24x7 Government Helpline Strip */}
      <section className="bg-[#0B2B26] border border-[#235347] text-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>24x7 Official Emergency Support Lines</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Need Expert Agronomic Advice or Disaster Emergency Assistance?
          </h3>
          <p className="text-xs text-slate-400">
            Toll-free government helplines operated round the clock across Indian states.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:1078"
            className="card-interactive bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Disaster Helpline (NDMA): 1078</span>
          </a>
          <a
            href="tel:112"
            className="card-interactive bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/50 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span>National Emergency: 112</span>
          </a>
          <a
            href="tel:1070"
            className="card-interactive bg-[#163832] hover:bg-[#235347] text-emerald-300 border border-emerald-500/40 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>State SDMA: 1070</span>
          </a>
        </div>
      </section>
    </div>
  );
};
