'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Plus, Sun, Footprints } from 'lucide-react'
import { GrowthRings } from './growth-rings'

const STEPS = [
  {
    label: 'Create a goal',
    hint: 'What do you want to build?',
    icon: Plus,
  },
  {
    label: "See today's task",
    hint: 'One clear thing, chosen for you',
    icon: Sun,
  },
  {
    label: 'Do it in real life',
    hint: 'The work happens out there',
    icon: Footprints,
  },
  {
    label: 'Mark it done',
    hint: 'Come back and acknowledge it',
    icon: Check,
  },
] as const

export function TheLoop() {
  const [step, setStep] = useState(0)
  const [rings, setRings] = useState(5)
  const [streak, setStreak] = useState(11)
  const [paused, setPaused] = useState(false)
  const celebrated = useRef(false)

  // Auto-advance every 4.5s unless the visitor is hovering.
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), 4500)
    return () => clearTimeout(t)
  }, [step, paused])

  // Fire the calm celebration once when we reach "Mark it done".
  useEffect(() => {
    if (step === 3 && !celebrated.current) {
      celebrated.current = true
      setRings((r) => r + 1)
      setStreak((s) => s + 1)
    }
    if (step !== 3) celebrated.current = false
  }, [step])

  const done = step === 3
  const StepIcon = STEPS[step].icon

  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C08A3E]">
            The Loop
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#1F3D2E] leading-tight text-balance">
            The whole app is one honest loop
          </h2>
        </div>

        <div
          className="relative border border-[#E2D9C4] rounded-[28px] bg-[#FFFDF8] p-6 md:p-10 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Step rail */}
          <div className="flex items-center gap-1.5 md:gap-3 mb-10">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setStep(i)}
                className="group flex-1 text-left"
                aria-label={s.label}
              >
                <div className="h-1 rounded-full bg-[#E2D9C4] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1F3D2E] origin-left"
                    initial={false}
                    animate={{ scaleX: i <= step ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <span
                  className={`mt-2 hidden md:block text-xs transition-colors ${
                    i === step ? 'text-[#1F3D2E] font-medium' : 'text-[#A89A83]'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center min-h-[280px]">
            {/* Left: step label */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-[#1F3D2E]/8 flex items-center justify-center">
                      <StepIcon size={18} className="text-[#1F3D2E]" />
                    </div>
                    <span className="font-mono text-xs text-[#A89A83]">
                      {String(step + 1).padStart(2, '0')} / 04
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl text-[#1F3D2E] mb-2 leading-snug">
                    {STEPS[step].label}
                  </h3>
                  <p className="text-[#696159]">{STEPS[step].hint}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: living mock card */}
            <div className="relative flex items-center justify-center">
              {/* Rings behind the card */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
                <GrowthRings key={rings} count={rings} animated size={200} />
              </div>

              <motion.div
                layout
                className="relative z-10 w-full max-w-[280px] bg-[#F2ECDD] border border-[#E2D9C4] rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      backgroundColor: done ? '#1F3D2E' : 'rgba(0,0,0,0)',
                      borderColor: done ? '#1F3D2E' : '#C08A3E',
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0"
                  >
                    <AnimatePresence>
                      {done && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Check size={15} className="text-[#FFFDF8]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="min-w-0">
                    <motion.p
                      animate={{ opacity: done ? 0.55 : 1 }}
                      className={`text-sm text-[#22281F] truncate ${
                        done ? 'line-through' : ''
                      }`}
                    >
                      Outline chapter 3
                    </motion.p>
                    <p className="text-[11px] text-[#A89A83]">Write a novel</p>
                  </div>
                </div>

                {/* Streak line reveals on completion */}
                <AnimatePresence>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center justify-between border-t border-[#E2D9C4] pt-3"
                    >
                      <span className="text-[11px] text-[#696159]">
                        Streak
                      </span>
                      <motion.span
                        key={streak}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-mono text-sm text-[#C08A3E]"
                      >
                        {streak} days
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[#A89A83] italic font-serif">
            This is the only moment the app asks anything of you.
          </p>
        </div>
      </div>
    </section>
  )
}
