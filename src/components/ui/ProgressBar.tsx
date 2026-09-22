interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'cyan' | 'green' | 'amber' | 'red';
}

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-400',
  cyan: 'from-cyan-500 to-cyan-400',
  green: 'from-green-500 to-green-400',
  amber: 'from-amber-500 to-amber-400',
  red: 'from-red-500 to-red-400',
};

const sizeMap: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'blue',
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-slate-300 font-medium">{label}</span>}
          {showValue && (
            <span className="text-sm font-bold text-white">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeMap[size]} bg-slate-700/50 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
