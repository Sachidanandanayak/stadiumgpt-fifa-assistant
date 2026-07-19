import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Timer, Car, DoorOpen, Clock, AlertCircle } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend,
} from 'recharts';
import MetricCard from '@/components/MetricCard';
import GlassCard from '@/components/GlassCard';
import { CardSkeleton } from '@/components/Skeleton';
import { dashboardApi } from '@/services/api';
import { t } from '@/utils/i18n';
import type { Language, DashboardMetric, GateStatus, ParkingZone, CrowdDensityPoint } from '@/types';

interface DashboardProps {
  language: Language;
}

// Demo fallback data (used if backend is unreachable) so the UI is always fully functional
const demoMetrics: DashboardMetric[] = [
  { label: 'Crowd Density', value: 78, unit: '%', trend: 'up', changePercent: 5.2 },
  { label: 'Avg Queue Length', value: 142, unit: 'people', trend: 'down', changePercent: 3.1 },
  { label: 'Parking Occupied', value: 86, unit: '%', trend: 'up', changePercent: 8.4 },
  { label: 'Avg Wait Time', value: 12, unit: 'min', trend: 'stable', changePercent: 0.5 },
];

const demoGates: GateStatus[] = [
  { gate: 'Gate A', status: 'open', queueLength: 120, waitTimeMinutes: 8 },
  { gate: 'Gate B', status: 'open', queueLength: 210, waitTimeMinutes: 15 },
  { gate: 'Gate C', status: 'delayed', queueLength: 340, waitTimeMinutes: 24 },
  { gate: 'Gate D', status: 'open', queueLength: 90, waitTimeMinutes: 6 },
  { gate: 'Gate E', status: 'closed', queueLength: 0, waitTimeMinutes: 0 },
];

const demoParking: ParkingZone[] = [
  { zone: 'North Lot', totalSlots: 800, occupiedSlots: 690 },
  { zone: 'South Lot', totalSlots: 600, occupiedSlots: 410 },
  { zone: 'VIP Deck', totalSlots: 150, occupiedSlots: 148 },
  { zone: 'East Lot', totalSlots: 500, occupiedSlots: 210 },
];

const demoCrowdTrend: CrowdDensityPoint[] = [
  { time: '3:00 PM', density: 20 }, { time: '4:00 PM', density: 35 },
  { time: '5:00 PM', density: 52 }, { time: '6:00 PM', density: 68 },
  { time: '7:00 PM', density: 85 }, { time: '8:00 PM', density: 92 },
  { time: '9:00 PM', density: 76 },
];

const metricIcons = [Users, Timer, Car, Clock];

export default function Dashboard({ language }: DashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetric[] | null>(null);
  const [gates, setGates] = useState<GateStatus[] | null>(null);
  const [parking, setParking] = useState<ParkingZone[] | null>(null);
  const [crowdTrend, setCrowdTrend] = useState<CrowdDensityPoint[] | null>(null);
  const [usingDemoData, setUsingDemoData] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [m, g, p, c] = await Promise.all([
          dashboardApi.getMetrics(),
          dashboardApi.getGates(),
          dashboardApi.getParking(),
          dashboardApi.getCrowdTrend(),
        ]);
        setMetrics(m); setGates(g); setParking(p); setCrowdTrend(c);
      } catch {
        setUsingDemoData(true);
        setMetrics(demoMetrics); setGates(demoGates); setParking(demoParking); setCrowdTrend(demoCrowdTrend);
      }
    }
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const parkingChartData = (parking ?? []).map((p) => ({
    zone: p.zone,
    occupied: p.occupiedSlots,
    available: p.totalSlots - p.occupiedSlots,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-1">{t(language, 'dashboard.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">Live operational data across all stadium zones.</p>
        {usingDemoData && (
          <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <AlertCircle className="w-3.5 h-3.5" /> Showing demo data — backend not connected
          </div>
        )}
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics
          ? metrics.map((m, i) => (
              <MetricCard
                key={m.label}
                icon={metricIcons[i % metricIcons.length]}
                label={m.label}
                value={m.value}
                unit={m.unit}
                trend={m.trend}
                changePercent={m.changePercent}
                delay={i * 0.08}
              />
            ))
          : Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Crowd Density Trend */}
        <GlassCard strong className="lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-fifa-gold" /> {t(language, 'dashboard.crowd')} Over Time
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={crowdTrend ?? []}>
              <defs>
                <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
              <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="density" stroke="#D4AF37" fill="url(#crowdGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Heatmap-style gate grid */}
        <GlassCard strong>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DoorOpen className="w-4 h-4 text-fifa-gold" /> {t(language, 'dashboard.gates')}
          </h3>
          <div className="space-y-3">
            {(gates ?? []).map((g) => {
              const heat =
                g.status === 'closed' ? 'bg-slate-500/20 text-slate-400'
                : g.queueLength > 250 ? 'bg-red-500/20 text-red-400'
                : g.queueLength > 130 ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400';
              return (
                <div key={g.gate} className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${heat}`}>
                  <div>
                    <p className="text-sm font-semibold">{g.gate}</p>
                    <p className="text-xs opacity-80 capitalize">{g.status}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p>{g.queueLength} in queue</p>
                    <p className="opacity-80">{g.waitTimeMinutes} min wait</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Parking */}
      <GlassCard strong>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Car className="w-4 h-4 text-fifa-gold" /> {t(language, 'dashboard.parking')}
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={parkingChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="zone" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="occupied" stackId="a" fill="#D4AF37" radius={[0, 0, 0, 0]} name="Occupied" />
            <Bar dataKey="available" stackId="a" fill="#0B8457" radius={[6, 6, 0, 0]} name="Available" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
