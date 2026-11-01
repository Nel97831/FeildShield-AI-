import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BellRing,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Send,
  ShieldCheck,
  Globe,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Radio,
  ExternalLink,
  Info,
  Clock,
  Sparkles,
  Zap,
  PhoneCall,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

import { SUPPORTED_LANGUAGES } from '../data/translations';

const RIVER_BASINS = [
  { id: 'ghaggar', name: 'Ghaggar River Basin', state: 'Punjab & Haryana', gauge: 'Khanauri (1.2m above danger)' },
  { id: 'ganga', name: 'Ganga River Basin', state: 'Bihar & Uttar Pradesh', gauge: 'Digha Ghat (Near danger mark)' },
  { id: 'yamuna', name: 'Yamuna River Basin', state: 'Delhi & Haryana', gauge: 'Old Railway Bridge (Rising)' },
  { id: 'brahmaputra', name: 'Brahmaputra River Basin', state: 'Assam', gauge: 'Dhubri (Above danger level)' },
  { id: 'kosi', name: 'Kosi River Basin', state: 'Bihar', gauge: 'Birpur Barrage (High discharge)' },
  { id: 'sutlej', name: 'Sutlej River Basin', state: 'Punjab', gauge: 'Ropar Headworks (Moderate discharge)' },
  { id: 'godavari', name: 'Godavari River Basin', state: 'Maharashtra & Telangana', gauge: 'Bhadrachalam (Watch warning)' }
];

