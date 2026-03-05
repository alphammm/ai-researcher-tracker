export default function StatsBar({
  stats,
}: {
  stats: {
    totalTracked: number;
    newThisWeek: number;
    stealthCount: number;
    totalFunding: string;
  };
}) {
  const cards = [
    {
      label: "Total Tracked",
      value: stats.totalTracked.toString(),
      icon: "👤",
      color: "text-[var(--accent)]",
    },
    {
      label: "New This Week",
      value: `+${stats.newThisWeek}`,
      icon: "🆕",
      color: "text-green-400",
    },
    {
      label: "Stealth / Pre-announce",
      value: stats.stealthCount.toString(),
      icon: "🔒",
      color: "text-yellow-400",
    },
    {
      label: "Total Funding",
      value: stats.totalFunding,
      icon: "💰",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--accent)]/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{card.icon}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              {card.label}
            </span>
          </div>
          <p className={`mt-2 text-2xl font-bold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
