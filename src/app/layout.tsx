// ============================================================
// ROOT LAYOUT — srihari-portfolio
// ============================================================

import type { Metadata } from "next";
import "./globals.css";

import Navbar          from "@/components/shared/Navbar";
import ScrollProgress  from "@/components/shared/ScrollProgress";
import SectionDots     from "@/components/shared/SectionDots";
import Cursor          from "@/components/effects/Cursor";
import ParticleCanvas  from "@/components/effects/ParticleCanvas";
import SwordSlash      from "@/components/effects/SwordSlash";
import EasterEgg       from "@/components/effects/EasterEgg";
import LoadingScreen   from "@/components/effects/LoadingScreen";
import ModeApplicator  from "@/components/effects/ModeApplicator";
import SoundSystem     from "@/components/effects/SoundSystem";
import MusicControl    from "@/components/effects/MusicControl";

export const metadata: Metadata = {
  title: "Srihari Prasad S — You Think, I Make It Real",
  description:
    "Portfolio of Srihari Prasad S — AI/ML Student, Full Stack Developer, AI Agent Maker. Building what I think.",
  keywords: ["Srihari Prasad", "portfolio", "AI", "ML", "full stack", "developer"],
  authors: [{ name: "Srihari Prasad S" }],
  openGraph: {
    title: "Srihari Prasad S — You Think, I Make It Real",
    description: "AI/ML Student · Full Stack Dev · AI Agent Maker",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Theme applicator — must be first so CSS vars apply before paint */}
        <ModeApplicator />

        {/* Sound engine */}
        <SoundSystem />
        <MusicControl />

        {/* Visual effects — always mounted */}
        <LoadingScreen />
        <Cursor />
        <ParticleCanvas />
        <SwordSlash />
        <EasterEgg />
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />
        <SectionDots />

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
