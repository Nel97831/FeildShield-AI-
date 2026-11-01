import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/crops';
import { CropType } from '../types';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ShieldAlert,
  Sprout,
  ArrowRight,
  Package,
  Wrench,
  Info,
  Droplets,
  Zap,
  Sparkles,
  Layers,
  Clock,
  PlusCircle,
  Check,
  Filter
} from 'lucide-react';

interface CustomTask {
  id: string;
  title: string;
  category: 'drainage' | 'machinery' | 'spray' | 'safety' | 'general';
  urgency: 'immediate' | 'medium' | 'low';
  completed: boolean;
  timeEstimate?: string;
}

export const CropPlannerPage: React.FC = () => {
  const { t, activeFarm, checklistProgress, toggleChecklistItem, setActivePage } = useApp();

  const [selectedCropKey, setSelectedCropKey] = useState<CropType>(activeFarm?.cropType || 'paddy');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([
    {
      id: 'custom-1',
      title: 'Hoist spare 5 HP electric monoblock motor onto trolley platform',
      category: 'machinery',
      urgency: 'immediate',
      completed: true,
      timeEstimate: '45 mins'
    },
    {
      id: 'custom-2',
      title: 'Prepare 100L clean borewell water drum for post-drainage leaf wash',
      category: 'spray',
      urgency: 'medium',
      completed: false,
      timeEstimate: '30 mins'
    }
  ]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'drainage' | 'machinery' | 'spray' | 'safety' | 'general'>('drainage');
  const [newUrgency, setNewUrgency] = useState<'immediate' | 'medium' | 'low'>('immediate');

  const cropInfo = CROPS_DATA[selectedCropKey] || CROPS_DATA.paddy;
  const currentGrowthStage = activeFarm?.growthStage || 'vegetative';
  const currentStageInfo = cropInfo?.stages.find((s) => s.stage === currentGrowthStage) || cropInfo.stages[1];

  const officialCompletedCount = cropInfo.preFloodChecklist.filter((i) => !!checklistProgress[i.id]).length;
  const customCompletedCount = customTasks.filter((t) => t.completed).length;
  const totalCompletedCount = officialCompletedCount + customCompletedCount;
  const totalTasksCount = cropInfo.preFloodChecklist.length + customTasks.length;
  const progressPercent = totalTasksCount > 0 ? Math.round((totalCompletedCount / totalTasksCount) * 100) : 0;

  const toggleCustomTask = (id: string) => {
    setCustomTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: CustomTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      urgency: newUrgency,
      completed: false
    };

    setCustomTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setShowAddTaskModal(false);
  };

  // Helper colors for task categories
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'drainage':
        return {
          bg: 'bg-sky-500/15',
          border: 'border-sky-500/40',
          text: 'text-sky-300',
          badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
          icon: Droplets
        };
      case 'machinery':
        return {
          bg: 'bg-amber-500/15',
          border: 'border-amber-500/40',
          text: 'text-amber-300',
          badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
          icon: Wrench
        };
      case 'spray':
      case 'fertilizer':
        return {
          bg: 'bg-emerald-500/15',
          border: 'border-emerald-500/40',
          text: 'text-emerald-300',
          badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
          icon: Sprout
        };
      case 'safety':
      case 'electric':
        return {
          bg: 'bg-rose-500/15',
          border: 'border-rose-500/40',
          text: 'text-rose-300',
          badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
          icon: ShieldAlert
        };
      default:
        return {
          bg: 'bg-purple-500/15',
          border: 'border-purple-500/40',
          text: 'text-purple-300',
          badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
          icon: Package
        };
    }
  };

  const filteredTasks = cropInfo.preFloodChecklist.filter((item) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'immediate') return item.urgency === 'immediate';
    return item.category.toLowerCase().includes(activeCategoryFilter.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans text-[#DAF1DE]">
      {/* 1. Header Banner in Rich Forest Emerald & Amber Glow */}
      <div className="bg-gradient-to-br from-[#0B2B26] via-[#103830] to-[#072420] border-2 border-[#235347] p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agricultural Contingency & Task Matrix</span>
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full font-bold">
                Active Crop: {cropInfo.nativeNames.en} ({cropInfo.nativeNames.hi})
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Crop Protection Planner & Contingency Tasks
            </h1>
            <p className="text-xs sm:text-sm text-[#DAF1DE] max-w-2xl leading-relaxed">
              Step-by-step agronomist-verified field protocols to safeguard standing crops, power starters, irrigation bunds, and yield before, during, and after river floods.
            </p>
          </div>

          {/* Quick Crop Switcher Bar */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-emerald-500/40 shrink-0 w-full md:w-auto space-y-2.5 shadow-lg">
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center justify-between">
              <span>Select Standing Crop:</span>
              <span className="text-[10px] text-slate-300">6 Major Crops</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-xs">
              {(['paddy', 'cotton', 'wheat', 'sugarcane', 'maize', 'mustard'] as CropType[]).map((cKey) => {
                const isCur = selectedCropKey === cKey;
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => setSelectedCropKey(cKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                      isCur
                        ? 'bg-[#8EB69B] text-[#051F20] font-black shadow-md'
                        : 'bg-[#051F20] text-[#DAF1DE] border border-[#235347] hover:bg-[#235347]'
                    }`}
                  >
                    {cKey}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Critical Safety Warning Banner with Vivid Alert Red/Orange Glow */}
      <div className="bg-gradient-to-r from-rose-950/90 via-red-950/80 to-amber-950/90 p-5 rounded-2xl border-2 border-rose-500/60 text-xs text-rose-100 flex items-start gap-4 shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
        </div>
        <div className="space-y-1">
          <strong className="font-black text-white text-sm block tracking-wide">
            ⚠️ Human & Cattle Safety Mandate (NDMA / CWC Guideline)
          </strong>
          <p className="leading-relaxed text-rose-200">
            Never enter fast-flowing canal breaches or swelling riverbanks to unblock culverts during active flood surges. Switch off main tubewell breakers from elevated ground before water touches starters. Dial <strong className="text-white underline">1078</strong> for instant disaster rescue.
          </p>
        </div>
      </div>

      {/* 3. Crop Flood Tolerance & Growth Stage Vulnerability (Rich Color Cards) */}
      <div className="bg-[#0B2B26] p-6 sm:p-8 rounded-3xl border border-[#235347] shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#235347] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Agronomic Tolerance & Growth Stage: {cropInfo.nativeNames.en}
              </h2>
              <span className="text-xs text-[#8EB69B]">
                Botanical Profile: {cropInfo.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#163832] text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase">
              Current Stage: {currentGrowthStage}
            </span>
          </div>
        </div>

        {/* 4 Multi-Color Metric Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tolerance Rating */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-teal-500/30 space-y-2 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-300 flex items-center justify-between">
              <span>Flood Tolerance</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            </div>
            <div className="text-xl font-black text-white capitalize">
              {cropInfo.floodTolerance} Tolerance
            </div>
            <p className="text-[11px] text-[#DAF1DE] leading-relaxed">
              Relative physiological resilience of root tissues against hypoxia.
            </p>
          </div>

          {/* Card 2: Safe Submergence Limit */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-sky-500/30 space-y-2 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-sky-300 flex items-center justify-between">
              <span>Submergence Limit</span>
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl font-black text-sky-200">
              {cropInfo.maxSubmergenceHours} Hours
            </div>
            <p className="text-[11px] text-[#DAF1DE] leading-relaxed">
              Max safe immersion before irreversible anoxia and root death.
            </p>
          </div>

          {/* Card 3: Recovery Horizon */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-amber-500/30 space-y-2 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-between">
              <span>Recovery Window</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-200">
              3 to 7 Days
            </div>
            <p className="text-[11px] text-[#DAF1DE] leading-relaxed">
              Foliar spray and drainage window to stimulate adventitious tillers.
            </p>
          </div>

          {/* Card 4: Silt Vulnerability */}
          <div className="bg-[#163832] p-4 rounded-2xl border border-rose-500/30 space-y-2 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-300 flex items-center justify-between">
              <span>Silt Threat Score</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-black text-rose-200">
              Critical &gt;2cm Silt
            </div>
            <p className="text-[11px] text-[#DAF1DE] leading-relaxed">
              River sediment crust suffocates leaf pores if not rinsed promptly.
            </p>
          </div>
        </div>

        {/* Growth Stage Roadmap Timeline with Colorful Nodes */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-[#8EB69B] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Growth Stages & Submergence Vulnerability Timeline:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cropInfo.stages.map((stg, idx) => {
              const isCurrent = stg.stage === currentGrowthStage;
              const nodeColors = [
                'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
                'border-teal-500/50 bg-teal-950/40 text-teal-300',
                'border-amber-500/50 bg-amber-950/40 text-amber-300',
                'border-rose-500/50 bg-rose-950/40 text-rose-300'
              ][idx % 4];

              return (
                <div
                  key={stg.stage}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'ring-2 ring-emerald-400 bg-[#163832] border-emerald-400 shadow-lg'
                      : `${nodeColors} bg-[#051F20]`
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                      Stage {idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] bg-emerald-500 text-[#051F20] font-black px-1.5 py-0.2 rounded-full uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white capitalize">
                    {stg.stage}
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {stg.vulnerabilityNotice.en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Vivid Progress Tracker & Task Statistics */}
      <div className="bg-[#0B2B26] p-6 rounded-3xl border border-[#235347] shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preparedness Execution Score</span>
            </div>
            <h3 className="text-lg font-black text-white mt-0.5">
              {totalCompletedCount} of {totalTasksCount} Field Protocols Completed
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {progressPercent}%
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-bold bg-[#163832] text-emerald-300 border border-emerald-500/40">
              {progressPercent >= 80 ? '🌟 Highly Prepared' : progressPercent >= 40 ? '⚡ Action in Progress' : '⚠️ Immediate Action Needed'}
            </span>
          </div>
        </div>

        {/* Animated Multi-Gradient Progress Bar */}
        <div className="w-full bg-[#051F20] h-4 rounded-full overflow-hidden border border-[#235347] p-0.5 shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>
      </div>

      {/* 5. Interactive Filter Pills & Add Task Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter Tasks:</span>
          </span>
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'immediate', label: '🚨 Immediate Priority' },
            { id: 'drainage', label: '🌊 Drainage Cuts' },
            { id: 'machinery', label: '⚡ Motors & Tubewells' },
            { id: 'fertilizer', label: '🌱 Foliar Nutrition' }
          ].map((filt) => (
            <button
              key={filt.id}
              onClick={() => setActiveCategoryFilter(filt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeCategoryFilter === filt.id
                  ? 'bg-gradient-to-r from-[#8EB69B] to-emerald-400 text-[#051F20] font-black shadow-md'
                  : 'bg-[#0B2B26] text-[#DAF1DE] border border-[#235347] hover:bg-[#163832]'
              }`}
            >
              {filt.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddTaskModal(true)}
          className="button-glow-active bg-[#163832] hover:bg-[#235347] text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>Add Custom Field Task</span>
        </button>
      </div>

      {/* Add Task Modal / Expanded Inline Box */}
      {showAddTaskModal && (
        <form
          onSubmit={handleAddCustomTask}
          className="bg-[#0B2B26] p-5 rounded-2xl border-2 border-emerald-400/60 shadow-2xl space-y-4 animate-message-pop"
        >
          <div className="flex items-center justify-between border-b border-[#235347] pb-3">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Create Custom Farm Task for {cropInfo.nativeNames.en}</span>
            </h4>
            <button
              type="button"
              onClick={() => setShowAddTaskModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Task Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Clean pump strainer mesh & grease bearings"
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Category</label>
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="w-full bg-[#051F20] border border-[#235347] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="drainage">Field Drainage</option>
                <option value="machinery">Machinery & Power</option>
                <option value="spray">Foliar Spray & Nutrients</option>
                <option value="safety">Cattle & Electrical Safety</option>
                <option value="general">General Operations</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddTaskModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs px-4 py-2 rounded-xl transition shadow-md"
            >
              Save Custom Task
            </button>
          </div>
        </form>
      )}

      {/* 6. Tasks List with Rich Color Badges and Interactive Checkboxes */}
      <div className="space-y-3.5">
        {/* Custom Farmer Tasks Section */}
        {customTasks.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized Farm Tasks ({customTasks.length})</span>
            </div>
            {customTasks.map((ct) => {
              const styles = getCategoryStyles(ct.category);
              const CatIcon = styles.icon;
              return (
                <div
                  key={ct.id}
                  onClick={() => toggleCustomTask(ct.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 shadow-md ${
                    ct.completed
                      ? 'bg-[#163832]/60 border-emerald-500/50'
                      : 'bg-[#0B2B26] border-[#235347] hover:border-emerald-400/80 hover:bg-[#163832]/40'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 focus:outline-none"
                    aria-label={ct.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {ct.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-[#051F20]" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 hover:text-emerald-400" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold ${
                        ct.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}>
                        {ct.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border ${styles.badgeBg}`}>
                          {ct.category}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/40">
                          {ct.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Official Crop Contingency Protocols */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Agronomic Protocols for {cropInfo.nativeNames.en} ({filteredTasks.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">ICAR / PAU Vetted Protocols</span>
          </div>

          {filteredTasks.map((item) => {
            const isDone = !!checklistProgress[item.id];
            const styles = getCategoryStyles(item.category);
            const CatIcon = styles.icon;
            const isImmediate = item.urgency === 'immediate';

            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-md ${
                  isDone
                    ? 'bg-[#163832]/60 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : isImmediate
                    ? 'bg-[#0B2B26] border-rose-500/40 hover:border-rose-400 hover:bg-[#163832]/40'
                    : 'bg-[#0B2B26] border-[#235347] hover:border-emerald-400/80 hover:bg-[#163832]/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    className="mt-1 focus:outline-none shrink-0"
                    aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-[#051F20]" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 hover:text-emerald-400" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${styles.bg} border ${styles.border}`}>
                          <CatIcon className={`w-3.5 h-3.5 ${styles.text}`} />
                        </div>
                        <h3 className={`text-xs sm:text-sm font-bold ${
                          isDone ? 'line-through text-slate-400' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg border ${styles.badgeBg}`}>
                          {item.category}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg border ${
                          isImmediate
                            ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                            : 'bg-amber-500/20 text-amber-200 border-amber-500/50'
                        }`}>
                          {item.urgency}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#DAF1DE] leading-relaxed">
                      {item.description}
                    </p>

                    {item.safetyWarning && (
                      <div className="text-[11px] font-bold text-amber-200 bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/50 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item.safetyWarning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Footer Agronomic Disclaimer & Quick Cross-Link */}
      <div className="bg-[#0B2B26] p-6 rounded-3xl border border-[#235347] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-slate-300 leading-relaxed">
            All flood recovery protocols conform to ICAR, Punjab Agricultural University (PAU), and Indian Meteorological Department (IMD) Agromet Contingency Plans. Ground-truth before applying synthetic chemicals.
          </p>
        </div>

        <button
          onClick={() => setActivePage('risks')}
          className="button-glow-active bg-[#8EB69B] hover:bg-white text-[#051F20] font-black text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
        >
          <span>Check 8-Risk Center</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#051F20]" />
        </button>
      </div>
    </div>
  );
};
