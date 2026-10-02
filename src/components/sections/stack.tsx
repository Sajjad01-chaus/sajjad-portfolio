import { Reveal } from "@/components/reveal";
import { SectionTag } from "@/components/section";
import { ContributionGraph } from "@/components/contribution-graph";
import { techStack, type StackItem } from "@/lib/site";

// Flatten the grouped data and split into two rows that scroll opposite ways.
const items: StackItem[] = techStack.flatMap((g) => g.items);
const mid = Math.ceil(items.length / 2);
const rowA = items.slice(0, mid);
const rowB = items.slice(mid);

/** Brand-tinted icon (via CSS mask) + name. Colorless brands fall back to gray. */
function StackPill({ item }: { item: StackItem }) {
  const src = `/icons/${item.slug}.svg`;
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2">
      <span
        aria-hidden
        className="size-[16px] shrink-0"
        style={{
          backgroundColor: item.color ?? "#d4d4d4",
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
      <span className="whitespace-nowrap font-mono text-[13px] leading-none text-foreground/90">
        {item.name}
      </span>
    </span>
  );
}

/** One marquee row: two identical sets so a -50% translate loops seamlessly. */
function MarqueeRow({
  items,
  direction,
}: {
  items: StackItem[];
  direction: "left" | "right";
}) {
  const set = (
    <div className="flex shrink-0 gap-3 pr-3">
      {items.map((item) => (
        <StackPill key={item.name} item={item} />
      ))}
    </div>
  );
  return (
    <div
      className={`flex w-max ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {set}
      <div aria-hidden className="flex">
        {set}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-18">
        <Reveal className="mb-12 md:mb-14">
          <SectionTag>Stack</SectionTag>
          <h2 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-foreground md:text-[2.6rem] md:leading-[1.1]">
            Tools that I have used
          </h2>
        </Reveal>
      </div>

      {/* Marquees scroll in opposite directions, clipped within the page margin */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-18">
        <div className="marquee marquee-fade flex flex-col gap-3 overflow-hidden">
          <MarqueeRow items={rowA} direction="left" />
          <MarqueeRow items={rowB} direction="right" />
        </div>
      </div>

      {/* Contribution heatmap, directly below the tools */}
      <div className="mx-auto mt-8 w-full max-w-6xl px-6 md:px-12 lg:px-18 md:mt-10">
        <Reveal>
          <ContributionGraph />
        </Reveal>
      </div>
    </section>
  );
}
