import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Volume2, VolumeX, Sparkles, SlidersHorizontal, ShieldAlert, PhoneCall } from 'lucide-react';

export const FloatingChatbot: React.FC = () => {
  const { activeFarm, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [voiceAccent, setVoiceAccent] = useState<'clarity_indian_en' | 'native_lang' | 'slow_clear'>('clarity_indian_en');
  const [showSettings, setShowSettings] = useState(false);

  const getGreeting = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'नमस्ते किसान भाई! 🌾 मैं आपका 24/7 FieldShield AI कृषि व आपदा सहायक हूं। फसल बचाव, जल निकासी, या मोटर सुरक्षा के बारे में कोई भी सवाल पूछें!';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! 🌾 ਮੈਂ ਤੁਹਾਡਾ 24/7 FieldShield AI ਖੇਤੀ ਤੇ ਆਫ਼ਤ ਸਹਾਇਕ ਹਾਂ। ਫਸਲ ਬਚਾਅ ਜਾਂ ਮੋਟਰ ਸੁਰੱਖਿਆ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ!';
      case 'bn':
        return 'নমস্কার কৃষক ভাই! 🌾 আমি আপনার ২৪/৭ FieldShield AI কৃষি ও দুর্যোগ সহকারী। ফসল রক্ষা বা মোটর নিরাপত্তা সংক্রান্ত যেকোনো প্রশ্ন করুন!';
      default:
        return 'Namaste! 🌾 I am your 24/7 FieldShield AI Crop & Disaster Assistant. Ask me anything about drainage, pump protection, or emergency flood relief in simple words!';
    }
  };

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; id: string }>>([
    {
      id: 'init-msg',
      role: 'assistant',
      text: getGreeting(language)
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speechWatchdogRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Clean speech synthesis on unmount or close
  useEffect(() => {
    return () => {
      try {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (err) {
        // Safe ignore
      }
    };
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg = { id: userMsgId, role: 'user' as const, text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const historyPayload = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: String(m.text || '')
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          farmContext: activeFarm
            ? {
                farmerName: activeFarm.farmerName,
                crop: activeFarm.cropType,
                district: activeFarm.district,
                state: activeFarm.state
              }
            : undefined
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const rawReply = data?.reply;
      const cleanReply =
        typeof rawReply === 'string' && rawReply.trim().length > 0
          ? rawReply.trim()
          : '1. Dig corner cuts immediately so standing water drains below 2-3 inches.\n2. Cut main power: Do not touch wet tubewell starter switches.\n3. Call National Disaster Helpline 1078 or Emergency 112 for rapid field assistance.';

      setMessages((prev) => [
        ...prev,
        { id: `assist-${Date.now()}`, role: 'assistant', text: cleanReply }
      ]);
    } catch (err: any) {
      console.warn('Chat notice, using instant safety guidance:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assist-fallback-${Date.now()}`,
          role: 'assistant',
          text: `Immediate Crop & Flood Safety Plan:\n\n1. Open field corner drainage cuts so stagnant floodwater drops below 2-3 inches.\n2. Cut main electricity switch to protect pump sets from electrical surges.\n3. Call National Disaster Helpline: 1078 or National Emergency: 112 for urgent rescue support.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * High-Clarity Voice Speech Synthesis with Enhanced Accent Support
   * Uses clear Indian English (en-IN), authentic regional voices (hi-IN, pa-IN),
   * and steady articulation (rate: 0.86 - 0.90) for audible farmer comprehension.
   */
  const speakText = (id: string, text: string) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      if (speakingId === id) {
        window.speechSynthesis.cancel();
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);

      // Clean speech: remove symbols, format numbers with pauses for distinct audibility
      let cleanSpeech = String(text || '')
        .replace(/[*#_`~]/g, '')
        .replace(/1078/g, '1 0 7 8')
        .replace(/112/g, '1 1 2')
        .replace(/1070/g, '1 0 7 0')
        .replace(/\n+/g, '. ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);

      // Map language codes
      const langLocaleMap: Record<string, string> = {
        hi: 'hi-IN',
        pa: 'pa-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        or: 'or-IN',
        as: 'as-IN',
        en: 'en-IN'
      };

      const targetLocale = langLocaleMap[language] || 'en-IN';
      const voices = window.speechSynthesis.getVoices() || [];

      // Find the clearest voice based on selected accent preference
      let selectedVoice: SpeechSynthesisVoice | null = null;

      if (voiceAccent === 'clarity_indian_en') {
        // Prioritize clear Indian English voices
        selectedVoice =
          voices.find((v) => v.lang === 'en-IN' || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('indian')) ||
          voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google'))) ||
          null;
        utterance.lang = 'en-IN';
        utterance.rate = 0.88; // Slightly slower pace for maximum clarity
        utterance.pitch = 1.04;
      } else if (voiceAccent === 'native_lang') {
        // Prioritize native regional language voice (e.g. Hindi, Punjabi, Bengali)
        selectedVoice =
          voices.find((v) => v.lang.toLowerCase() === targetLocale.toLowerCase()) ||
          voices.find((v) => v.lang.toLowerCase().startsWith(language.toLowerCase())) ||
          voices.find((v) => v.lang === 'hi-IN' || v.lang === 'en-IN') ||
          null;
        utterance.lang = selectedVoice ? selectedVoice.lang : targetLocale;
        utterance.rate = 0.86;
        utterance.pitch = 1.02;
      } else {
        // Slow & extra clear mode for loud farm environments
        selectedVoice =
          voices.find((v) => v.lang === targetLocale || v.lang === 'en-IN' || v.lang === 'hi-IN') ||
          null;
        utterance.lang = selectedVoice ? selectedVoice.lang : targetLocale;
        utterance.rate = 0.78; // Slow deliberate diction
        utterance.pitch = 1.08; // Higher vocal treble
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingId(null);
      };

      utterance.onerror = () => {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingId(null);
      };

      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);

      speechWatchdogRef.current = setTimeout(() => {
        setSpeakingId(null);
      }, 25000);
    } catch (err) {
      console.warn('SpeechSynthesis notice:', err);
      setSpeakingId(null);
    }
  };

  // Quick chips for floating popup (focused on practical flood survival & emergency contacts)
  const quickChips = useMemo(() => {
    if (language === 'pa') {
      return [
        { label: '🌾 ਝੋਨਾ ਜਲ ਨਿਕਾਸੀ', q: 'ਹੜ੍ਹ ਵਿੱਚ ਝੋਨੇ ਦੇ ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢਣ ਲਈ ਤੁਰੰਤ ਕੀ ਕਰੀਏ?' },
        { label: '⚡ ਮੋਟਰ ਸੁਰੱਖਿਆ', q: 'ਟਿਊਬਵੈੱਲ ਮੋਟਰ ਅਤੇ ਸਟਾਰਟਰ ਨੂੰ ਕਰੰਟ ਅਤੇ ਹੜ੍ਹ ਤੋਂ ਕਿਵੇਂ ਬਚਾਈਏ?' },
        { label: '🚨 ਆਫ਼ਤ ਹੈਲਪਲਾਈਨ 1078', q: 'ਕੌਮੀ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ (NDMA 1078) ਅਤੇ ਐਮਰਜੈਂਸੀ 112 ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ?' }
      ];
    }
    if (language === 'hi' || language === 'mr') {
      return [
        { label: '🌾 धान जल निकासी', q: 'बाढ़ में डूबी फसल से जल निकासी के त्वरित उपाय बताएं' },
        { label: '⚡ मोटर व स्टार्टर सुरक्षा', q: 'ट्यूबवेल मोटर और स्टार्टर को करंट और बाढ़ से कैसे बचाएं?' },
        { label: '🚨 आपदा हेल्पलाइन 1078', q: 'राष्ट्रीय आपदा प्रबंधन (NDMA 1078) और आपातकालीन 112 से संपर्क कैसे करें?' }
      ];
    }
    return [
      { label: '🌾 Emergency Drainage', q: 'How do I drain stagnant floodwater quickly to save submerging crops?' },
      { label: '⚡ Protect Pump Motor', q: 'How do I protect tubewell electric motors and starter switches from water damage?' },
      { label: '🚨 Disaster Helpline 1078', q: 'What emergency support is available from National Disaster Helpline 1078 & 112?' }
    ];
  }, [language]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#0B2B26] border-2 border-[#235347] rounded-3xl shadow-[0_12px_50px_rgba(5,31,32,0.85)] overflow-hidden flex flex-col h-[500px] animate-message-pop transition-all">
          {/* Header */}
          <div className="bg-[#163832] p-3.5 px-4 flex items-center justify-between text-[#DAF1DE] border-b border-[#235347] relative overflow-hidden">
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-[#0B2B26] flex items-center justify-center text-[#8EB69B] border border-[#235347] shadow-xs">
                  <Bot className="w-5 h-5 text-[#8EB69B]" />
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm text-white leading-tight flex items-center gap-1.5">
                  <span>FieldShield AI Assistant</span>
                  <span className="text-[9px] bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-extrabold uppercase">Live</span>
                </div>
                <div className="text-[10px] text-[#8EB69B] font-medium">24/7 Crop & Flood Guidance</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 relative z-10">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-xl border transition cursor-pointer ${
                  showSettings ? 'bg-[#8EB69B] text-[#051F20] border-white' : 'bg-[#0B2B26] text-[#DAF1DE] border-[#235347] hover:bg-[#051F20]'
                }`}
                title="Voice Accent & Audio Clarity Settings"
                aria-label="Audio Accent Settings"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-[#0B2B26] text-white rounded-xl transition cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4 text-[#DAF1DE]" />
              </button>
            </div>
          </div>

          {/* Voice Accent Selector Tray */}
          {showSettings && (
            <div className="bg-[#051F20] p-3 border-b border-[#235347] text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-bold text-white">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  Voice Accent & Pronunciation Clarity
                </span>
                <span className="text-[10px] text-slate-400">Clear Speech Engine</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setVoiceAccent('clarity_indian_en')}
                  className={`p-1.5 rounded-lg text-[10px] font-bold text-center transition cursor-pointer border ${
                    voiceAccent === 'clarity_indian_en'
                      ? 'bg-[#163832] text-emerald-300 border-emerald-500 shadow-xs'
                      : 'bg-[#0B2B26] text-slate-300 border-[#235347] hover:bg-[#163832]'
                  }`}
                >
                  Clear Indian
                </button>
                <button
                  type="button"
                  onClick={() => setVoiceAccent('native_lang')}
                  className={`p-1.5 rounded-lg text-[10px] font-bold text-center transition cursor-pointer border ${
                    voiceAccent === 'native_lang'
                      ? 'bg-[#163832] text-emerald-300 border-emerald-500 shadow-xs'
                      : 'bg-[#0B2B26] text-slate-300 border-[#235347] hover:bg-[#163832]'
                  }`}
                >
                  Regional Voice
                </button>
                <button
                  type="button"
                  onClick={() => setVoiceAccent('slow_clear')}
                  className={`p-1.5 rounded-lg text-[10px] font-bold text-center transition cursor-pointer border ${
                    voiceAccent === 'slow_clear'
                      ? 'bg-[#163832] text-emerald-300 border-emerald-500 shadow-xs'
                      : 'bg-[#0B2B26] text-slate-300 border-[#235347] hover:bg-[#163832]'
                  }`}
                >
                  Slow & Loud
                </button>
              </div>
            </div>
          )}

          {/* Quick Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#051F20] text-xs">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              const isSpeaking = speakingId === m.id;

              return (
                <div
                  key={m.id}
                  className={`flex gap-2 max-w-[85%] animate-message-pop ${
                    isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black ${
                      isUser
                        ? 'bg-[#235347] text-[#DAF1DE]'
                        : 'bg-[#163832] text-[#8EB69B] border border-[#235347]'
                    }`}
                  >
                    {isUser ? 'U' : <Bot className="w-3.5 h-3.5 text-[#8EB69B]" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl shadow-md ${
                      isUser
                        ? 'bg-[#163832] text-[#DAF1DE] border border-[#235347] rounded-tr-none'
                        : 'bg-[#0B2B26] text-[#DAF1DE] border border-[#235347] rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-white">{String(m.text || '')}</p>
                    {!isUser && (
                      <button
                        onClick={() => speakText(m.id, m.text)}
                        className={`mt-2 flex items-center gap-1.5 text-[11px] font-bold transition px-2.5 py-1 rounded-lg cursor-pointer ${
                          isSpeaking
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-[#163832] text-emerald-300 hover:bg-[#235347] border border-emerald-500/40'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-white animate-pulse" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>🔊 Listen (Clear Voice)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 mr-auto text-xs text-[#8EB69B] items-center animate-message-pop p-2.5 rounded-xl bg-[#0B2B26] border border-[#235347]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-white font-medium">FieldShield AI is preparing advice...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Quick Suggested Question Chips */}
          <div className="p-2 bg-[#0B2B26] border-t border-[#235347] flex gap-1.5 overflow-x-auto text-[11px]">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.q)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-[#163832] text-[#DAF1DE] hover:text-white border border-[#235347] hover:bg-[#235347] transition active:scale-95 shadow-xs cursor-pointer font-medium"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-[#0B2B26] border-t border-[#235347] flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about crop drainage, pump safety, flood relief..."
              className="flex-1 bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#8EB69B]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#8EB69B] hover:bg-white text-[#051F20] disabled:opacity-40 rounded-xl font-bold transition shrink-0 active:scale-95 cursor-pointer shadow-sm"
              title="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill in bottom-right corner */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="button-glow-active group flex items-center gap-3 bg-[#0B2B26] hover:bg-[#163832] text-white px-4 py-3 rounded-full shadow-[0_6px_30px_rgba(0,0,0,0.65)] border-2 border-emerald-500/50 hover:border-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#163832] border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0B2B26]"></span>
            </span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>Ask FieldShield AI</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono font-bold">24/7</span>
            </div>
            <div className="text-[10px] text-[#DAF1DE] font-medium">Crop & Flood Buddy</div>
          </div>
        </button>
      )}
    </div>
  );
};
