"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/site";
import { useScrollTo } from "@/lib/use-scroll-to";
import { cn } from "@/lib/utils";

/** Section links shown above the hero photo (reference: About Me · Projects · …). */
const items = [
  { id: "top", label: "About Me" },
  { id: "approach", label: "Approach" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function HeroNav() {
  const [active, setActive] = useState("top");
  const scrollTo = useScrollTo();

  // Scroll-spy: underline the link for the section currently in view.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section links"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 whitespace-nowrap font-mono text-[13px] md:justify-end"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => scrollTo(e, item.id)}
          className={cn(
            "underline-offset-[6px] transition-colors hover:text-foreground",
            active === item.id
              ? "text-foreground underline decoration-foreground/60"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </a>
      ))}
      <a
        href={profile.resume}
        download
        className="text-muted-foreground underline-offset-[6px] transition-colors hover:text-foreground"
      >
        Resume
      </a>
    </nav>
  );
}
