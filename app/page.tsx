import data from "@/data/researchers.json";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import TierSection from "./components/TierSection";
import TrendMap from "./components/TrendMap";
import WeeklyUpdates from "./components/WeeklyUpdates";
import TwitterFeed from "./components/TwitterFeed";

export default function Home() {
  const totalCount = Object.values(data.tiers).reduce(
    (sum, tier) => sum + tier.researchers.length,
    0
  );

  const tierOrder = ["A", "B", "C", "D", "E"] as const;

  return (
    <>
      <Header lastUpdated={data.lastUpdated} totalCount={totalCount} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Stats */}
          <StatsBar stats={data.stats} />

          {/* Tier Tables */}
          <section className="space-y-4">
            {tierOrder.map((key) => (
              <TierSection
                key={key}
                tierKey={key}
                tier={data.tiers[key]}
              />
            ))}
          </section>

          {/* Trend Map */}
          <TrendMap trends={data.trendMap as { trend: string; researchers: string[]; heat: "hot" | "warm" | "emerging" }[]} />

          {/* Bottom Grid: Updates + Twitter */}
          <div className="grid gap-6 lg:grid-cols-2">
            <WeeklyUpdates updates={data.weeklyUpdates} />
            <TwitterFeed accounts={data.twitterAccounts} />
          </div>

          {/* Footer */}
          <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)]">
            <p>
              Auto-updated weekly via Claude API + GitHub Actions. Data sourced
              from public reporting (TechCrunch, Fortune, The Information, etc.)
            </p>
            <p className="mt-1">
              Built for research purposes. Not investment advice.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
