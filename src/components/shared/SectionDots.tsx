"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { NAV_ITEMS } from "@/lib/constants";

export default function SectionDots() {
  const pathname = usePathname();
  const triggerSlash = useUIStore((s) => s.triggerSlash);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90]
                    hidden lg:flex flex-col gap-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => triggerSlash()}
            className="flex items-center gap-2 justify-end group"
          >
            {/* Label */}
            <span
              className="font-mono text-[8px] tracking-[2px] uppercase text-text-dim
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         whitespace-nowrap"
            >
              {item.label}
            </span>

            {/* Dot */}
            <div
              className={`
                rounded-full flex-shrink-0 transition-all duration-250
                ${isActive
                  ? "w-2 h-2 bg-green-core"
                  : "w-1.5 h-1.5 bg-text-dim group-hover:bg-text-muted"
                }
              `}
              style={
                isActive
                  ? { boxShadow: "0 0 8px #00ff6a" }
                  : undefined
              }
            />
          </Link>
        );
      })}
    </div>
  );
}
