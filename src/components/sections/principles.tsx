import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/site";

/** "How I build": three habits, each with a receipt from a shipped project. */
export function Principles() {
  return (
    <Section
      id="approach"
      tag="How I build"
      heading="Models are the easy part. Systems that hold up are the job."
      intro="I like the unglamorous middle: queues, retries, evaluation sets, the crash at 2 a.m. Three habits run through everything I ship."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <article className="flex h-full flex-col glow-card rounded-2xl p-6">
              <span className="font-mono text-xs text-brand">0{i + 1}</span>
              <p className="text-gradient mt-4 font-display text-xl font-bold">{p.receipt}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
