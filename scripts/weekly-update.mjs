#!/usr/bin/env node

/**
 * Weekly update script — runs via GitHub Actions every Monday 9AM UTC.
 * Uses Claude API with web search to find new AI researcher departures
 * and updates data/researchers.json accordingly.
 *
 * Required env: ANTHROPIC_API_KEY
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "data", "researchers.json");

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function main() {
  console.log("📡 Loading current data...");
  const currentData = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

  // Build a summary of who we already track
  const trackedNames = [];
  for (const tier of Object.values(currentData.tiers)) {
    for (const r of tier.researchers) {
      trackedNames.push(`${r.name} (${r.company})`);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are an AI research analyst. Today is ${today}.

I maintain a tracker of top AI researchers who have left major labs (OpenAI, Google DeepMind, Meta AI, Anthropic, xAI, Microsoft Research, etc.) to start their own companies.

Here are the researchers I currently track:
${trackedNames.map((n) => `- ${n}`).join("\n")}

Please search for any NEW developments in the past week:
1. Any new notable AI researcher departures from major labs
2. Any new funding announcements for tracked startups
3. Any major updates (acquisitions, product launches, team changes)
4. Any new stealth startups by AI researchers

For each finding, provide:
- Researcher name
- Previous org and role
- New company name
- Funding amount (if known)
- What they're working on
- Source URL

IMPORTANT: Respond in valid JSON format:
{
  "newResearchers": [
    {
      "name": "...",
      "company": "...",
      "role": "...",
      "previousOrg": "...",
      "previousRole": "...",
      "leftDate": "YYYY-MM",
      "founded": "YYYY-MM",
      "funding": "...",
      "valuation": "...",
      "stage": "Stealth|Seed|Series A|Growth",
      "focus": "...",
      "location": "...",
      "twitter": "",
      "notes": "...",
      "suggestedTier": "A|B|C|D|E"
    }
  ],
  "updates": [
    {
      "researcher": "name",
      "field": "funding|valuation|stage|notes",
      "newValue": "...",
      "source": "..."
    }
  ],
  "weeklyHighlights": ["..."]
}

If there are no new findings, return empty arrays. Only include verified information with sources.`;

  console.log("🤖 Querying Claude for updates...");
  const rawResponse = await callClaude(prompt);

  // Extract JSON from response (handle markdown code blocks)
  let jsonStr = rawResponse;
  const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  let updates;
  try {
    updates = JSON.parse(jsonStr);
  } catch {
    console.log("⚠️  Could not parse Claude response as JSON. Raw response:");
    console.log(rawResponse);
    console.log("\nNo updates applied.");
    return;
  }

  let changed = false;

  // Apply new researchers
  if (updates.newResearchers && updates.newResearchers.length > 0) {
    for (const nr of updates.newResearchers) {
      const tier = nr.suggestedTier || "C";
      if (currentData.tiers[tier]) {
        // Check for duplicates
        const exists = currentData.tiers[tier].researchers.some(
          (r) => r.name === nr.name && r.company === nr.company
        );
        if (!exists) {
          const { suggestedTier, ...researcherData } = nr;
          currentData.tiers[tier].researchers.push(researcherData);
          console.log(`  ✅ Added ${nr.name} (${nr.company}) to Tier ${tier}`);
          changed = true;
        }
      }
    }
  }

  // Apply field updates
  if (updates.updates && updates.updates.length > 0) {
    for (const upd of updates.updates) {
      for (const tier of Object.values(currentData.tiers)) {
        const researcher = tier.researchers.find(
          (r) => r.name === upd.researcher
        );
        if (researcher && upd.field in researcher) {
          researcher[upd.field] = upd.newValue;
          console.log(
            `  📝 Updated ${upd.researcher}.${upd.field} → ${upd.newValue}`
          );
          changed = true;
        }
      }
    }
  }

  // Add weekly update entry
  if (
    updates.weeklyHighlights &&
    updates.weeklyHighlights.length > 0
  ) {
    currentData.weeklyUpdates.unshift({
      date: today,
      highlights: updates.weeklyHighlights,
    });
    // Keep only last 12 weeks
    currentData.weeklyUpdates = currentData.weeklyUpdates.slice(0, 12);
    changed = true;
  }

  if (changed) {
    // Update metadata
    currentData.lastUpdated = today;
    currentData.stats.totalTracked = Object.values(currentData.tiers).reduce(
      (sum, tier) => sum + tier.researchers.length,
      0
    );

    writeFileSync(DATA_PATH, JSON.stringify(currentData, null, 2) + "\n");
    console.log(`\n✅ Data updated! ${currentData.stats.totalTracked} researchers tracked.`);
  } else {
    console.log("\nℹ️  No new updates found this week.");
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
