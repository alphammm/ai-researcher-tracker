interface Researcher {
  name: string;
  company: string;
  role: string;
  previousOrg: string;
  previousRole: string;
  leftDate: string;
  founded: string;
  funding: string;
  valuation: string;
  stage: string;
  focus: string;
  location: string;
  twitter: string;
  notes: string;
}

export default function ResearcherRow({
  researcher,
  index,
}: {
  researcher: Researcher;
  index: number;
}) {
  const r = researcher;

  return (
    <tr className="border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-secondary)]">
      <td className="py-3 pl-4 pr-2 text-sm text-[var(--text-muted)]">
        {index + 1}
      </td>
      <td className="px-2 py-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text-primary)]">
              {r.name}
            </span>
            {r.twitter && (
              <a
                href={`https://x.com/${r.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--accent)] hover:underline"
              >
                {r.twitter}
              </a>
            )}
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {r.previousRole} @ {r.previousOrg}
          </span>
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-[var(--text-primary)]">
            {r.company}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {r.role} · {r.location}
          </span>
        </div>
      </td>
      <td className="px-2 py-3 text-center">
        <span className="inline-block rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
          {r.stage}
        </span>
      </td>
      <td className="px-2 py-3 text-right">
        <div className="flex flex-col items-end">
          <span className="font-mono text-sm font-semibold text-green-400">
            {r.funding || "—"}
          </span>
          {r.valuation && (
            <span className="text-xs text-[var(--text-muted)]">
              @{r.valuation}
            </span>
          )}
        </div>
      </td>
      <td className="hidden px-2 py-3 lg:table-cell">
        <span className="text-xs text-[var(--text-secondary)]">{r.focus}</span>
      </td>
      <td className="hidden px-2 py-3 xl:table-cell">
        <span className="max-w-xs truncate text-xs text-[var(--text-muted)]">
          {r.notes}
        </span>
      </td>
    </tr>
  );
}
