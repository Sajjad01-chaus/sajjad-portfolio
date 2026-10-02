import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Chip } from "@/components/chip";
import { experience } from "@/lib/site";

export function Experience() {
  return (
    <Section
      id="work"
      tag="Experience"
      heading="Where I've shipped"
    >
      <ol className="relative space-y-5 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-border before:content-['']">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05}>
            <div className="relative pl-8 sm:pl-10">
              {/* timeline node (sits on the continuous rail behind it) */}
              <span
                className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-foreground/70 bg-background"
                aria-hidden
              />

              <div className="rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-foreground/20 md:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                    {job.role}{" "}
                    <span className="text-muted-foreground">· {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {job.period}
                  </span>
                </div>

                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {job.location}
                </p>

                <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
                  {job.summary}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
