"use client";

import Link from "next/link";
import { SITE_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-green-core/8 px-6 md:px-16 py-8
                       flex items-center justify-between flex-wrap gap-4">
      <p className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim">
        {SITE_NAME}{" "}
        <span className="text-green-core">— {SITE_TAGLINE}</span>
      </p>
      <div className="flex gap-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[8px] tracking-[2px] uppercase text-text-dim
                     hover:text-green-core transition-colors duration-200"
        >
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[8px] tracking-[2px] uppercase text-text-dim
                     hover:text-green-core transition-colors duration-200"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-mono text-[8px] tracking-[2px] uppercase text-text-dim
                     hover:text-green-core transition-colors duration-200"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
