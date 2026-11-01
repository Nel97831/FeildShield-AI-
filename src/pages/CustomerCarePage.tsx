import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  AlertTriangle,
  Building2,
  ShieldCheck,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  Headphones,
  Radio,
  Sparkles,
  MapPin,
  Flame,
  LifeBuoy
} from 'lucide-react';

interface SupportTicket {
  id: string;
  name: string;
  phone: string;
  district: string;
  category: 'evacuation' | 'drainage' | 'electrical_hazard' | 'damage_report' | 'general';
  priority: 'routine' | 'urgent';
  description: string;
  submittedAt: string;
  status: 'Open' | 'Dispatched' | 'Resolved';
  resolutionNotes?: string;
}

export const CustomerCarePage: React.FC = () => {
  const { activeFarm, sendSimulatedSms } = useApp();

  const [name, setName] = useState(activeFarm?.farmerName || '');
  const [phone, setPhone] = useState(activeFarm?.phone || '9876543210');
  const [district, setDistrict] = useState(activeFarm?.district || 'Sangrur');
  const [category, setCategory] = useState<SupportTicket['category']>('drainage');
  const [priority, setPriority] = useState<SupportTicket['priority']>('urgent');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'FS-9042',
      name: 'Baldev Singh',
      phone: '9812498712',
      district: 'Patiala',
      category: 'electrical_hazard',
      priority: 'urgent',
      description: 'Tubewell electrical motor starter submerged under 3 feet floodwater near river cut.',
      submittedAt: 'Today at 09:15 AM',
      status: 'Dispatched',
      resolutionNotes: 'Electricity lineman dispatched to de-energize feeder line 14.'
    },
    {
      id: 'FS-8819',
      name: 'Rameshwar Mehto',
      phone: '9431876521',
      district: 'Muzaffarpur',
      category: 'drainage',
      priority: 'routine',
      description: 'Main drainage culvert clogged with hyacinth weeds, preventing paddy plot drainage.',
      submittedAt: 'Yesterday at 04:30 PM',
      status: 'Resolved',
      resolutionNotes: 'Panchayat JCB cleared culvert outlet.'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !description) return;

    const newTicket: SupportTicket = {
      id: `FS-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      district,
      category,
      priority,
      description,
      submittedAt: 'Just Now',
      status: 'Open',
      resolutionNotes: priority === 'urgent'
        ? 'High Priority Ticket: Emergency disaster officer callback scheduled within 15 minutes.'
        : 'Ticket queued for agricultural officer review within 2 hours.'
    };

    setTickets((prev) => [newTicket, ...prev]);
    setSubmittedTicket(newTicket);
    setDescription('');

    // Send confirmation SMS to farmer
    sendSimulatedSms(
      `FieldShield AI Care: Ticket #${newTicket.id} received. Priority: ${newTicket.priority.toUpperCase()}. Disaster Helpline: 1078 / Emergency: 112.`,
      phone
    );
  };

  return (
    <div className="space-y-8 pb-12 font-sans max-w-5xl mx-auto text-[#DAF1DE]">
      {/* 1. Header in Forest & Vibrant Accents */}
      <div className="bg-[#0B2B26] p-6 sm:p-8 rounded-3xl border border-[#235347] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
              24x7 National Disaster & Emergency Support
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Headphones className="w-8 h-8 text-emerald-400" />
            <span>Emergency & Disaster Support Desk</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#DAF1DE] mt-2 max-w-2xl leading-relaxed">
            Direct access to National Disaster Response Force (NDRF), State Disaster Management authorities, and local field emergency control rooms.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="tel:1078"
            className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 p-3 rounded-2xl text-xs space-y-1 transition text-amber-200"
          >
            <div className="text-amber-400 font-bold uppercase text-[10px]">Disaster Helpline (NDMA):</div>
            <div className="text-base font-black text-white flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>1078</span>
            </div>
          </a>

          <a
            href="tel:112"
            className="bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 p-3 rounded-2xl text-xs space-y-1 transition text-rose-200"
          >
            <div className="text-rose-400 font-bold uppercase text-[10px]">National Emergency:</div>
            <div className="text-base font-black text-white flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>112</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Direct Emergency Hotline Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* National Emergency 112 */}
        <a
          href="tel:112"
          className="bg-[#0B2B26] hover:bg-[#163832] p-5 rounded-3xl border-2 border-rose-500/40 hover:border-rose-400 transition-all duration-300 shadow-lg group hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-700 text-rose-400 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
              National Emergency
            </div>
            <div className="text-xl font-black text-white mt-1">112</div>
            <p className="text-[11px] text-slate-300 mt-1">
              Immediate all-in-one emergency response (Police, Fire, Medical, Rescue).
            </p>
          </div>
          <div className="text-xs font-bold text-rose-300 pt-3 flex items-center gap-1">
            <span>Call 112 Now</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </a>

        {/* Disaster Helpline 1078 (NDMA) */}
        <a
          href="tel:1078"
          className="bg-[#0B2B26] hover:bg-[#163832] p-5 rounded-3xl border-2 border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg group hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Disaster Helpline (NDMA)
            </div>
            <div className="text-xl font-black text-white mt-1">1078</div>
            <p className="text-[11px] text-slate-300 mt-1">
              National Disaster Management Authority flood, cyclone, and calamity helpline.
            </p>
          </div>
          <div className="text-xs font-bold text-amber-300 pt-3 flex items-center gap-1">
            <span>Call 1078 Hotline</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </a>

        {/* State Disaster Control 1070 */}
        <a
          href="tel:1070"
          className="bg-[#0B2B26] hover:bg-[#163832] p-5 rounded-3xl border-2 border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 shadow-lg group hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#163832] border border-emerald-500/50 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              State Disaster Control (SDMA)
            </div>
            <div className="text-xl font-black text-white mt-1">1070</div>
            <p className="text-[11px] text-slate-300 mt-1">
              Barrage discharge alerts, embankment breach reports & district relief operations.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-300 pt-3 flex items-center gap-1">
            <span>Call State SDMA</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </a>

        {/* NDRF Rapid Response */}
        <a
          href="tel:01124363260"
          className="bg-[#0B2B26] hover:bg-[#163832] p-5 rounded-3xl border-2 border-sky-500/40 hover:border-sky-400 transition-all duration-300 shadow-lg group hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-700 text-sky-400 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
              NDRF Rapid Response HQ
            </div>
            <div className="text-base font-black text-white mt-1">011-24363260</div>
            <p className="text-[11px] text-slate-300 mt-1">
              Motorized inflatable boat rescue and floodwater community evacuation.
            </p>
          </div>
          <div className="text-xs font-bold text-sky-300 pt-3 flex items-center gap-1">
            <span>Call NDRF HQ</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </a>
      </div>

      {/* 3. Raise Support Ticket / Request Call Back Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0B2B26] p-6 sm:p-7 rounded-3xl border border-[#235347] shadow-xl space-y-5">
          <div className="border-b border-[#235347] pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Raise Disaster Support Ticket & Officer Callback</span>
            </h2>
            <p className="text-xs text-[#DAF1DE] mt-0.5">
              Submit your request. A designated district disaster coordinator will review and call you back.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                  Farmer Full Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sardar Gurpreet Singh"
                  required
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                  10-Digit Mobile Number:
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 9876543210"
                  required
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                  District:
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Sangrur / Patiala / Muzaffarpur"
                  required
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                  Support Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8EB69B] min-h-[44px]"
                >
                  <option value="drainage">Field Drainage & Trench Clearing</option>
                  <option value="electrical_hazard">Submerged Tubewell / Electric Hazard</option>
                  <option value="evacuation">Livestock & Family Evacuation</option>
                  <option value="damage_report">Farm Inundation & Crop Loss Intimation</option>
                  <option value="general">General Disaster Query</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                Priority Level:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs font-bold transition ${
                  priority === 'urgent' ? 'bg-rose-950/80 border-rose-500 text-white' : 'bg-[#051F20] border-[#235347] text-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'urgent'}
                    onChange={() => setPriority('urgent')}
                    className="accent-rose-500"
                  />
                  <span>🚨 Urgent (Active Flood / Hazard)</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs font-bold transition ${
                  priority === 'routine' ? 'bg-[#163832] border-emerald-500 text-white' : 'bg-[#051F20] border-[#235347] text-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'routine'}
                    onChange={() => setPriority('routine')}
                    className="accent-emerald-500"
                  />
                  <span>Routine Advisory (Within 2 Hours)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#DAF1DE] mb-1">
                Field Situation Description:
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe standing water depth, crop stage, or urgent assistance required..."
                required
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#8EB69B]"
              />
            </div>

            <button
              type="submit"
              className="button-glow-active w-full bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#051F20]" />
              <span>Submit Ticket & Dispatch Callback Request</span>
            </button>
          </form>

          {submittedTicket && (
            <div className="p-4 bg-emerald-950/90 border border-emerald-400 rounded-2xl text-xs space-y-1 animate-message-pop shadow-md">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Ticket #{submittedTicket.id} Submitted Successfully!</span>
              </div>
              <p className="text-slate-200">
                Confirmation SMS dispatched to +91 {submittedTicket.phone}. A coordinator will contact you shortly.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Live Resolution Feed */}
        <div className="bg-[#0B2B26] p-6 rounded-3xl border border-[#235347] shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#235347] pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Recent Support Requests</span>
            </h3>
            <span className="text-[10px] bg-[#163832] text-emerald-300 font-mono px-2 py-0.5 rounded border border-[#235347]">
              {tickets.length} Registered
            </span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="p-3.5 bg-[#051F20] rounded-2xl border border-[#235347] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-300">{t.id}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                    t.priority === 'urgent' ? 'bg-rose-950 text-rose-300 border border-rose-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}>
                    {t.priority}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white">{t.name} ({t.district})</div>
                  <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{t.description}</p>
                </div>
                {t.resolutionNotes && (
                  <div className="text-[10px] bg-[#163832] p-2 rounded-xl border border-[#235347] text-slate-200">
                    <strong className="text-emerald-400">Action:</strong> {t.resolutionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
