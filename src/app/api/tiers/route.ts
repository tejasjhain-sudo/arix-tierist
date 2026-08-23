/* eslint-disable */

import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/kv";

export const dynamic = "force-dynamic";

async function fetchAllPlayers() {
  const allPlayers: any[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await fetch(`http://node.novagrid.fun:25582/api/players?limit=100&page=${page}`, {
        cache: "no-store"
      });

      if (!response.ok) break;

      const json = await response.json();
      if (json && Array.isArray(json.data)) {
        allPlayers.push(...json.data);
      }

      totalPages = json?.pagination?.pages ?? 1;
      page++;
    } while (page <= totalPages);
  } catch (error) {
    console.error("Error fetching pages from external API:", error);
  }

  return allPlayers;
}

export async function GET() {
  try {
    const { getTiers } = await import("@/lib/kv");
    const [players, profiles, kvTiers] = await Promise.all([
      fetchAllPlayers(),
      getProfiles(),
      getTiers(),
    ]);

    // Transform to Record<username, { tiers, region, profile }>
    const mappedData: Record<string, any> = {};
    
    const VALID_TIERS = new Set(["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"]);

    // First map external players API data (only registered players with username)
    players.forEach((player: any) => {
      if (player.minecraftUsername) {
        const username = player.minecraftUsername;
        const playerTiers: Record<string, string | null> = {
          sword: null, axe: null, nethpot: null, dpot: null,
          uhc: null, smp: null, crystal: null, mace: null,
        };

        if (player.tiers && typeof player.tiers === "object") {
          for (const [key, value] of Object.entries(player.tiers)) {
            if (typeof value === "string" && VALID_TIERS.has(value.toUpperCase())) {
              playerTiers[key] = value.toUpperCase();
            }
          }
        }

        const profile = profiles[username] || profiles[username.toLowerCase()] || {};

        mappedData[username] = {
          tiers: playerTiers,
          region: player.region ?? "AS",
          profile: profile
        };
      }
    });

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Failed to fetch tiers from external API:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

