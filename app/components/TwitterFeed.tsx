interface TwitterAccount {
  handle: string;
  name: string;
  org: string;
  signal: string;
}

export default function TwitterFeed({
  accounts,
}: {
  accounts: TwitterAccount[];
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
        Twitter / X Watchlist
      </h2>

      <div className="space-y-2">
        {accounts.map((account) => (
          <a
            key={account.handle}
            href={`https://x.com/${account.handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 transition-colors hover:border-[var(--accent)]/30 hover:bg-[var(--bg-secondary)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                {account.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {account.name}
                  </span>
                  <span className="text-xs text-[var(--accent)]">
                    {account.handle}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {account.org}
                </span>
              </div>
            </div>
            <span className="hidden text-right text-xs text-[var(--text-muted)] sm:block sm:max-w-48">
              {account.signal}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
