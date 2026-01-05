"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0B0B0B] z-50 flex items-center justify-center overflow-hidden">
      {/* Curtain overlay effect */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#0B0B0B] transform origin-left"></div>
        <div className="w-1/2 h-full bg-[#0B0B0B] transform origin-right"></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo pulse */}
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-full border-2 border-[#C19B76]"
            style={{
              animation: "pulse 2s ease-in-out infinite",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#C19B76] text-2xl font-bold">◆</div>
        </div>

        {/* Loading text */}
        <p className="text-white text-sm font-light tracking-widest">BRICKSIO</p>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#333] relative overflow-hidden">
          <div
            className="h-full bg-[#C19B76] transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Progress text */}
        <p className="text-[#999] text-xs">{Math.floor(Math.min(progress, 100))}%</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