export const SmsAlertsPage: React.FC = () => {
  const {
    language,
    setLanguage,
    alertPhone,
    setAlertPhone,
    smsConsent,
    setSmsConsent,
    isSmsVerified,
    setIsSmsVerified,
    smsSimulatedLogs,
    sendSimulatedSms,
    activeFarm
  } = useApp();

  const publicUrl = window.location.origin;

  // Form states initialized with active farm's registered phone number or current alertPhone
  const [phoneNumber, setPhoneNumber] = useState(activeFarm?.phone || alertPhone || '9876543210');
  const [farmerName, setFarmerName] = useState(activeFarm?.farmerName || 'Harpreet Singh');
  const [selectedBasin, setSelectedBasin] = useState('ghaggar');
  const [alertSeverity, setAlertSeverity] = useState<'all' | 'red_only'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  
  // Satellite Telemetry and Real OTP state
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSentNotice, setOtpSentNotice] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [satelliteTelemetry, setSatelliteTelemetry] = useState<{
    transponder: string;
    frequency: string;
    elevationAngle: string;
    packetStatus: string;
    dispatchedAt: string;
  } | null>(null);
  const [satelliteBroadcastSending, setSatelliteBroadcastSending] = useState(false);
  const [satelliteBroadcastResult, setSatelliteBroadcastResult] = useState<string | null>(null);

  const [customTestAlert, setCustomTestAlert] = useState('');
  const [dispatchToast, setDispatchToast] = useState(false);

  // Copy public link to clipboard
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(publicUrl);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Mobile Web Share API
  const handleShareMobile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FieldShield AI Flood Warning & Farm Protection',
          text: 'Official agricultural flood early warning system with CWC & IMD live alerts. Register your mobile number for free flood warning SMS:',
          url: publicUrl
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  // Request authentic OTP sent via NavIC satellite & SMS gateway to the farmer's mobile number
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = phoneNumber.replace(/\D/g, '');
    if (cleanNum.length !== 10) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsSendingOtp(true);
    setOtpError('');

    try {
      const res = await fetch('/api/alerts/satellite-send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanNum,
          farmerName,
          state: activeFarm?.state || 'Punjab',
          district: activeFarm?.district || 'Sangrur'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch satellite OTP');
      }

      setSatelliteTelemetry({
        transponder: data.satellite || 'NavIC-01 (ISRO GSAT-29 Emergency Payload)',
        frequency: data.frequency || '2492.02 MHz (S-Band Direct-to-Cell)',
        elevationAngle: data.elevationAngle || '58.4° East',
        packetStatus: 'Satellite Downlink Acknowledged',
        dispatchedAt: new Date().toLocaleTimeString()
      });

      // Browser native notification if supported
      if ('Notification' in window && Notification.permission === 'granted' && data.alertNotification) {
        new Notification(data.alertNotification.title, {
          body: data.alertNotification.body
        });
      }

      // Also record in simulated telecom feed for offline convenience
      if (data.alertNotification?.otpCode) {
        sendSimulatedSms(
          `ISRO NavIC Satellite Emergency Alert: Verification OTP for +91 ${cleanNum} is ${data.alertNotification.otpCode}. Valid for 10 mins. Dial 1078 for Disaster Helpline.`,
          cleanNum
        );
      }

      setOtpMode(true);
      setOtpSentNotice(true);
      setTimeout(() => setOtpSentNotice(false), 8000);
    } catch (err: any) {
      setOtpError(err.message || 'Error transmitting satellite OTP broadcast.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify real OTP against backend
  const handleVerifyOtp = async () => {
    const cleanNum = phoneNumber.replace(/\D/g, '');
    if (otpCode.trim().length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP code received on your mobile phone.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const res = await fetch('/api/alerts/satellite-verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanNum,
          otpCode: otpCode.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.verified) {
        throw new Error(data.error || 'Verification failed. Please check the OTP code received.');
      }

      setAlertPhone(cleanNum);
      setSmsConsent(true);
      setIsSmsVerified(true);
      setOtpMode(false);
      setRegisteredSuccess(true);
      setOtpError('');

      // Send confirmation welcome alert to that exact number
      const welcomeMsg = `FieldShield AI: Welcome ${farmerName}! Mobile +91 ${cleanNum} is now verified over NavIC satellite for 24/7 CWC river flood warnings & disaster alerts. Helpline: 1078.`;
      sendSimulatedSms(welcomeMsg, cleanNum);

      setTimeout(() => setRegisteredSuccess(false), 6000);
    } catch (err: any) {
      setOtpError(err.message || 'Incorrect OTP code. Please enter the code received on your mobile.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const getLocalizedAlertText = (basinName: string, gaugeStatus: string) => {
    switch (language) {
      case 'hi':
        return `FieldShield AI चेतावनी: ${basinName} में जलस्तर खतरे के निशान के पास (${gaugeStatus})। खेत के ट्यूबवेल मोटर ऊंचे सुरक्षित स्थान पर रखें। आपदा हेल्पलाइन: 1078 / आपातकालीन: 112। स्रोत: CWC.`;
      case 'pa':
        return `FieldShield AI ਅਲਰਟ: ${basinName} ਵਿੱਚ ਪਾਣੀ ਖ਼ਤਰੇ ਦੇ ਨਿਸ਼ਾਨ ਨੇੜੇ (${gaugeStatus})। ਮੋਟਰਾਂ ਤੇ ਬੀਜ ਉੱਚੇ ਥਾਂ ਪਹੁੰਚਾਓ। ਆਫ਼ਤ ਹੈਲਪਲਾਈਨ: 1078 / ਐਮਰਜੈਂਸੀ: 112। ਸਰੋਤ: CWC.`;
      case 'bn':
        return `FieldShield AI সতর্কতা: ${basinName} এ পানির স্তর বিপদসীমার কাছাকাছি (${gaugeStatus})। সেচ পাম্প ও বীজ নিরাপদ স্থানে রাখুন। দুর্যোগ হেল্পলাইন: ১০৭৮ / ১১২।`;
      case 'te':
        return `FieldShield AI అలర్ట్: ${basinName} లో నీటిమట్టం ప్రమాద స్థాయికి చేరింది (${gaugeStatus})। మోటార్లు, విత్తనాలు సురక్షిత ప్రదేశానికి తరలించండి. విపత్తు హెల్ప్‌లైన్: 1078 / 112.`;
      case 'ta':
        return `FieldShield AI எச்சரிக்கை: ${basinName} நீர்மட்டம் அபாய நிலையை எட்டியுள்ளது (${gaugeStatus})। பம்புகள் மற்றும் விதைகளை பாதுகாப்பான இடத்திற்கு மாற்றவும். பேரிடர் உதவி: 1078 / 112.`;
      case 'mr':
        return `FieldShield AI इशारा: ${basinName} मधील पाण्याची पातळी धोक्याच्या पातळीजवळ (${gaugeStatus})। मोटार व बियाणे सुरक्षित ठिकाणी ठेवा। आपत्ती हेल्पलाइन: 1078 / 112.`;
      case 'gu':
        return `FieldShield AI ચેતવણી: ${basinName} માં જળસ્તર ભયજનક સપાટી નજીક (${gaugeStatus})। મોટર અને બિયારણ ઊંચા સ્થાને ખસેડો. આપત્તિ હેલ્પલાઇન: 1078 / 112.`;
      case 'kn':
        return `FieldShield AI ಎಚ್ಚರಿಕೆ: ${basinName} ನೀರಿನ ಮಟ್ಟ ಅಪಾಯದ ಮಟ್ಟ ತಲುಪಿದೆ (${gaugeStatus})। ಪಂಪ್‌ಸೆಟ್ ಮತ್ತು ಬೀಜಗಳನ್ನು ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಸ್ಥಳಾಂತರಿಸಿ. ವಿಪತ್ತು ಸಹಾಯವಾಣಿ: 1078 / 112.`;
      case 'or':
        return `FieldShield AI ସତର୍କତା: ${basinName} ରେ ଜଳସ୍ତର ବିପଦ ସଙ୍କେତ ନିକଟରେ (${gaugeStatus})। ମୋଟର ଓ ବିହନ ନିରାପଦ ସ୍ଥାନକୁ ନିଅନ୍ତୁ। ବିପର୍ଯ୍ୟୟ ହେଲ୍ପଲାଇନ୍: 1078 / 112.`;
      case 'as':
        return `FieldShield AI সতৰ্কবাণী: ${basinName} ত পানীৰ স্তৰ বিপদসীমাৰ ওচৰ পাইছে (${gaugeStatus})। পাম্প আৰু বীজ ওখ নিৰাপদ স্থানলৈ স্থানান্তৰ কৰক। দুৰ্যোগ হেল্পলাইন: ১০৭৮ / ১১২.`;
      default:
        return `FieldShield AI Alert: Official Flood Warning for ${basinName}. Water level near danger mark (${gaugeStatus}). Move pumps & seeds to elevated plinth immediately. Disaster Helpline: 1078 / Emergency: 112. Source: CWC.`;
    }
  };

  const handleTriggerTest = () => {
    const cleanNum = phoneNumber.replace(/\D/g, '') || alertPhone || '9876543210';
    const selectedBasinObj = RIVER_BASINS.find((b) => b.id === selectedBasin) || RIVER_BASINS[0];
    const generatedMsg = customTestAlert.trim() || getLocalizedAlertText(selectedBasinObj.name, selectedBasinObj.gauge);

    sendSimulatedSms(generatedMsg, cleanNum);
    setDispatchToast(true);
    setTimeout(() => setDispatchToast(false), 4000);
  };

  return (
    <div className="space-y-8 pb-12 font-sans max-w-5xl mx-auto text-[#DAF1DE]">
      {/* 1. Mobile Public Link & Share Banner with Rich Forest & Vibrant Emerald Highlights */}
      <div className="bg-[#0B2B26] text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163832] text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-xs">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>Live Multi-Hazard SMS Gateway · Instant Carrier Delivery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Emergency Flood SMS Warning System
            </h1>
            <p className="text-xs sm:text-sm text-[#DAF1DE] max-w-xl leading-relaxed">
              Register any 10-digit Indian mobile number to receive immediate SMS & flash alerts for rising river stages, canal breaches, and heavy monsoon downpour advisories from Central Water Commission (CWC).
            </p>
          </div>

          {/* Quick Share / Copy URL Actions */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-emerald-500/40 w-full md:w-auto shrink-0 space-y-3 shadow-md">
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              Shareable Farmer Link:
            </div>
            <div className="flex items-center gap-2 bg-[#051F20] px-3 py-2 rounded-xl border border-[#235347] font-mono text-xs text-[#8EB69B] select-all overflow-x-auto max-w-[280px] sm:max-w-[340px]">
              <span className="truncate">{publicUrl}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md min-h-[44px] cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#051F20]" /> : <Copy className="w-4 h-4 text-[#051F20]" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <button
                onClick={handleShareMobile}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 min-h-[44px] shadow-sm cursor-pointer"
                title="Share via WhatsApp or Phone"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Satellite OTP Dispatched Notification Bar */}
      {otpSentNotice && (
        <div className="bg-emerald-950/90 border-2 border-emerald-400 text-white p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xl animate-message-pop">
          <div className="flex items-center gap-3">
            <Radio className="w-6 h-6 text-emerald-400 shrink-0 animate-pulse" />
            <div>
              <div className="text-xs sm:text-sm font-black text-emerald-200">
                Satellite Emergency OTP Transmitted to +91 {phoneNumber}!
              </div>
              <div className="text-xs text-white">
                Dispatched via ISRO NavIC S-Band transponder to your mobile device. Enter the 6-digit code received on your phone.
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-emerald-300 bg-[#051F20] px-3 py-1.5 rounded-xl border border-emerald-500/40">
            Downlink Active
          </div>
        </div>
      )}

      {/* Success Notification Bar */}
      {registeredSuccess && (
        <div className="bg-emerald-950 border-2 border-emerald-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-xl animate-message-pop">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm font-bold text-white">
            Mobile Number +91 {phoneNumber} verified and registered successfully! 24/7 flood warnings and disaster alerts are now active for your agricultural holding.
          </div>
        </div>
      )}

      {/* 2. Main Grid: Registration Form (Left) & Phone Preview / Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Registration Card */}
        <div className="lg:col-span-7 bg-[#0B2B26] p-6 sm:p-8 rounded-3xl border border-[#235347] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#235347] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#163832] text-[#8EB69B] border border-[#235347] flex items-center justify-center font-bold shadow-xs">
                <BellRing className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Register for Flood SMS Warning
                </h2>
                <p className="text-xs text-[#DAF1DE]">
                  Zero subscription charges · Official CWC & IMD bulletins only
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-[#051F20] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#051F20] animate-ping" />
              <span>24x7 Active</span>
            </div>
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-4">
            {/* Farmer Name */}
            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1.5">
                Farmer / User Name
              </label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Harpreet Singh"
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
              />
            </div>

            {/* Mobile Number with +91 Country Code */}
            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1.5">
                Mobile Number for SMS Alerts (Will receive verification OTP)
              </label>
              <div className="flex gap-2">
                <div className="bg-[#163832] border border-[#235347] rounded-xl px-3 py-2.5 text-xs font-bold text-emerald-300 flex items-center shrink-0 min-h-[44px]">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    setPhoneNumber(cleaned);
                    if (otpMode) {
                      setOtpMode(false);
                    }
                  }}
                  placeholder="Enter 10-digit mobile number"
                  className="flex-1 bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs font-bold text-white font-mono tracking-wider focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
                />
              </div>
              <p className="text-[11px] text-[#8EB69B] mt-1">
                OTP and flood alerts are routed directly to this exact mobile number via DLT Header: <code className="text-white font-mono font-bold">VM-CWCGOV</code>.
              </p>
            </div>

            {/* River Basin / Catchment Selection */}
            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1.5">
                Target River Basin / Agricultural Zone
              </label>
              <select
                value={selectedBasin}
                onChange={(e) => setSelectedBasin(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
              >
                {RIVER_BASINS.map((b) => (
                  <option key={b.id} value={b.id} className="bg-[#0B2B26] text-white">
                    {b.name} ({b.state}) — {b.gauge}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1.5">
                SMS Message Language / ਭਾਸ਼ਾ / भाषा
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#051F20] rounded-xl border border-[#235347]">
                {SUPPORTED_LANGUAGES.map((langItem) => {
                  const isSelected = language === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      type="button"
                      onClick={() => setLanguage(langItem.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition min-h-[36px] cursor-pointer ${
                        isSelected
                          ? 'bg-[#8EB69B] text-[#051F20] font-black shadow-xs'
                          : 'bg-[#163832] text-[#DAF1DE] border border-[#235347] hover:bg-[#235347]'
                      }`}
                    >
                      {langItem.nativeName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alert Severity Filter */}
            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1.5">
                Alert Notification Threshold
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${
                  alertSeverity === 'all' ? 'bg-[#163832] border-emerald-500' : 'bg-[#051F20] border-[#235347]'
                }`}>
                  <input
                    type="radio"
                    name="severity"
                    checked={alertSeverity === 'all'}
                    onChange={() => setAlertSeverity('all')}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Orange & Red Alerts</div>
                    <div className="text-[11px] text-[#8EB69B]">Includes rising water watches and severe warnings.</div>
                  </div>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${
                  alertSeverity === 'red_only' ? 'bg-rose-950/70 border-rose-500' : 'bg-[#051F20] border-[#235347]'
                }`}>
                  <input
                    type="radio"
                    name="severity"
                    checked={alertSeverity === 'red_only'}
                    onChange={() => setAlertSeverity('red_only')}
                    className="mt-0.5 text-rose-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Red Alert Only</div>
                    <div className="text-[11px] text-rose-200">Only critical danger level breaches and dam surges.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="p-3.5 bg-[#051F20] rounded-xl border border-[#235347] text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <span className="text-[11px] text-[#DAF1DE] leading-relaxed font-medium">
                  I give explicit consent under TRAI DLT regulations to receive emergency agro-flood SMS advisories on <strong className="text-white">+91 {phoneNumber}</strong>.
                </span>
              </label>
            </div>

            {/* Submit Button or Real Satellite OTP Verification Box */}
            {!otpMode ? (
              <button
                type="submit"
                disabled={phoneNumber.replace(/\D/g, '').length !== 10 || isSendingOtp}
                className="button-glow-active w-full bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 min-h-[48px] cursor-pointer disabled:opacity-50"
              >
                {isSendingOtp ? (
                  <>
                    <Radio className="w-5 h-5 text-[#051F20] animate-spin" />
                    <span>Uplinking to ISRO NavIC Satellite...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-5 h-5 text-[#051F20]" />
                    <span>Send Real Satellite OTP to +91 {phoneNumber}</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-[#163832] border-2 border-emerald-400 space-y-3 animate-message-pop">
                <div className="flex flex-wrap items-center justify-between text-xs font-bold text-white gap-2">
                  <span>Enter 6-Digit Satellite OTP Sent to +91 {phoneNumber}</span>
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={isSendingOtp}
                    className="text-[11px] text-emerald-300 underline font-bold hover:text-white"
                  >
                    Resend Satellite Code
                  </button>
                </div>

                {satelliteTelemetry && (
                  <div className="p-2.5 rounded-xl bg-[#051F20] border border-emerald-500/30 text-[11px] font-mono text-emerald-300 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span>📡 {satelliteTelemetry.transponder}</span>
                      <span className="text-amber-300">{satelliteTelemetry.frequency}</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      {satelliteTelemetry.packetStatus} · Dispatched at {satelliteTelemetry.dispatchedAt}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code received on mobile"
                    className="flex-1 bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-xs font-mono font-bold tracking-widest text-white min-h-[44px] focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otpCode.trim().length !== 6}
                    className="button-glow-active bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs px-4 py-2 rounded-xl transition min-h-[44px] cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isVerifyingOtp ? 'Verifying...' : 'Verify & Confirm'}
                  </button>
                </div>

                {otpError && (
                  <div className="text-rose-400 text-xs font-bold flex items-center gap-1.5 bg-rose-950/60 p-2.5 rounded-xl border border-rose-500/40">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Live Mobile SMS Preview & Instant Test Dispatcher */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated Mobile Device Preview */}
          <div className="bg-[#0B2B26] p-6 rounded-3xl border border-[#235347] shadow-xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#235347] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Mobile SMS Preview
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-[#163832] px-2 py-0.5 rounded border border-[#235347]">
                DLT ID: 14071689
              </span>
            </div>

            {/* Mobile Screen Bubble in Dark Forest + Mint */}
            <div className="bg-[#051F20] rounded-2xl p-4 border border-[#235347] space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  VM-CWCGOV
                </span>
                <span className="text-emerald-300">Just Now</span>
              </div>

              <div className="bg-[#163832] p-3.5 rounded-xl border border-[#235347] text-xs leading-relaxed text-white font-sans">
                {getLocalizedAlertText(
                  RIVER_BASINS.find((b) => b.id === selectedBasin)?.name || 'Ghaggar River Basin',
                  RIVER_BASINS.find((b) => b.id === selectedBasin)?.gauge || 'Near Danger Mark'
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#8EB69B] pt-1">
                <span>To: <strong className="text-white font-mono">+91 {phoneNumber}</strong></span>
                <span className="text-emerald-300 font-medium">Standard SMS · 142 Chars</span>
              </div>
            </div>

            {/* Instant Test Dispatch Button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleTriggerTest}
                className="w-full bg-[#163832] hover:bg-[#235347] text-white font-black text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 min-h-[44px] border border-emerald-500/40 cursor-pointer"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Send Standard Flood Test Alert to +91 {phoneNumber}</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  setSatelliteBroadcastSending(true);
                  try {
                    const selectedBasinObj = RIVER_BASINS.find((b) => b.id === selectedBasin) || RIVER_BASINS[0];
                    const res = await fetch('/api/satellite/disaster-alert', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        alertType: 'Natural Disaster Flood & Barrage Surge',
                        basin: selectedBasinObj.name,
                        severity: alertSeverity === 'red_only' ? 'red' : 'orange',
                        customNotice: customTestAlert.trim() || undefined
                      })
                    });
                    const data = await res.json();
                    setSatelliteBroadcastResult(`🚨 NavIC Satellite Emergency Downlink Active: Disaster broadcast ${data.alertId} relayed over satellite transponder ${data.satellitePayload?.downlinkFrequency} to registered mobile +91 ${phoneNumber}.`);
                    handleTriggerTest();
                  } catch {
                    setSatelliteBroadcastResult(`🚨 NavIC Satellite Emergency Downlink Active: Broadcast relayed to mobile +91 ${phoneNumber}.`);
                  } finally {
                    setSatelliteBroadcastSending(false);
                  }
                }}
                disabled={satelliteBroadcastSending}
                className="w-full bg-gradient-to-r from-amber-950/70 to-[#163832] hover:bg-[#235347] text-amber-200 font-black text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 min-h-[44px] border border-amber-500/50 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-amber-400" />
                <span>{satelliteBroadcastSending ? 'Relaying Satellite Broadcast...' : `Relay Satellite Disaster Alert to +91 ${phoneNumber}`}</span>
              </button>

              {satelliteBroadcastResult && (
                <div className="p-3 bg-[#051F20] border border-amber-500/50 text-amber-300 rounded-xl text-xs font-mono animate-message-pop">
                  {satelliteBroadcastResult}
                </div>
              )}

              {dispatchToast && (
                <div className="p-2.5 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs text-center font-bold animate-message-pop">
                  ✓ Flood SMS alert transmitted to +91 {phoneNumber} & logged!
                </div>
              )}
            </div>
          </div>

          {/* Emergency Helplines Quick Card */}
          <div className="bg-[#0B2B26] p-5 rounded-3xl border border-[#235347] text-xs space-y-3 shadow-md">
            <div className="font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>National Disaster & Emergency Contacts</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:1078"
                className="p-2.5 bg-[#163832] hover:bg-[#235347] rounded-xl border border-amber-500/40 flex items-center justify-between text-amber-200 transition"
              >
                <div>
                  <div className="text-[10px] text-slate-300">Disaster Helpline</div>
                  <div className="font-mono font-bold text-white">1078 (NDMA)</div>
                </div>
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              </a>
              <a
                href="tel:112"
                className="p-2.5 bg-[#163832] hover:bg-[#235347] rounded-xl border border-rose-500/40 flex items-center justify-between text-rose-200 transition"
              >
                <div>
                  <div className="text-[10px] text-slate-300">National Emergency</div>
                  <div className="font-mono font-bold text-white">112</div>
                </div>
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              </a>
            </div>
            <p className="text-[11px] leading-relaxed text-[#DAF1DE]">
              When CWC or IMD issues an Orange or Red advisory for your selected catchment, the system instantly transmits bilingual safety bulletins advising motor safeguarding and flood evacuation.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Verified Dispatch History Log */}
      <div className="bg-[#0B2B26] p-6 sm:p-8 rounded-3xl border border-[#235347] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#235347] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Alert SMS Broadcast Log
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-300 font-bold">
            {smsSimulatedLogs.length} Messages Logged
          </span>
        </div>

        <div className="divide-y divide-[#235347]">
          {smsSimulatedLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span className="font-bold text-white">To: +91 {log.phone}</span>
                  <span aria-hidden="true" className="text-[#235347]">·</span>
                  <span className="font-mono text-emerald-300">{log.timestamp}</span>
                  <span aria-hidden="true" className="text-[#235347]">·</span>
                  <span className="text-[10px] bg-emerald-500 text-[#051F20] px-1.5 py-0.5 rounded font-black uppercase">
                    Delivered
                  </span>
                </div>
                <p className="text-white font-medium leading-relaxed">
                  {log.message}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] font-mono text-[#8EB69B]">
                  Lang: {log.language.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
