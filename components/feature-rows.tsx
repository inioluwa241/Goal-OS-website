'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Bell } from 'lucide-react'
import { GrowthRings } from './growth-rings'

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

function GoalBreakdownMock() {
  const stages = [
    { label: 'Foundation', item: 'Learn Python syntax', color: '#C08A3E' },
    { label: 'Build', item: 'Ship a small CLI tool', color: '#3F6B4F' },
    { label: 'Application', item: 'Automate a real task', color: '#1F3D2E' },
  ]
  return (
    <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E2D9C4] space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E2D9C4]">
        <span className="font-serif text-lg text-[#1F3D2E]">
          &quot;Learn to code&quot;
        </span>
        <ArrowRight size={16} className="text-[#A89A83]" />
      </div>
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-start gap-3">
          <span
            className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: s.color }}
          />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#A89A83]">
              {String(i + 1).padStart(2, '0')} · {s.label}
            </p>
            <p className="text-sm text-[#22281F]">{s.item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SmartListMock() {
  const tasks = [
    { text: 'Review chapter notes', streak: '2', protect: true },
    { text: 'Draft intro paragraph', streak: '9', protect: false },
    { text: 'Read 20 pages', streak: '31', protect: false },
  ]
  return (
    <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E2D9C4] space-y-3">
      <p className="text-[11px] font-semibold text-[#696159] uppercase tracking-wider">
        Today · sorted for you
      </p>
      {tasks.map((t) => (
        <div
          key={t.text}
          className="flex items-center gap-3 bg-[#F2ECDD] p-3 rounded-2xl"
        >
          <div className="w-5 h-5 rounded-md border-2 border-[#C08A3E] flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-[#22281F] truncate">{t.text}</p>
            {t.protect && (
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-[#3F6B4F]">
                <Shield size={10} />
                Protecting your lowest streak
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[#C08A3E] flex-shrink-0">
            {t.streak}d
          </span>
        </div>
      ))}
    </div>
  )
}

function LockScreenMock() {
  return (
    <div className="rounded-3xl bg-[#22281F] p-6 border border-[#1a1a1a] shadow-[0_20px_40px_-15px_rgba(31,61,46,0.3)]">
      <div className="text-center mb-5">
        <p className="font-mono text-5xl text-[#FFFDF8] leading-none">9:41</p>
        <p className="text-sm text-[#E2D9C4] mt-1">Wednesday, July 29</p>
      </div>
      <div className="bg-[#FFFDF8]/95 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
        <GrowthRings count={6} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] text-[#A89A83] mb-0.5">
            <Bell size={10} />
            <span>Goal OS</span>
          </div>
          <p className="text-sm text-[#22281F] truncate">
            Next: Outline chapter 3
          </p>
          <p className="font-mono text-xs text-[#C08A3E]">12 day streak</p>
        </div>
      </div>
    </div>
  )
}

const ROWS = [
  {
    title: 'AI breaks your goal down for you',
    body: 'A vague ambition becomes a concrete path — Foundation, Build, Application. Each stage is small enough to actually start today.',
    visual: <GoalBreakdownMock />,
    flip: false,
  },
  {
    title: 'Every morning, one clear list',
    body: 'No infinite backlog. Goal OS sorts your day and quietly prioritizes the habit closest to slipping, so momentum compounds instead of scattering.',
    visual: <SmartListMock />,
    flip: true,
  },
  {
    title: 'Progress lives outside the app too',
    body: 'A lock screen widget, gentle notifications, and iMessage check-ins keep your goal in view where life actually happens — not buried in another app you forget to open.',
    visual: <LockScreenMock />,
    flip: false,
  },
]

export function FeatureRows() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div {...reveal} className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C08A3E]">
            Under the hood
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#1F3D2E] leading-tight text-balance">
            What it actually does
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {ROWS.map((row) => (
            <motion.div
              key={row.title}
              {...reveal}
              className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              <div className={row.flip ? 'md:order-2' : ''}>
                <h3 className="font-serif text-3xl text-[#1F3D2E] mb-4 leading-snug">
                  {row.title}
                </h3>
                <p className="text-[#696159] leading-relaxed text-lg">
                  {row.body}
                </p>
              </div>
              <div className={row.flip ? 'md:order-1' : ''}>{row.visual}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
