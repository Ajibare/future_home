"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/constants";

export function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Background - Light Mode Default */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #f8fffe 0%, #f0fdfd 25%, #e6fafa 50%, #ffffff 75%, #f0fdfd 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Blueprint Grid */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(12,123,123,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(12,123,123,1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(12,123,123,0.12) 0%, transparent 60%)",
                top: "20%",
                left: "15%",
              }}
              animate={{ x: [0, 40, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(20,184,184,0.1) 0%, transparent 60%)",
                bottom: "15%",
                right: "15%",
              }}
              animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* House Construction SVG */}
            <div className="relative w-52 h-52 mb-6">
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(12,123,123,0.08) 0%, transparent 70%)",
                  filter: "blur(15px)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="bp-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0C7B7B" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#0C7B7B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0C7B7B" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="glass-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0C7B7B" />
                    <stop offset="50%" stopColor="#14b8b8" />
                    <stop offset="100%" stopColor="#0d9494" />
                  </linearGradient>
                  <linearGradient id="fill-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(12,123,123,0.1)" />
                    <stop offset="100%" stopColor="rgba(20,184,184,0.05)" />
                  </linearGradient>
                  <linearGradient id="roof-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(12,123,123,0.15)" />
                    <stop offset="100%" stopColor="rgba(17,99,99,0.08)" />
                  </linearGradient>
                  <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0C7B7B" stopOpacity="0" />
                    <stop offset="50%" stopColor="#14b8b8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0C7B7B" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="soft-glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Phase 1: Blueprint grid lines (0-1s) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0.2] }}
                  transition={{ duration: 1, times: [0, 0.7, 1] }}
                >
                  {/* Horizontal grid lines */}
                  {[140, 150, 160, 170].map((y, i) => (
                    <motion.line
                      key={`h-${i}`}
                      x1="50" y1={y} x2="150" y2={y}
                      stroke="url(#bp-line)"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                    />
                  ))}
                  {/* Vertical grid lines */}
                  {[70, 90, 110, 130].map((x, i) => (
                    <motion.line
                      key={`v-${i}`}
                      x1={x} y1="50" x2={x} y2="150"
                      stroke="url(#bp-line)"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                    />
                  ))}
                </motion.g>

                {/* Phase 2: Foundation drawing (0.5-1.5s) */}
                <motion.rect
                  x="55" y="130" width="90" height="6" rx="1"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1.5"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                {/* Foundation inner line */}
                <motion.line
                  x1="60" y1="133" x2="140" y2="133"
                  stroke="url(#glow-gradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />

                {/* Phase 3: Pillars (1-2s) */}
                {/* Left pillar */}
                <motion.rect
                  x="62" y="85" width="5" height="45"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{ transformOrigin: "bottom" }}
                />
                {/* Right pillar */}
                <motion.rect
                  x="133" y="85" width="5" height="45"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{ transformOrigin: "bottom" }}
                />
                {/* Center pillar */}
                <motion.rect
                  x="97" y="90" width="6" height="40"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Phase 4: Walls rising (1.5-2.5s) */}
                <motion.rect
                  x="67" y="90" width="66" height="40"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1.2"
                  fill="url(#fill-teal)"
                  filter="url(#soft-glow)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.5 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Phase 5: Windows (2-2.8s) */}
                {/* Left window */}
                <motion.rect
                  x="73" y="97" width="14" height="14" rx="2"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="rgba(255,255,255,0.6)"
                  filter="url(#glow)"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2 }}
                  style={{ transformOrigin: "center" }}
                />
                {/* Left window cross */}
                <motion.line x1="80" y1="97" x2="80" y2="111" stroke="rgba(12,123,123,0.4)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 2.3 }} />
                <motion.line x1="73" y1="104" x2="87" y2="104" stroke="rgba(12,123,123,0.4)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 2.3 }} />

                {/* Right window */}
                <motion.rect
                  x="111" y="97" width="14" height="14" rx="2"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="rgba(255,255,255,0.6)"
                  filter="url(#glow)"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2 }}
                  style={{ transformOrigin: "center" }}
                />
                {/* Right window cross */}
                <motion.line x1="118" y1="97" x2="118" y2="111" stroke="rgba(12,123,123,0.4)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 2.3 }} />
                <motion.line x1="111" y1="104" x2="125" y2="104" stroke="rgba(12,123,123,0.4)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 2.3 }} />

                {/* Phase 6: Door (2.2-2.8s) */}
                <motion.rect
                  x="92" y="108" width="16" height="22" rx="2"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1.2"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  style={{ transformOrigin: "bottom" }}
                />
                {/* Door handle */}
                <motion.circle
                  cx="104" cy="119" r="1.5"
                  fill="#0C7B7B"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7 }}
                />

                {/* Phase 7: Roof assembly (2.5-3.5s) */}
                <motion.path
                  d="M100 55 L60 85 L140 85 Z"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1.5"
                  fill="url(#roof-fill)"
                  filter="url(#soft-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                />
                {/* Roof inner line */}
                <motion.path
                  d="M100 60 L65 85 L135 85 Z"
                  stroke="rgba(12,123,123,0.2)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3 }}
                />

                {/* Phase 8: Chimney (2.8-3.3s) */}
                <motion.rect
                  x="120" y="60" width="6" height="18"
                  stroke="url(#glass-stroke)"
                  strokeWidth="1"
                  fill="url(#fill-teal)"
                  filter="url(#glow)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 2.8 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Smoke particles */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`smoke-${i}`}
                    cx={123 + i}
                    cy={55 - i * 3}
                    r={3 - i * 0.5}
                    fill="rgba(12,123,123,0.2)"
                    animate={{
                      y: [0, -8 - i * 4, -18 - i * 5],
                      opacity: [0.4, 0.2, 0],
                      scale: [1, 1.5 + i * 0.3, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 3.3 + i * 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Phase 9: Glass outline glow (3.5-4.2s) */}
                <motion.rect
                  x="55" y="80" width="90" height="55"
                  rx="3"
                  stroke="url(#glow-gradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#soft-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 0.7, delay: 3.5 }}
                />

                {/* Phase 10: Final house fill glow (4-4.5s) */}
                <motion.rect
                  x="58" y="83" width="84" height="49"
                  rx="2"
                  fill="url(#fill-teal)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 4 }}
                />

                {/* Decorative corner accents */}
                {[[55, 130], [145, 130], [55, 85], [145, 85]].map(([x, y], i) => (
                  <motion.circle
                    key={`corner-${i}`}
                    cx={x} cy={y} r="2"
                    fill="#0C7B7B"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 0.3, delay: 3.8 + i * 0.1 }}
                  />
                ))}
              </svg>
            </div>

             {/* Brand Logo Reveal */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.img
                src={ASSETS.logo}
                alt="Future Home Properties"
                className="h-16 mx-auto mb-3 object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              />
              <motion.h1
                className="font-display text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #0C7B7B 0%, #14b8b8 50%, #0d9494 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Future Home
              </motion.h1>
              <motion.p
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "rgba(12,123,123,0.5)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Premium Real Estate
              </motion.p>
            </motion.div>

            {/* Elegant progress indicator */}
            <motion.div
              className="relative w-48 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(12,123,123,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #0C7B7B, #14b8b8, #0C7B7B, transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating particles - deterministic values to avoid hydration mismatch */}
            {[
              { w: 5, h: 4, l: 15, t: 20, o: 0.25, d: 0.2 },
              { w: 7, h: 6, l: 75, t: 15, o: 0.35, d: 0.5 },
              { w: 4, h: 5, l: 45, t: 70, o: 0.22, d: 0.8 },
              { w: 6, h: 3, l: 80, t: 45, o: 0.40, d: 1.1 },
              { w: 3, h: 6, l: 25, t: 55, o: 0.28, d: 1.4 },
              { w: 8, h: 5, l: 60, t: 80, o: 0.32, d: 1.7 },
              { w: 5, h: 7, l: 35, t: 30, o: 0.38, d: 2.0 },
              { w: 4, h: 4, l: 70, t: 65, o: 0.24, d: 2.3 },
              { w: 6, h: 6, l: 50, t: 10, o: 0.30, d: 2.6 },
              { w: 3, h: 5, l: 90, t: 35, o: 0.36, d: 2.9 },
              { w: 7, h: 4, l: 10, t: 85, o: 0.26, d: 3.2 },
              { w: 5, h: 6, l: 55, t: 50, o: 0.34, d: 3.5 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.w,
                  height: p.h,
                  left: `${p.l}%`,
                  top: `${p.t}%`,
                  background: `radial-gradient(circle, rgba(12,123,123,${p.o}), transparent)`,
                  boxShadow: `0 0 ${p.w + 2}px rgba(12,123,123,${p.o - 0.1})`,
                }}
                animate={{
                  y: [0, -(20 + p.w * 3), 0],
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + p.d,
                  repeat: Infinity,
                  delay: p.d,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}