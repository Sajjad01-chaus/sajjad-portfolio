"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, FileText, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { HeroNav } from "@/components/hero-nav";
import { NetworkBackground } from "@/components/network-bg";
import { profile, links, stats } from "@/lib/site";

/** Emphasised phrase inside the hero prose (white against the muted body). */
function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>;
}

const socialLinks = [
  { href: links.github, label: "GitHub", Icon: GithubIcon },
  { href: links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${links.email}`, label: "Email", Icon: Mail },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-12">
      {/* Drifting node network behind the hero, fading out toward the bottom */}
      <NetworkBackground className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_0.6fr] md:gap-14 md:px-12 lg:px-18">
        {/* Text — second on mobile so the photo sits above it */}
        <motion.div
          className="order-2 md:order-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 font-mono text-[12px] text-brand"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Open to work · full-time, freelance, collabs
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl"
          >
            I build <span className="text-gradient">AI agents</span> and the
            systems they run on.
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-foreground/90">
            I&apos;m{" "}
            <a
              href={`mailto:${links.email}`}
              className="font-semibold text-foreground underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
            >
              {profile.name}
            </a>{" "}
            <span className="text-muted-foreground">· {profile.tagline}</span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base"
          >
            <p>
              <Em>RAG pipelines</Em> that cite their sources,{" "}
              <Em>multi-agent workflows</Em>, fine-tuned <Em>YOLO models</Em>{" "}
              for real-time inference, and <Em>distributed backends</Em> that
              survive load, crashes and duplicate data. I prove it with
              benchmarks, not adjectives.
            </p>
          </motion.div>

          {/* Headline numbers: each one checkable on GitHub or a live demo */}
          <motion.dl
            variants={item}
            className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glow-card rounded-xl px-3 py-3"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="text-gradient block font-display text-2xl font-bold">
                    {s.value}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Primary CTA, resume, then social icons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="btn-gradient inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
            >
              Explore projects <ArrowRight className="size-4" />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <FileText className="size-4" /> Resume
            </a>
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid size-11 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section links + photo (photo stretches to match the text height) */}
        <motion.div
          className="order-1 flex flex-col gap-5 md:order-2"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroNav />
          <div className="relative min-h-[360px] w-full flex-1 overflow-hidden rounded-2xl border border-brand/25 shadow-[0_0_60px_-15px_rgba(0,217,255,0.45)]">
            <Image
              src={profile.photo}
              alt="Sajjad Chaus"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover object-center"
            />
            {/* gentle bottom fade so the photo settles into the page */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
