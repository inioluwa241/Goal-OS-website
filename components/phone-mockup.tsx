'use client'

import { motion } from 'framer-motion'
import { GrowthRings } from './growth-rings'
import { Signal, Wifi, BatteryFull } from 'lucide-react'

const TASKS = [
  { text: 'Outline chapter 3', streak: '12', done: false },
  { text: 'Morning walk', streak: '8', done: true },
  { text: 'Read 20 pages', streak: '31', done: false },
]

export function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-[320px]"
    >
      {/* Phone frame */}
      <div className="rounded-[44px] bg-[#22281F] p-3 shadow-[0_30px_60px_-15px_rgba(31,61,46,0.35)]">
        <div className="relative rounded-[34px] bg-[#F2ECDD] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#22281F] rounded-full z-20" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[#22281F]">
            <span className="font-mono text-xs font-medium">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal size={13} />
              <Wifi size={13} />
              <BatteryFull size={15} />
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-6 pt-2 space-y-5">
            {/* Header */}
            <div>
              <p className="font-mono text-[11px] text-[#A89A83] uppercase tracking-wider">
                Wednesday, Jul 29
              </p>
              <h4 className="font-serif text-2xl text-[#1F3D2E] leading-tight">
                Good morning, Alex
              </h4>
            </div>

            {/* Today */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-[#696159] uppercase tracking-wider">
                Today
              </p>
              {TASKS.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#FFFDF8] p-3 rounded-2xl border border-[#E2D9C4]"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                      task.done
                        ? 'bg-[#1F3D2E]'
                        : 'border-2 border-[#C08A3E]'
                    }`}
                  >
                    {task.done && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6.5L4.8 8.8L9.5 3.5"
                          stroke="#FFFDF8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`flex-1 text-sm text-[#22281F] truncate ${
                      task.done ? 'line-through opacity-50' : ''
                    }`}
                  >
                    {task.text}
                  </p>
                  <span className="font-mono text-xs text-[#C08A3E] flex-shrink-0">
                    {task.streak}d
                  </span>
                </div>
              ))}
            </div>

            {/* Momentum */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-[#696159] uppercase tracking-wider">
                Momentum
              </p>
              <div className="flex items-center gap-4 bg-[#1F3D2E] p-4 rounded-2xl">
                <GrowthRings count={6} size={56} />
                <div>
                  <p className="font-mono text-2xl text-[#FFFDF8] leading-none">
                    12
                  </p>
                  <p className="text-xs text-[#E2D9C4] mt-1">day streak</p>
                </div>
              </div>
            </div>

            {/* Companion line */}
            <p className="text-center text-sm italic text-[#696159] font-serif px-2">
              You&apos;re building something worth building.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
