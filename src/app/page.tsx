import type { Metadata } from "next";
import TierListPage from "@/components/TierListPage";

export const metadata: Metadata = {
  title: "Arix Tierlist | Official Minecraft PvP Rankings",
  description: "View the official Arix player tier list. Real-time competitive rankings across all PvP kits.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <TierListPage />
    </main>
  );
}
