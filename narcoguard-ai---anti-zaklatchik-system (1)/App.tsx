
import React, { useState, useCallback } from 'react';
import { Shield, Camera, Activity, Map as MapIcon, Settings, Bell, Info, ShieldAlert } from 'lucide-react';
import CameraFeed from './components/CameraFeed';
import AlertPanel from './components/AlertPanel';
import Analytics from './components/Analytics';
import { DetectionEvent } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'analytics' | 'map'>('monitoring');
  const [alerts, setAlerts] = useState<DetectionEvent[]>([]);

  const handleNewDetection = useCallback((event: DetectionEvent) => {
    setAlerts(prev => [event, ...prev].slice(0, 30));
    // Ovozli ogohlantirish (optional)
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) {}
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#020202] text-zinc-100 font-inter">
      {/* Sidebar - High Tech Style */}
      <nav className="w-20 lg:w-72 border-r border-zinc-800/50 flex flex-col p-6 glass-panel z-50">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-600/20 ring-4 ring-red-600/10">
            <Shield size={28} className="text-white" />
          </div>
          <div className="hidden lg:block">
             <h2 className="font-black text-xl tracking-tighter uppercase italic">NarcoGuard</h2>
             <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase">AI Defense System</p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <NavItem 
            icon={<Camera size={22} />} 
            label="Live Monitoring" 
            active={activeTab === 'monitoring'} 
            onClick={() => setActiveTab('monitoring')} 
          />
          <NavItem 
            icon={<Activity size={22} />} 
            label="Neural Analytics" 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          <NavItem 
            icon={<MapIcon size={22} />} 
            label="Geo-Hotspots" 
            active={activeTab === 'map'} 
            onClick={() => setActiveTab('map')} 
          />
          <div className="pt-6">
             <NavItem icon={<Settings size={22} />} label="System Config" active={false} />
          </div>
        </div>

        <div className="mt-auto space-y-4">
           <div className="bg-zinc-900/50 p-5 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                 <span className="text-[11px] text-zinc-400 font-black uppercase">Core Engine: OK</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                Gemini 3.0 Vision modelli tahlil tizimi uzluksiz ishlamoqda.
              </p>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-zinc-800/50 px-10 flex items-center justify-between glass-panel z-40">
          <div className="flex items-center gap-6">
            <div className="h-8 w-[2px] bg-red-600/50 rounded-full" />
            <h1 className="text-xl font-bold tracking-tight">
              {activeTab === 'monitoring' && "OPERATSION MONITORING"}
              {activeTab === 'analytics' && "NEYRON ANALITIKA"}
              {activeTab === 'map' && "KRIMINAL XARITA"}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-2xl border border-white/5">
               <Bell size={18} className="text-zinc-500" />
               <span className="text-xs font-bold text-red-500">{alerts.length} NEW</span>
            </div>
            <div className="flex items-center gap-3 border-l border-zinc-800/50 pl-6">
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-zinc-100">CMD. AKBAROV</p>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Head of Ops</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-red-700 flex items-center justify-center text-xs font-black shadow-lg shadow-red-900/30">ADMIN</div>
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#020202]">
          {activeTab === 'monitoring' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 h-full">
              <div className="xl:col-span-8 space-y-8">
                <div className="space-y-4">
                   <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                         <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Primary Tactical Feed</span>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono">ENCRYPTED STREAM 256-BIT</span>
                   </div>
                   <CameraFeed onDetection={handleNewDetection} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="glass-panel rounded-3xl p-8 border border-zinc-800/50">
                      <h3 className="font-black text-sm mb-6 flex items-center gap-3 italic uppercase tracking-widest">
                        <ShieldAlert className="text-red-600" size={20} />
                        Deteksiya Logikasi
                      </h3>
                      <div className="space-y-4">
                         <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center shrink-0">
                               <span className="text-red-500 font-bold text-xs">01</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                               AI inson harakatini "zaklatchik" profiliga (egilish, telefon bilan rasmga olish) solishtiradi.
                            </p>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center shrink-0">
                               <span className="text-red-500 font-bold text-xs">02</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                               Shubha tasdiqlansa, avtomatik 10 soniyalik video-dalil zaxiralanadi.
                            </p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="glass-panel rounded-3xl p-8 border border-zinc-800/50 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                         <Activity className="text-blue-500" size={32} />
                         <span className="text-2xl font-black italic">98.4%</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">AI Confidence Rating</p>
                      <div className="w-full h-1 bg-zinc-900 rounded-full mt-4 overflow-hidden">
                         <div className="h-full bg-blue-500 w-[98%]" />
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="xl:col-span-4">
                <AlertPanel alerts={alerts} />
              </div>
            </div>
          )}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 ${
      active ? 'bg-red-600 text-white shadow-2xl shadow-red-600/20 border border-red-500/50 scale-[1.02]' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
    }`}
  >
    {icon}
    <span className="hidden lg:block font-black text-[11px] uppercase tracking-widest italic">{label}</span>
  </button>
);

export default App;
