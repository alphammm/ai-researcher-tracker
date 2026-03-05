interface TrendItem {
  trend: string;
  researchers: string[];
  heat: "hot" | "warm" | "emerging";
}

const heatConfig = {
  hot: { label: "HOT", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  warm: { label: "WARM", bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  emerging: { label: "NEW", bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
};

export default function TrendMap({ trends }: { trends: TrendItem[] }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          What They&apos;re Betting On
        </h2>
        <div className="flex gap-3 text-xs">
          {Object.entries(heatConfig).map(([key, cfg]) => (
            <span key={key} className={`flex items-center gap-1 ${cfg.text}`}>
              <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {trends.map((t) => {
          const cfg = heatConfig[t.heat];
          return (
            <div
              key={t.trend}
              className={`rounded-lg border border-[var(--border)] p-3 transition-colors hover:border-[var(--accent)]/30 ${cfg.bg}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {t.trend}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {t.researchers.map((r) => (
                  <span
                    key={r}
                    className="rounded-md bg-[var(--bg-primary)] px-2 py-0.5 text-xs text-[var(--text-secondary)]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
