import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Small muted mono label that sits above a section heading. */
export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
      {children}
    </span>
  );
}

/**
 * Standard section shell: anchor id, consistent vertical rhythm,
 * an optional mono kicker + serif heading (revealed on scroll), then children.
 */
export function Section({
  id,
  tag,
  heading,
  intro,
  children,
  className,
}: {
  id: string;
  tag?: string;
  heading: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-18">
        <Reveal className="mb-12 md:mb-14">
          {tag ? <SectionTag>{tag}</SectionTag> : null}
          <h2 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-foreground md:text-[2.6rem] md:leading-[1.1]">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
