"use client";

import { useState } from "react";
import ResearcherRow from "./ResearcherRow";

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

interface TierData {
  title: string;
  color: string;
  researchers: Researcher[];
}

export default function TierSection({
  tierKey,
  tier,
}: {
  tierKey: string;
  tier: TierData;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`tier-${tier.color} overflow-hidden rounded-xl border border-[var(--border)] border-l-4 bg-[var(--bg-card)]`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[var(--bg-secondary)]"
      >
        <div className="flex items-center gap-3">
          <span className="tier-badge rounded-md px-2 py-0.5 text-sm font-bold">
            Tier {tierKey}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">
            {tier.title}
          </span>
          <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
            {tier.researchers.length} researcher
            {tier.researchers.length !== 1 ? "s" : ""}
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
                <th className="py-2 pl-4 pr-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  #
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Researcher
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Company
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Stage
                </th>
                <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Funding
                </th>
                <th className="hidden px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] lg:table-cell">
                  Focus
                </th>
                <th className="hidden px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] xl:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {tier.researchers.map((researcher, i) => (
                <ResearcherRow
                  key={researcher.name}
                  researcher={researcher}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
