interface WeeklyUpdate {
  date: string;
  highlights: string[];
}

export default function WeeklyUpdates({
  updates,
}: {
  updates: WeeklyUpdate[];
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
        Weekly Updates
      </h2>

      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.date} className="relative pl-6">
            <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            {updates.length > 1 && (
              <div className="absolute bottom-0 left-[4.5px] top-4 w-px bg-[var(--border)]" />
            )}
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {new Date(update.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <ul className="space-y-1">
              {update.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-sm text-[var(--text-secondary)]"
                >
                  • {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
