import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  SlidersHorizontal,
  Globe,
  Phone,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Send,
  Trash2,
  Lock,
  Info
} from 'lucide-react';

export const SettingsAlertsPage: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    alertPhone,
    setAlertPhone,
    smsConsent,
    setSmsConsent,
    isSmsVerified,
    setIsSmsVerified,
    smsSimulatedLogs,
    sendSimulatedSms
  } = useApp();

  const [inputPhone, setInputPhone] = useState(alertPhone);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
  const [optOutMessage, setOptOutMessage] = useState('');
  const [testAlertSentNotice, setTestAlertSentNotice] = useState(false);

  const handleSendOtp = () => {
    if (!inputPhone || inputPhone.length !== 10) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setOtpSent(true);
    setOtpSuccessMessage('Demo OTP sent to mobile number: 482910 (Enter this code to verify)');
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === '482910' || enteredOtp.length === 6) {
      setAlertPhone(inputPhone);
      setIsSmsVerified(true);
      setOtpSent(false);
      setOtpSuccessMessage('Mobile number verified successfully! Emergency alerts are now authorized.');
    } else {
      alert('Invalid OTP code. Please enter the 6-digit code provided.');
    }
  };

  const handleOptOut = () => {
    setSmsConsent(false);
    setIsSmsVerified(false);
    setOptOutMessage('You have successfully opted out of SMS alerts. No messages will be sent.');
    setTimeout(() => setOptOutMessage(''), 4000);
  };

  const handleTriggerTestSms = () => {
    sendSimulatedSms();
    setTestAlertSentNotice(true);
    setTimeout(() => setTestAlertSentNotice(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t.settings.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.settings.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Language Preferences Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Globe className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {t.settings.languageHeader}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-2xl border text-left transition ${
              language === 'en'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">English</div>
            <div className="text-xs text-slate-500 mt-1">Default Technical & Agricultural</div>
          </button>

          <button
            onClick={() => setLanguage('hi')}
            className={`p-4 rounded-2xl border text-left transition ${
              language === 'hi'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">हिन्दी (Hindi)</div>
            <div className="text-xs text-slate-500 mt-1">उत्तर प्रदेश, बिहार, राजस्थान, मध्य प्रदेश</div>
          </button>

          <button
            onClick={() => setLanguage('pa')}
            className={`p-4 rounded-2xl border text-left transition ${
              language === 'pa'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">ਪੰਜਾਬੀ (Punjabi)</div>
            <div className="text-xs text-slate-500 mt-1">ਪੰਜਾਬ, ਹਰਿਆਣਾ ਅਤੇ ਘੱਗਰ-ਸਤਲੁਜ ਬੇਸਿਨ</div>
          </button>
        </div>
      </div>

      {/* Emergency SMS Flood Alerts Registration */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Phone className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {t.settings.smsHeader}
          </h2>
        </div>

        {otpSuccessMessage && (
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{otpSuccessMessage}</span>
          </div>
        )}

        {optOutMessage && (
          <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 rounded-xl text-xs font-semibold">
            {optOutMessage}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.settings.smsPhoneLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                maxLength={10}
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
              >
                {t.settings.sendOtp}
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.settings.enterOtp} (Test Code: 482910)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="6-digit code"
                  className="w-48 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold tracking-widest text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  {t.settings.verifyOtp}
                </button>
              </div>
            </div>
          )}

          {/* Consent Checkbox */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {t.settings.smsConsentCheck}
              </div>
            </label>
          </div>

          {/* Testing Mode & Opt-out Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTriggerTestSms}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.settings.testSmsButton}</span>
              </button>
              {testAlertSentNotice && (
                <span className="text-xs font-bold text-emerald-600 animate-fadeIn">
                  ✓ Test message dispatched to log!
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleOptOut}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              {t.settings.optOutSms}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>Safe Testing Mode Notice:</strong> {t.settings.testSmsNote}
          </div>
        </div>

        {/* SMS Message Delivery Log */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Verified Alert Delivery Log
          </h3>
          <div className="space-y-2">
            {smsSimulatedLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
              >
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>To: {log.phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {log.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
