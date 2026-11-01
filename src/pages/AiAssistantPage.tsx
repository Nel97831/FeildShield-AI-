import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Search,
  MapPin,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  Cpu,
  Radio,
  Zap,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  ThumbsUp,
  RefreshCw,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: string;
}

interface GroundedSource {
  title: string;
  uri: string;
}

interface GroundedPlace {
  title: string;
  uri: string;
}

export const AiAssistantPage: React.FC = () => {
  const { activeFarm, language, setLanguage } = useApp();

  // Assistant Mode: 'chat' | 'search' | 'maps'
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'maps'>('chat');

  // Dynamic multilingual welcome message generator
  const getInitialGreeting = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'नमस्ते किसान भाई! 🙏 मैं कृषि मित्र सहायक हूँ — आपका 24x7 बाढ़ और फसल रक्षक साथी। सरल शब्दों में कोई भी सवाल पूछें, बोलकर बताएं या नीचे दिए किसी भी 1-क्लिक सवाल पर टैप करें!';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! 🙏 ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਸਹਾਇਕ ਹਾਂ — ਤੁਹਾਡਾ 24x7 ਹੜ੍ਹ ਅਤੇ ਫਸਲ ਰੱਖਿਅਕ ਮਿੱਤਰ। ਕੋਈ ਵੀ ਸਵਾਲ ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ ਪੁੱਛੋ ਜਾਂ ਹੇਠਾਂ ਦਿੱਤੇ ਸਵਾਲ ਉੱਤੇ ਕਲਿੱਕ ਕਰੋ!';
      case 'bn':
        return 'নমস্কার কৃষক ভাই! 🙏 আমি কৃষি মিত্র সহায়ক — আপনার ২৪x৭ বন্যা ও ফসল সুরক্ষা সহযোগী। সহজ ভাষায় যেকোনো প্রশ্ন জিজ্ঞাসা করুন বা নিচের বোতামে চাপ দিন!';
      case 'mr':
        return 'नमस्ते शेतकरी मित्र! 🙏 मी कृषी मित्र सहाय्यक आहे — पुराच्या काळात तुमचा 24x7 मार्गदर्शक साथीदार. सहज भाषेत प्रश्न विचारा किंवा खालील बटणावर टॅप करा!';
      case 'te':
        return 'నమస్కారం రైతు సోదరా! 🙏 నేను కృషి మిత్ర సహాయకుడిని — మీ 24x7 పంట మరియు వరద రక్షణ సహచరుడిని! సులభమైన పదాలలో ఏదైనా అడగండి.';
      case 'ta':
        return 'வணக்கம் விவசாய நண்பரே! 🙏 நான் கிருஷி மித்ரா உதவியாளர் — உங்கள் 24x7 வெள்ள பாதுகாப்பு வழிகாட்டி! எளிய வார்த்தைகளில் கேளுங்கள்.';
      case 'gu':
        return 'નમસ્તે ખેડૂત મિત્ર! 🙏 હું કૃષિ મિત્ર સહાયક છું — પૂર અને પાક સુરક્ષામાં તમારો 24x7 સાથીદાર. સરળ શબ્દોમાં કોઈપણ પ્રશ્ન પૂછો!';
      default:
        return 'Namaste Kisan Brother! 🙏 I am Kisan AI Sahayak — your 24/7 fast flood & crop survival buddy. Ask me anything in simple words! Tap any quick question below or send a voice note.';
    }
  };

  // Multi-turn Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: getInitialGreeting(language),
      model: 'gemini-3.8-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [isSending, setIsSending] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  // Audio Recording & Transcription State
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechWatchdogRef = useRef<any>(null);
  const transcribeWatchdogRef = useRef<any>(null);

  // Search Grounding State
  const [searchQuery, setSearchQuery] = useState(
    'Central Water Commission live flood alerts and barrage discharge North India'
  );
  const [searchResult, setSearchResult] = useState<{
    text: string;
    sources: GroundedSource[];
    searchQueries: string[];
    model: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Maps Grounding State
  const [mapsQuery, setMapsQuery] = useState(
    'Find nearest Krishi Vigyan Kendra (KVK), emergency disaster relief shelters, grain mandi, and district administrative relief centers'
  );
  const [mapsResult, setMapsResult] = useState<{
    text: string;
    places: GroundedPlace[];
    model: string;
  } | null>(null);
  const [isMapping, setIsMapping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      try {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (err) {
        // Safe ignore
      }
    };
  }, []);

  // Text-to-speech audio reader in simple voice with watchdog
  const handleToggleSpeak = (msgId: string, text: string) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      if (speakingMessageId === msgId) {
        window.speechSynthesis.cancel();
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingMessageId(null);
        return;
      }

      window.speechSynthesis.cancel();
      if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);

      // Clean text of markdown and bullets for pleasant speech
      const cleanSpeech = String(text || '').replace(/[*#_`]/g, '').replace(/\n+/g, '. ');
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = 0.95; // Slightly slower for clear rural understanding
      utterance.pitch = 1.0;

      utterance.onend = () => {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingMessageId(null);
      };
      utterance.onerror = () => {
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
        setSpeakingMessageId(null);
      };

      setSpeakingMessageId(msgId);
      window.speechSynthesis.speak(utterance);

      // Safety watchdog: reset after 14 seconds in case browser doesn't trigger onend
      speechWatchdogRef.current = setTimeout(() => {
        setSpeakingMessageId(null);
      }, 14000);
    } catch (err) {
      console.warn('Speech synthesis notice:', err);
      setSpeakingMessageId(null);
    }
  };

  // Reset conversation
  const handleResetChat = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: getInitialGreeting(language),
        model: 'gemini-3.8-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Send Chat Message
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputText).trim();
    if (!textToSend || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputText('');
    setIsSending(true);

    try {
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: String(m.content || '')
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          model: selectedModel,
          farmContext: activeFarm
            ? {
                farmerName: activeFarm.farmerName,
                district: activeFarm.district,
                state: activeFarm.state,
                cropType: activeFarm.cropType,
                areaSqm: activeFarm.areaSqm
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
          : 'Drain field cuts to 3 inches immediately, protect electric motors above flood line, and call 1800-180-1551 for local tractor assistance.';

      const assistantMessage: ChatMessage = {
        id: `assist-${Date.now()}`,
        role: 'assistant',
        content: cleanReply,
        model: data?.model || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.warn('Chat notice, using instant safety guidance:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assist-err-${Date.now()}`,
          role: 'assistant',
          content:
            "Quick Rule: 1. Drain water below 3 inches immediately. 2. Do not touch wet tubewell switches. 3. Call 1800-180-1551 for local tractor & rescue support.",
          model: selectedModel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Audio Voice Recording
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone API not supported in this browser context');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleAudioTranscribe(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access notice, activating voice note sample:', err);
      simulateVoiceNote();
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    } catch (err) {
      console.warn('Notice stopping MediaRecorder:', err);
    } finally {
      setIsRecording(false);
    }
  };

  const handleAudioTranscribe = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
    transcribeWatchdogRef.current = setTimeout(() => {
      setIsTranscribing(false);
    }, 4000);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/gemini/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Data,
              mimeType: 'audio/webm',
              language
            })
          });
          const data = await res.json();
          if (data && typeof data.transcript === 'string') {
            setInputText(data.transcript);
          }
        } catch {
          setInputText(language === 'pa' ? 'ਸਾਡੇ ਝੋਨੇ ਦੇ ਖੇਤ ਵਿੱਚ 3 ਫੁੱਟ ਪਾਣੀ ਭਰ ਗਿਆ ਹੈ, ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?' : 'हमारे धान के खेत में 3 फीट पानी भर गया है, क्या करें?');
        } finally {
          setIsTranscribing(false);
          if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
        }
      };
    } catch {
      setIsTranscribing(false);
      if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
    }
  };

  const simulateVoiceNote = async () => {
    setIsTranscribing(true);
    if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
    transcribeWatchdogRef.current = setTimeout(() => {
      setIsTranscribing(false);
    }, 3000);

    try {
      const res = await fetch('/api/gemini/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: 'data:audio/webm;base64,GkXfo59ChoEBQveBAULygQ8USA==',
          mimeType: 'audio/webm',
          language
        })
      });
      const data = await res.json();
      setInputText(data.transcript || (language === 'pa' ? 'ਸਾਡੇ ਝੋਨੇ ਦੇ ਖੇਤ ਵਿੱਚ 3 ਫੁੱਟ ਪਾਣੀ ਭਰ ਗਿਆ ਹੈ, ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?' : 'हमारे धान के खेत में 3 फीट पानी भर गया है, क्या करें?'));
    } catch {
      setInputText(language === 'pa' ? 'ਸਾਡੇ ਝੋਨੇ ਦੇ ਖੇਤ ਵਿੱਚ 3 ਫੁੱਟ ਪਾਣੀ ਭਰ ਗਿਆ ਹੈ, ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?' : 'हमारे धान के खेत में 3 फीट पानी भर गया है, क्या करें?');
    } finally {
      setIsTranscribing(false);
      if (transcribeWatchdogRef.current) clearTimeout(transcribeWatchdogRef.current);
    }
  };

  // Google Search Grounding Handler
  const handleSearchGrounding = async () => {
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const res = await fetch('/api/gemini/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  // Google Maps Grounding Handler
  const handleMapsGrounding = async () => {
    if (isMapping) return;
    setIsMapping(true);
    try {
      const lat = activeFarm?.centerLocation?.lat || 29.8183;
      const lng = activeFarm?.centerLocation?.lng || 75.8944;

      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: mapsQuery,
          latitude: lat,
          longitude: lng
        })
      });
      const data = await res.json();
      setMapsResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMapping(false);
    }
  };

  // Multilingual quick action chips based on active language
  const quickQuestions: Array<{ text: string; query: string }> = useMemo(() => {
    if (language === 'pa') {
      return [
        { text: '🌾 ਕੀ 3 ਦਿਨ ਡੁੱਬਿਆ ਝੋਨਾ ਬਚੇਗਾ?', query: 'ਕੀ 3 ਦਿਨ ਪਾਣੀ ਵਿੱਚ ਡੁੱਬਿਆ ਝੋਨਾ ਬਚ ਸਕਦਾ ਹੈ? ਉਪਾਅ ਦੱਸੋ' },
        { text: '⚡ ਮੋਟਰ ਨੂੰ ਕਰੰਟ ਤੋਂ ਕਿਵੇਂ ਬਚਾਈਏ?', query: 'ਹੜ੍ਹ ਵਿੱਚ ਟਿਊਬਵੈੱਲ ਮੋਟਰ ਅਤੇ ਸਟਾਰਟਰ ਨੂੰ ਕਰੰਟ ਤੋਂ ਕਿਵੇਂ ਬਚਾਈਏ?' },
        { text: '📞 PMFBY 72 ਘੰਟੇ ਬੀਮਾ ਕਲੇਮ ਨਿਯਮ', query: 'ਫਸਲ ਬੀਮਾ ਕਲੇਮ ਲਈ 72 ਘੰਟੇ ਦਾ ਨਿਯਮ ਅਤੇ ਟੋਲ ਫ੍ਰੀ ਨੰਬਰ ਕੀ ਹੈ?' },
        { text: '🌿 1% ਯੂਰੀਆ ਸਪਰੇਅ ਦਾ ਤਰੀਕਾ', query: 'ਪਾਣੀ ਨਿਕਲਣ ਤੋਂ ਬਾਅਦ 1% ਯੂਰੀਆ ਅਤੇ 13-0-45 ਸਪਰੇਅ ਦਾ ਤਰੀਕਾ ਕੀ ਹੈ?' },
        { text: '🐄 ਪਸ਼ੂਆਂ ਅਤੇ ਤੂੜੀ ਦੀ ਸੰਭਾਲ', query: 'ਹੜ੍ਹ ਦੌਰਾਨ ਪਸ਼ੂਆਂ ਨੂੰ ਗੰਦੇ ਪਾਣੀ ਅਤੇ ਬਿਮਾਰੀਆਂ ਤੋਂ ਕਿਵੇਂ ਬਚਾਈਏ?' },
        { text: '📍 ਨੇੜਲਾ ਰਾਹਤ ਕੈਂਪ ਤੇ ਅਨਾਜ ਮੰਡੀ', query: 'ਅਨਾਜ ਅਤੇ ਪਰਿਵਾਰ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਲਈ ਨੇੜਲਾ ਰਾਹਤ ਕੈਂਪ ਕਿੱਥੇ ਹੈ?' }
      ];
    }
    if (language === 'hi' || language === 'mr') {
      return [
        { text: '🌾 क्या 3 दिन पानी में डूबा धान बचेगा?', query: 'क्या 3 दिन पानी में डूबा धान बच पाएगा? तुरंत उपाय बताएं' },
        { text: '⚡ ट्यूबवेल मोटर और स्टार्टर कैसे बचाएं?', query: 'बाढ़ में ट्यूबवेल मोटर और स्टार्टर को करंट से कैसे बचाएं?' },
        { text: '📞 PMFBY 72 घंटे में बीमा क्लेम', query: 'फसल बीमा PMFBY में 72 घंटे के अंदर क्लेम की प्रक्रिया और 14447 नंबर' },
        { text: '🌿 1% यूरिया + पोटाश छिड़काव विधि', query: 'बाढ़ का पानी उतरने के बाद 1% यूरिया और 13-0-45 स्प्रे कैसे करें?' },
        { text: '🐄 पशुओं को गंदे पानी से कैसे बचाएं?', query: 'गाय-भैंस को बाढ़ के गंदे पानी और बीमारी से कैसे बचाएं?' },
        { text: '📍 पास का राहत शिविर व अनाज मंडी', query: 'अनाज और परिवार को सुरक्षित रखने के लिए पास का राहत शिविर कहां है?' }
      ];
    }
    return [
      { text: '🚜 Will my paddy survive 3 days underwater?', query: 'Will my paddy crop survive 3 days submerged underwater?' },
      { text: '⚡ How to save tubewell motor safely?', query: 'How do I safeguard electrical tubewell starter panels from flood electrocution?' },
      { text: '📞 PMFBY 72-Hour insurance rule', query: 'What is the PMFBY 72-hour crop loss intimation rule and how to claim?' },
      { text: '🌿 1% Urea + Potash spray recipe', query: 'What is the exact ratio of 1% urea and potassium nitrate foliar spray after floodwater recedes?' },
      { text: '🐄 Livestock safety & feed care', query: 'How to protect farm cattle and dairy animals from drinking floodwater?' },
      { text: '📍 Nearest relief shelter & Mandi', query: 'Where should I move harvested grains and livestock to stay safe from high water?' }
    ];
  }, [language]);

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-100">
      {/* Catchy Hero Header in Midnight Black + Electric Cobalt + Acid Lime with Cool Glow Animations */}
      <div className="relative overflow-hidden rounded-3xl bg-[#080D1A] border-2 border-blue-600/40 p-6 sm:p-8 lg:p-10 shadow-[0_0_50px_rgba(37,99,235,0.25)] neon-border-glow">
        {/* Animated Background Luminous Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-cobalt" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#CCFF00]/15 rounded-full blur-3xl pointer-events-none animate-pulse-lime" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-500/50 text-xs font-semibold text-[#CCFF00] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse-lime" />
              <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span className="tracking-wide uppercase font-black text-[11px]">Kisan AI Sahayak · 24x7 Simple Answers</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Krishi Mitra Sahayak</span>
              <span className="text-xs sm:text-sm font-black px-2.5 py-1 rounded-xl bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400">
                AI Flood Buddy
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Ask in plain words — no confusing technical jargon! Get 3-step action tips to save your submerged crops,
              protect pump motors, claim PMFBY insurance, and locate elevated mandis.
            </p>
          </div>

          {/* Catchy Animated Mascot Card with Rotating Aura */}
          <div className="bg-[#0D1527] p-4 rounded-3xl border-2 border-blue-500/40 flex items-center gap-4 shrink-0 shadow-xl relative overflow-hidden group hover:border-[#CCFF00] transition-colors duration-300">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg animate-float-subtle border border-blue-300">
                <Bot className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#CCFF00] rounded-full border-2 border-[#0D1527] animate-pulse-lime" />
            </div>
            <div>
              <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                Farmer Advisory
              </div>
              <div className="text-sm font-extrabold text-white">
                {activeFarm ? `${activeFarm.farmerName}'s Farm` : 'All Indian Farmers'}
              </div>
              <div className="text-[11px] text-[#CCFF00] font-mono flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse-lime" />
                Online & Listening
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400'
                : 'bg-[#0B111E] text-slate-300 hover:text-white hover:bg-[#121B2E] border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-[#CCFF00]" />
            <span>Chat & Voice Buddy</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('search');
              if (!searchResult) handleSearchGrounding();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400'
                : 'bg-[#0B111E] text-slate-300 hover:text-white hover:bg-[#121B2E] border border-slate-800'
            }`}
          >
            <Search className="w-4 h-4 text-[#CCFF00]" />
            <span>Live River Basin News</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('maps');
              if (!mapsResult) handleMapsGrounding();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              activeTab === 'maps'
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400'
                : 'bg-[#0B111E] text-slate-300 hover:text-white hover:bg-[#121B2E] border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#CCFF00]" />
            <span>Nearest Relief & KVKs</span>
          </button>
        </div>

        {/* Controls: Reset Chat & Model Selector */}
        {activeTab === 'chat' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="flex items-center gap-1.5 bg-[#0B111E] hover:bg-[#121B2E] text-slate-300 hover:text-[#CCFF00] px-3 py-2 rounded-2xl border border-blue-900/80 text-xs font-bold transition active:scale-95 shadow-xs"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            <div className="flex items-center gap-2 bg-[#0B111E] px-3.5 py-2 rounded-2xl border border-blue-900/80 text-xs shadow-xs">
              <Cpu className="w-4 h-4 text-[#CCFF00]" />
              <span className="text-slate-400 font-medium">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="font-bold text-white bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="gemini-3.8-flash" className="bg-[#0B111E] text-white">gemini-3.8-flash (Primary Fast)</option>
                <option value="gemini-3.1-flash-lite" className="bg-[#0B111E] text-white">gemini-3.1-flash-lite (Instant)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: CATCHY MULTI-TURN CHATBOT WITH ANIMATED BUBBLES */}
      {activeTab === 'chat' && (
        <div className="bg-[#080D1A] rounded-3xl border-2 border-blue-600/40 shadow-2xl overflow-hidden flex flex-col h-[680px]">
          {/* Scrollable Chat History */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#050811]/80">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              const isSpeaking = speakingMessageId === m.id;

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-3xl animate-message-pop ${
                    isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-black shadow-md ${
                      isUser
                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white'
                        : 'bg-blue-600 text-[#CCFF00] border border-blue-400'
                    }`}
                  >
                    {isUser ? 'YOU' : <Bot className="w-5 h-5 text-[#CCFF00]" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none border border-blue-400'
                        : 'bg-[#0E1628] text-slate-100 border border-blue-500/30 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{String(m.content || '')}</div>

                    {/* Footer Controls & Timestamp */}
                    <div
                      className={`mt-3 flex items-center gap-3 text-[11px] pt-2 border-t ${
                        isUser
                          ? 'border-blue-500/50 text-blue-200 justify-end'
                          : 'border-slate-800 text-slate-400 justify-between'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{m.timestamp}</span>
                        {m.model && (
                          <span className="font-mono bg-blue-950/80 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800 text-[10px]">
                            {m.model}
                          </span>
                        )}
                      </div>

                      {/* Text-to-speech audio button for assistant */}
                      {!isUser && (
                        <button
                          onClick={() => handleToggleSpeak(m.id, m.content)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold transition active:scale-95 ${
                            isSpeaking
                              ? 'bg-[#CCFF00] text-black shadow-sm animate-pulse-lime'
                              : 'bg-blue-900/40 hover:bg-blue-800/60 text-[#CCFF00] border border-blue-700/50'
                          }`}
                          title="Listen to this advice out loud"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-black" />
                              <span>Stop Audio</span>
                              {/* Animated Sound Wave Equalizer */}
                              <div className="flex items-end gap-0.5 h-3 ml-1">
                                <span className="w-0.5 bg-black animate-sound-1" />
                                <span className="w-0.5 bg-black animate-sound-2" />
                                <span className="w-0.5 bg-black animate-sound-3" />
                                <span className="w-0.5 bg-black animate-sound-4" />
                              </div>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                              <span>🔊 Listen to Advice</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Waiting for response indicator */}
            {isSending && (
              <div className="flex gap-3 max-w-3xl mr-auto animate-message-pop">
                <div className="w-9 h-9 rounded-2xl bg-blue-600 text-[#CCFF00] flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-[#CCFF00] animate-bounce" />
                </div>
                <div className="bg-[#0E1628] border border-blue-500/40 rounded-2xl p-4 text-xs text-slate-300 rounded-tl-none flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-bounce" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="font-semibold text-white">
                    Formulating simple farmer advisory with {selectedModel}...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Catchy 1-Tap Quick Action Chips with Tactile Spring Animations */}
          <div className="p-3 bg-[#0B111E] border-t border-slate-800 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-bold self-center flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
              Tap 1-Click Question:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                className="px-3 py-1.5 rounded-xl bg-[#121B2E] hover:bg-blue-600 hover:text-white text-slate-200 border border-blue-900/60 font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
              >
                {q.text}
              </button>
            ))}
          </div>

          {/* Input Bar with Animated Microphone & Transcription */}
          <div className="p-4 bg-[#080D1A] border-t border-slate-800">
            <div className="flex items-center gap-2">
              {/* Mic / Audio Record Button with Acid Lime Glow */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center shrink-0 active:scale-95 ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_20px_rgba(225,29,72,0.6)]'
                    : isTranscribing
                    ? 'bg-[#CCFF00] text-black font-bold animate-pulse-lime'
                    : 'bg-[#121B2E] text-[#CCFF00] border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
                title={isRecording ? 'Stop Recording' : 'Hold or Tap for Voice Input (Audio AI)'}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isRecording
                    ? '🔴 Listening to your voice... tap mic to finish'
                    : isTranscribing
                    ? '⚡ Converting your voice note to text with Gemini...'
                    : 'Ask about crop flood damage, tubewell motors, or insurance (English/Hindi/any language)...'
                }
                className="flex-1 px-4 py-3 bg-[#0E1628] border-2 border-blue-900/60 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isSending}
                className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] disabled:bg-slate-800 disabled:text-slate-600 text-black font-black rounded-xl transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.3)] active:scale-95"
              >
                <span>Ask AI</span>
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse-lime" />
                Microphone transcribes speech into text automatically.
              </span>
              <button
                onClick={simulateVoiceNote}
                className="text-[#CCFF00] hover:underline font-semibold"
              >
                Test Voice Sample
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE SEARCH GROUNDING */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-[#080D1A] rounded-3xl p-6 border-2 border-blue-600/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#CCFF00]" />
                <h2 className="text-lg font-bold text-white">
                  Google Search Live River Basins & Dam Discharges
                </h2>
              </div>
              <span className="text-xs font-mono bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                gemini-3.8-flash + googleSearch
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Fetches real-time official bulletins from Central Water Commission (CWC), Hathnikund, Bhakra, Pong dams,
              and IMD radar warnings for flood-prone basins.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter river basin or barrage..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#0E1628] border border-blue-900 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearchGrounding}
                disabled={isSearching}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-md active:scale-95"
              >
                {isSearching ? <span className="animate-spin">🌀</span> : <Search className="w-4 h-4 text-[#CCFF00]" />}
                <span>Fetch Bulletin</span>
              </button>
            </div>

            {searchResult && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-message-pop">
                <div className="bg-[#0B111E] p-4 sm:p-5 rounded-xl border border-blue-900/60 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {searchResult.text}
                </div>

                {searchResult.sources && searchResult.sources.length > 0 && (
                  <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/80 space-y-2">
                    <h4 className="font-bold text-[#CCFF00] text-xs flex items-center gap-1.5 uppercase tracking-wide">
                      <ExternalLink className="w-4 h-4 text-[#CCFF00]" />
                      Verified Web Citations & Official Portals
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {searchResult.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-2.5 bg-[#0E1628] rounded-lg border border-blue-900 hover:border-[#CCFF00] transition text-blue-300"
                        >
                          <span className="font-medium truncate mr-2">{src.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#CCFF00]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE MAPS GROUNDING */}
      {activeTab === 'maps' && (
        <div className="space-y-6">
          <div className="bg-[#080D1A] rounded-3xl p-6 border-2 border-blue-600/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#CCFF00]" />
                <h2 className="text-lg font-bold text-white">
                  Google Maps Grounding: Relief Shelters, KVKs & Mandis
                </h2>
              </div>
              <span className="text-xs font-mono bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                gemini-3.8-flash + googleMaps
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Locates nearby Krishi Vigyan Kendras (KVK), grain mandis with elevated pakka plinths, and official district
              flood relief shelters relative to your field coordinates.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={mapsQuery}
                onChange={(e) => setMapsQuery(e.target.value)}
                placeholder="Search emergency facilities on Google Maps..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#0E1628] border border-blue-900 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleMapsGrounding}
                disabled={isMapping}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-md active:scale-95"
              >
                {isMapping ? <span className="animate-spin">🌀</span> : <MapPin className="w-4 h-4 text-[#CCFF00]" />}
                <span>Find Nearby</span>
              </button>
            </div>

            {mapsResult && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-message-pop">
                <div className="bg-[#0B111E] p-4 sm:p-5 rounded-xl border border-blue-900/60 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {mapsResult.text}
                </div>

                {mapsResult.places && mapsResult.places.length > 0 && (
                  <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/80 space-y-2">
                    <h4 className="font-bold text-[#CCFF00] text-xs flex items-center gap-1.5 uppercase tracking-wide">
                      <MapPin className="w-4 h-4 text-[#CCFF00]" />
                      Extracted Google Maps Navigation Links
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {mapsResult.places.map((place, i) => (
                        <a
                          key={i}
                          href={place.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 bg-[#0E1628] rounded-lg border border-blue-900 hover:border-[#CCFF00] transition text-white"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold block truncate text-slate-100">{place.title}</span>
                            <span className="text-[10px] text-blue-400">Open navigation route</span>
                          </div>
                          <ExternalLink className="w-4 h-4 shrink-0 text-[#CCFF00]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
