"use client";

import { GrowthRings } from "@/components/growth-rings";
import { EmailInput } from "@/components/email-input";
import { TheLoop } from "@/components/the-loop";
import { StreakComparison } from "@/components/streak-comparison";
import { PhoneMockup } from "@/components/phone-mockup";
import { FeatureRows } from "@/components/feature-rows";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2ECDD] text-[#22281F]">
      {/* Hero Section - Asymmetric */}
      <section className="relative px-4 py-16 md:py-28 overflow-hidden">
        {/* Off-center growth rings background — soft, ambient, breathing */}
        <div className="absolute -right-48 -top-40 opacity-[0.14] pointer-events-none">
          <GrowthRings count={11} size="lg" idle />
        </div>
        <div className="absolute -left-40 bottom-0 opacity-[0.08] pointer-events-none hidden md:block">
          <GrowthRings count={7} size={360} idle />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C08A3E]">
                Fojusun
              </span>
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl leading-tight text-[#1F3D2E]">
              You don&apos;t rise to the level of your goals — you fall to the
              level of your systems.
            </h1>

            <p className="text-lg text-[#696159] leading-relaxed">
              A companion for the goals you actually want to keep.
            </p>

            <div>
              <EmailInput buttonLabel="Get early access" />
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-end"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      {/* The Loop - Interactive Section */}
      <TheLoop />

      {/* Streak Comparison */}
      <StreakComparison />

      {/* Philosophy Section */}
      <section className="px-4 py-24 md:py-32 bg-[#FFFDF8]">
        <div className="max-w-3xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="font-serif text-5xl md:text-6xl leading-tight text-[#1F3D2E]">
              &quot;The app isn&apos;t supposed to be like Duolingo. It should
              be a companion.&quot;
            </p>

            <p className="text-lg text-[#696159] leading-relaxed">
              You do the work in real life. Fojusun is where you come back to
              acknowledge it — and where it remembers what you&apos;re building
              toward, even on the days you don&apos;t.
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* What It Actually Does */}
      <FeatureRows />

      {/* Final CTA */}
      <section className="px-4 py-24 md:py-32 bg-[#FFFDF8]">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-5xl text-[#1F3D2E]">
            Build the systems. The goals take care of themselves.
          </h2>

          <div>
            <EmailInput buttonLabel="Get early access" />
          </div>

          <p className="text-sm text-[#696159]">
            No spam, no streaks to lose. Just a note when it&apos;s ready.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
