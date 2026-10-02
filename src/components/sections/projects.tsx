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
          className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-muted-foreground"
        >
          <ArrowUpRight className="size-4" /> Live demo
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-muted-foreground"
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
      {project.live ? <span className="ml-2 text-foreground/80">· live</span> : null}
    </p>
  );
}

/** Large card: domain, title, story, the numbers that back it up, stack, links. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 md:p-7">
      {project.image ? (
        <div
          className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-surface"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          aria-hidden
        />
      ) : null}

      <DomainTag project={project} />
      <h3 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>

      {project.metrics?.length ? (
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-background/40 px-3 py-2.5">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-mono text-lg text-foreground">{m.value}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <p className="mt-6 text-sm font-medium text-foreground/80">{project.stack.join(" / ")}</p>
      <ProjectLinks project={project} />
    </article>
  );
}

/** Compact card for the rest of the work. */
function CompactCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border p-5">
      <DomainTag project={project} />
      <h3 className="mt-2 text-lg font-medium leading-snug text-foreground">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      {project.metrics?.length ? (
        <p className="mt-3 font-mono text-xs text-foreground/80">
          {project.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}
        </p>
      ) : null}
      <p className="mt-3 text-xs text-foreground/70">{project.stack.join(" / ")}</p>
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
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
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
