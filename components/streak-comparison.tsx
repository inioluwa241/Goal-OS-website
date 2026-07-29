'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GrowthRings } from './growth-rings'
import { Unlink } from 'lucide-react'

export function StreakComparison() {
  const [isGoalOS, setIsGoalOS] = useState(true)

  return (
    <section className="py-24 md:py-32 px-4 bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C08A3E]">
            Resilience over perfection
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#1F3D2E] leading-tight text-balance">
            Not another streak app
          </h2>
          <p className="mt-4 text-[#696159] text-lg">
            You missed a day. Here&apos;s the difference in what happens next.
          </p>
        </div>

        {/* Segmented toggle */}
        <div className="inline-flex p-1 rounded-2xl bg-[#F2ECDD] border border-[#E2D9C4] mb-8">
          <button
            onClick={() => setIsGoalOS(false)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              !isGoalOS ? 'text-[#FFFDF8]' : 'text-[#696159]'
            }`}
          >
            {!isGoalOS && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-xl bg-[#B4633E]"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">Typical habit app</span>
          </button>
          <button
            onClick={() => setIsGoalOS(true)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isGoalOS ? 'text-[#FFFDF8]' : 'text-[#696159]'
            }`}
          >
            {isGoalOS && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-xl bg-[#1F3D2E]"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">Goal OS</span>
          </button>
        </div>

        {/* Card */}
        <motion.div
          layout
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] border border-[#E2D9C4] bg-[#F2ECDD] p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {!isGoalOS ? (
              <motion.div
                key="typical"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-24 h-24 rounded-2xl bg-[#B4633E]/12 flex items-center justify-center flex-shrink-0">
                  <Unlink size={40} className="text-[#B4633E]" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-serif text-2xl text-[#B4633E] mb-1">
                    Streak broken.
                  </p>
                  <p className="font-mono text-5xl font-medium text-[#22281F] mb-3">
                    0 days
                  </p>
                  <p className="text-sm text-[#696159] max-w-sm">
                    Start over. Everything resets. The momentum you spent weeks
                    building is gone — punished for being human once.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="goalos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-shrink-0">
                  <GrowthRings count={7} animated size={112} />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-mono text-3xl text-[#1F3D2E] mb-1">
                    12 days
                  </p>
                  <p className="font-serif text-2xl text-[#3F6B4F] mb-3">
                    completed this month. Let&apos;s get back to it.
                  </p>
                  <p className="text-sm text-[#696159] max-w-sm">
                    One missed day doesn&apos;t erase progress. The rings you grew
                    are still here. You&apos;re still building.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
