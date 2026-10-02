"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { domains, projects, type Domain, type Project } from "@/lib/site";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-6 pt-6 text-sm">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1.5 font-medium text-brand transition-colors hover:bg-brand/20"
        >
          <ArrowUpRight className="size-4" /> Live demo
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-brand"
        >
          <GithubIcon className="size-4" /> Code
        </a>
      ) : null}
    </div>
  );
}

function DomainTag({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {project.domain}
      {project.live ? (
        <span className="ml-2 inline-flex items-center gap-1 text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" /> live
        </span>
      ) : null}
    </p>
  );
}

function StackChips({ stack, className }: { stack: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {stack.map((s) => (
        <li key={s} className="rounded-md border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Large card: domain, title, story, the numbers that back it up, stack, links. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="glow-card group flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-7">
      {project.image ? (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden border-b border-border md:-mx-7 md:-mt-7">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>
      ) : null}

      <DomainTag project={project} />
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>

      {project.metrics?.length ? (
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-brand/15 bg-brand/[0.04] px-3 py-2.5">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-xl font-bold text-brand">{m.value}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <StackChips stack={project.stack} className="mt-6" />
      <ProjectLinks project={project} />
    </article>
  );
}

/** Compact card for the rest of the work. */
function CompactCard({ project }: { project: Project }) {
  return (
    <article className="glow-card flex h-full flex-col rounded-xl p-5">
      <DomainTag project={project} />
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      {project.metrics?.length ? (
        <p className="mt-3 font-mono text-xs text-brand">
          {project.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}
        </p>
      ) : null}
      <StackChips stack={project.stack} className="mt-3" />
      <ProjectLinks project={project} />
    </article>
  );
}

const ALL = "All";

export function Projects() {
  const [filter, setFilter] = useState<Domain | typeof ALL>(ALL);
  const visible = projects.filter((p) => filter === ALL || p.domain === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);
  const liveCount = projects.filter((p) => p.live).length;

  return (
    <Section
      id="projects"
      tag={`Projects · ${projects.length} systems`}
      heading="Built end to end. Measured honestly."
      intro={`Every number below comes from a benchmark, an evaluation set or a held-out test, and ${liveCount} of these run live right now. Start with the featured work, or filter by area.`}
    >
      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {[ALL, ...domains].map((d) => {
          const count = d === ALL ? projects.length : projects.filter((p) => p.domain === d).length;
          const active = filter === d;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(d as Domain | typeof ALL)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-[12px] transition-colors",
                active
                  ? "border-brand bg-brand text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-brand/50 hover:text-brand"
              )}
            >
              {d} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {featured.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
              <FeaturedCard project={p} />
            </Reveal>
          ))}
        </div>
      ) : null}

      {rest.length ? (
        <>
          <p className="mb-6 mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            More projects
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06} className="h-full">
                <CompactCard project={p} />
              </Reveal>
            ))}
          </div>
        </>
      ) : null}
    </Section>
  );
}
