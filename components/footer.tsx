'use client'

import { GrowthRings } from './growth-rings'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F2ECDD] border-t border-[#E2D9C4] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Logo and branding */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <GrowthRings count={4} size="sm" />
            </div>
            <div>
              <p className="font-serif text-[#1F3D2E] font-semibold">
                Goal OS
              </p>
              <p className="text-xs text-[#696159]">
                Build better systems
              </p>
            </div>
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-[#A89A83]">
            © {currentYear} Goal OS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
