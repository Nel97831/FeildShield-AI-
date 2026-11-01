import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import {
  ShieldAlert,
  Menu,
  X,
  PhoneCall,
  Globe,
  MapPin,
  FileCheck2,
  Map,
  ShieldCheck,
  Camera,
  FileText,
  Building2,
  Bot,
  BellRing,
  Check,
  ChevronDown,
  Sprout,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { CustomDomainModal } from './CustomDomainModal';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activePage,
    setActivePage,
    farms,
    activeFarmId,
    setActiveFarmId,
    activeFarm
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [customDomainModalOpen, setCustomDomainModalOpen] = useState(false);

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const farmMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click & listen to custom domain modal event
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (farmMenuRef.current && !farmMenuRef.current.contains(target)) {
        setFarmDropdownOpen(false);
      }
    };
    const handleOpenModal = () => setCustomDomainModalOpen(true);

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('open-custom-domain-modal', handleOpenModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('open-custom-domain-modal', handleOpenModal);
    };
  }, []);

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Core high-frequency navigation links (translated dynamically)
  const primaryNavLinks = [
    { id: 'home', label: t.nav?.home || 'Home', icon: Building2 },
    { id: 'dashboard', label: t.nav?.dashboard || 'Dashboard', icon: ShieldCheck },
    { id: 'floodMap', label: t.nav?.floodMap || 'Farm Map', icon: Map },
    { id: 'register', label: t.nav?.register || 'Register Farm', icon: PlusCircle },
  ];

  // Secondary tools grouped inside the "More Services" dropdown menu
  const secondaryNavLinks = [
    {
      id: 'risks',
      label: language === 'hi' ? '8-जोखिम निगरानी केंद्र' : language === 'pa' ? '8-ਜੋਖਮ ਨਿਗਰਾਨੀ ਕੇਂਦਰ' : '8-Risk Monitoring Center',
      icon: ShieldAlert,
      desc: language === 'hi' ? 'सूखा, लू, कीट व रोग अलर्ट' : language === 'pa' ? 'ਸੋਕਾ, ਲੂ, ਕੀੜੇ-ਮਕੌੜੇ ਅਲਰਟ' : 'Drought, heatwave, disease, pest alerts'
    },
    {
      id: 'photoAssess',
      label: t.nav?.photoAssess || 'Crop Photo Damage AI',
      icon: Camera,
      desc: language === 'hi' ? 'फसल क्षति फोटो अपलोड व मूल्यांकन' : language === 'pa' ? 'ਫਸਲ ਨੁਕਸਾਨ ਫੋਟੋ ਜਾਂਚ' : 'Upload crop photos for loss score'
    },
    {
      id: 'planner',
      label: t.nav?.planner || 'Crop Planner & Tasks',
      icon: Sprout,
      desc: language === 'hi' ? 'मौसमी कार्य व आपातकालीन योजना' : language === 'pa' ? 'ਮੌਸਮੀ ਕੰਮ ਅਤੇ ਸੰਕਟਕਾਲੀਨ ਯੋਜਨਾ' : 'Seasonal tasks & contingency calendar'
    },
    {
      id: 'customDomain',
      label: language === 'hi' ? 'कस्टम डोमेन व गिटहब' : language === 'pa' ? 'ਕਸਟਮ ਡੋਮੇਨ ਅਤੇ ਗਿਟਹੱਬ' : 'Custom Domain & GitHub Deploy',
      icon: Globe,
      desc: language === 'hi' ? 'GitHub Pages CNAME व DNS रिकॉर्ड्स' : language === 'pa' ? 'GitHub Pages CNAME ਅਤੇ DNS ਰਿਕਾਰਡਸ' : 'Configure CNAME, DNS & push to GitHub Pages'
    },
    {
      id: 'smsAlerts',
      label: t.nav?.settings || 'SMS & Voice Alerts',
      icon: BellRing,
      desc: language === 'hi' ? 'ग्राम स्तरीय आपातकालीन अलर्ट' : language === 'pa' ? 'ਪਿੰਡ ਪੱਧਰੀ ਐਸਐਮਐਸ ਅਲਰਟ' : 'Gram-level push notifications'
    },
    {
      id: 'customerCare',
      label: t.nav?.emergencyCall || 'Emergency & Disaster Helplines',
      icon: PhoneCall,
      desc: language === 'hi' ? 'एनडीएमए (1078), एनडीआरएफ व 112' : language === 'pa' ? 'ਕੌਮੀ ਆਫ਼ਤ (1078) ਅਤੇ ਐਮਰਜੈਂਸੀ (112)' : 'NDMA (1078), NDRF & Emergency (112)'
    },
  ];

  const isSecondaryActive = secondaryNavLinks.some((item) => item.id === activePage);

  const handleNav = (id: string) => {
    if (id === 'customDomain') {
      setCustomDomainModalOpen(true);
      setMobileMenuOpen(false);
      setMoreMenuOpen(false);
      return;
    }
    setActivePage(id);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[#0B2B26] border-b border-[#235347]">
      {/* Top Government Emergency & Language Bar */}
      <div className="bg-[#051F20] text-slate-300 px-4 sm:px-6 py-1.5 text-xs font-medium border-b border-[#235347] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Authority & Tagline */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white tracking-wide flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Sprout className="w-4 h-4 text-[#8EB69B]" />
            <span>FieldShield AI</span>
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="hidden sm:inline text-[#DAF1DE] font-medium">
            {t.appSlogan || 'Protect Every Crop · Reduce Every Loss'}
          </span>
        </div>

        {/* Right: Emergency Line, Disaster Helpline & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Emergency Helpline 112 */}
          <a
            href="tel:112"
            className="flex items-center gap-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/50 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs hover:border-rose-400"
            title="National Emergency Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>{language === 'hi' ? 'आपातकाल: 112' : language === 'pa' ? 'ਐਮਰਜੈਂਸੀ: 112' : 'Emergency: 112'}</span>
          </a>

          {/* Natural Disaster Helpline 1078 */}
          <a
            href="tel:1078"
            className="flex items-center gap-1.5 bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs hover:border-amber-400"
            title="National Disaster Helpline (NDMA)"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'आपदा: 1078' : language === 'pa' ? 'ਆਫ਼ਤ: 1078' : 'Disaster: 1078'}</span>
          </a>

          {/* Custom Domain & GitHub Quick Setup */}
          <button
            onClick={() => setCustomDomainModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            title="Configure Custom Domain, CNAME & GitHub Actions Deployment"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Custom Domain & GitHub</span>
            <span className="sm:hidden">Domain</span>
          </button>

          {/* Indian Languages Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#163832] hover:bg-[#235347] text-white border border-[#235347] px-2.5 py-1 rounded-lg text-xs transition font-semibold cursor-pointer hover:border-slate-400"
            >
              <Globe className="w-3.5 h-3.5 text-[#8EB69B]" />
              <span>{currentLangMeta.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-[#0B2B26] text-[#DAF1DE] rounded-xl shadow-2xl border border-[#235347] py-2 z-50 max-h-[75vh] overflow-y-auto">
                <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold text-[#8EB69B] border-b border-[#235347] tracking-wider">
                  Select Language / भाषा ਚੁਣੋ
                </div>
                {SUPPORTED_LANGUAGES.map((langItem) => {
                  const isSelected = language === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      onClick={() => {
                        setLanguage(langItem.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-[#163832] transition flex items-center justify-between cursor-pointer ${
                        isSelected ? 'bg-[#163832] font-bold text-[#8EB69B] border-l-4 border-[#8EB69B]' : 'text-[#DAF1DE]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{langItem.nativeName}</div>
                        <div className="text-[10px] text-[#8EB69B]">{langItem.name} · {langItem.regions}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#8EB69B] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar (#0B2B26) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#163832] border border-[#235347] text-[#8EB69B] flex items-center justify-center font-bold shadow-sm transition group-hover:scale-105 group-hover:border-[#8EB69B]">
              <Sprout className="w-5 h-5 text-[#8EB69B]" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg text-white leading-tight">
                FieldShield AI
              </div>
              <div className="text-[11px] text-[#DAF1DE] font-medium hidden sm:block">
                Protect Every Crop · Reduce Every Loss
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {primaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#163832] text-white border border-[#8EB69B]/60 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#163832]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8EB69B]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* "More Services" Dropdown to declutter the navbar */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSecondaryActive || moreMenuOpen
                    ? 'bg-[#163832] text-white border border-[#8EB69B]/60'
                    : 'text-slate-300 hover:text-white hover:bg-[#163832]'
                }`}
              >
                <span>More Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180 text-[#8EB69B]' : 'text-slate-400'}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#0B2B26] text-[#DAF1DE] rounded-2xl shadow-2xl border border-[#235347] p-2 z-50 animate-message-pop">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-300 border-b border-[#235347] tracking-wider mb-1">
                    Auxiliary Services & Tools
                  </div>
                  <div className="space-y-1">
                    {secondaryNavLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNav(item.id)}
                          className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#163832] text-white'
                              : 'hover:bg-[#163832] text-slate-300 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#8EB69B]' : 'text-slate-400'}`} />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-white">{item.label}</div>
                            <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Active Farm Selector & Highlighted Register Farm Hero Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Active Farm Selector */}
            {farms.length > 0 && (
              <div className="relative" ref={farmMenuRef}>
                <button
                  onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
                  className="flex items-center gap-1.5 bg-[#051F20] hover:bg-[#163832] text-white px-3 py-1.5 rounded-xl text-xs border border-[#235347] font-semibold transition cursor-pointer hover:border-slate-400"
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span className="truncate max-w-[120px] font-bold text-white">
                    {activeFarm?.farmerName || 'My Farm'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {farmDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-[#0B2B26] text-white rounded-xl shadow-2xl border border-[#235347] py-2 z-50">
                    <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-[#235347] tracking-wider">
                      Switch Farm Parcel
                    </div>
                    {farms.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveFarmId(f.id);
                          setFarmDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-[#163832] flex items-center justify-between transition cursor-pointer ${
                          f.id === activeFarmId ? 'bg-[#163832] font-bold text-white border-l-4 border-[#8EB69B]' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-white">{f.farmerName}</div>
                          <div className="text-[10px] text-slate-400">{f.village} ({f.cropType.toUpperCase()})</div>
                        </div>
                        <span className="text-[10px] bg-[#051F20] px-1.5 py-0.5 rounded text-sky-300 font-mono border border-[#235347]">
                          {f.enteredArea} {f.enteredUnit.split('_')[0]}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-[#235347] mt-1 pt-1 px-3">
                      <button
                        onClick={() => {
                          setFarmDropdownOpen(false);
                          handleNav('register');
                        }}
                        className="w-full text-center py-1.5 text-xs text-emerald-400 font-black hover:underline cursor-pointer flex items-center justify-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Register New Farm</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MAIN FOCUS: Register Farm CTA Button with Radiant Glow */}
            <button
              onClick={() => handleNav('register')}
              className={`button-glow-active btn-shimmer font-black text-xs px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                activePage === 'register'
                  ? 'bg-white text-[#051F20] ring-2 ring-[#8EB69B]'
                  : 'bg-[#8EB69B] hover:bg-white text-[#051F20] shadow-[0_0_24px_rgba(142,182,155,0.7)] hover:shadow-[0_0_36px_rgba(255,255,255,0.9)] transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#051F20]" />
              <span>Register Farm</span>
            </button>
          </div>

          {/* Mobile Menu Toggle & Mobile Register CTA */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('register')}
              className="btn-shimmer bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs px-3 py-1.5 rounded-xl shadow-xs"
            >
              + Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#163832] text-[#DAF1DE] hover:text-white border border-[#235347] transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B2B26] border-t border-[#235347] px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Primary Mobile Links */}
          <div className="grid grid-cols-1 gap-1">
            <div className="text-[10px] font-bold text-[#8EB69B] uppercase tracking-wider px-2 py-1">
              Main Pages
            </div>
            {primaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                    isActive ? 'bg-[#163832] text-[#8EB69B] border border-[#235347]' : 'text-[#DAF1DE] hover:bg-[#163832]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#8EB69B]' : 'text-[#8EB69B]/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8EB69B]" />
                </button>
              );
            })}
          </div>

          {/* Secondary Mobile Links */}
          <div className="grid grid-cols-1 gap-1 pt-2 border-t border-[#235347]">
            <div className="text-[10px] font-bold text-[#8EB69B] uppercase tracking-wider px-2 py-1">
              More Services & Tools
            </div>
            {secondaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    isActive ? 'bg-[#163832] text-[#8EB69B]' : 'text-[#DAF1DE]/80 hover:bg-[#163832]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#8EB69B]' : 'text-[#8EB69B]/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#8EB69B]" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#235347]">
            <div className="text-[11px] font-bold text-[#8EB69B] mb-1">Select Farm:</div>
            <select
              value={activeFarmId}
              onChange={(e) => setActiveFarmId(e.target.value)}
              className="w-full bg-[#051F20] border border-[#235347] rounded-xl p-2.5 text-xs font-bold text-[#DAF1DE] focus:outline-none focus:border-[#8EB69B]"
            >
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.farmerName} — {f.village} ({f.cropType})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Interactive Custom Domain & GitHub Modal */}
      <CustomDomainModal
        isOpen={customDomainModalOpen}
        onClose={() => setCustomDomainModalOpen(false)}
      />
    </header>
  );
};
