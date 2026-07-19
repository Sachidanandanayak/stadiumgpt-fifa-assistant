import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  accentColor?: string;
  delay?: number;
}

export default function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  changePercent,
  accentColor = 'text-fifa-gold',
  delay = 0,
}: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-emerald-400' : 'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="glass-strong rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl bg-current/10 ${accentColor}`}>
          <Icon className={`w-5 h-5 ${accentColor}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {changePercent}%
        </div>
      </div>
      <div>
        <p className="text-2xl font-display font-bold">
          {value.toLocaleString()} <span className="text-sm font-normal text-slate-400">{unit}</span>
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
}
