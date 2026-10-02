"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { HeroNav } from "@/components/hero-nav";
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
    <section id="top" className="relative pb-12 pt-10 md:pb-16 md:pt-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_0.6fr] md:gap-14 md:px-12 lg:px-18">
        {/* Text — second on mobile so the photo sits above it */}
        <motion.div
          className="order-2 md:order-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={item}
            className="font-serif text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 font-mono text-sm text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base"
          >
            <p>
              I build <Em>AI agents</Em> and the{" "}
              <Em>distributed systems</Em> they run on: RAG pipelines that cite
              their sources, multi-agent workflows, and backends that survive
              load, crashes and duplicate data.
            </p>
            <p>
              I&apos;ve shipped <Em>RAG pipelines</Em>, fine-tuned{" "}
              <Em>YOLO models</Em> for real-time inference, and built{" "}
              <Em>agentic platforms</Em> from scratch across my internships.
            </p>
            <p>
              I build things that <Em>actually run in production</Em>, and I
              prove it with benchmarks, not adjectives.
            </p>
            <p>
              <Em>Open to work</Em>: Full-time, Freelance, or Collabs.{" "}
              <a
                href={`mailto:${links.email}`}
                className="text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Let&apos;s talk.
              </a>
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
                className="rounded-lg border border-border bg-surface/40 px-3 py-2.5"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-mono text-lg text-foreground">
                    {s.value}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Social icons, then resume button */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
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
                  className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
            <a
              href={profile.resume}
              download
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <FileText className="size-4" /> My resume
            </a>
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
          <div className="relative min-h-[360px] w-full flex-1 overflow-hidden rounded-2xl border border-border">
            <Image
              src={profile.photo}
              alt="Sajjad Chaus"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover object-center [filter:grayscale(1)_brightness(1)_contrast(1.05)]"
            />
            {/* gentle bottom fade so the photo settles into the page */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
