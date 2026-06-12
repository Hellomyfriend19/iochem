import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translationData';

interface HeroSectionProps {
  currentLang: Language;
}

export default function HeroSection({ currentLang }: HeroSectionProps) {
  const t = translations[currentLang];

  return (
    <div className="relative py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Block: Apple display typography titles */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 text-center md:text-left">


            <AnimatePresence mode="wait">
              <motion.h1
                key={currentLang + '-brand'}
                id="hero-title"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-7xl font-bebas tracking-wide text-gray-900 mt-2"
              >
                {t.brand}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentLang + '-tagline'}
                id="hero-tagline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg text-gray-500 font-sans leading-relaxed max-w-xl"
              >
                {t.tagline}
              </motion.p>
            </AnimatePresence>

            {/* Quick interactive stats pill decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start pt-2"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-apple-gray-100 text-xs font-medium text-gray-600 border border-apple-gray-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>118 Elements Online</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-apple-gray-100 text-xs font-medium text-gray-600 border border-apple-gray-200">
                <span className="w-2 h-2 rounded-full bg-apple-blue" />
                <span>Molecular Rotator Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Right Block: The custom chemical interactive reaction GIF, nested inside an Apple-style screen mock */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-3 w-full max-w-sm rounded-[32px] bg-white shadow-xl border border-apple-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Top notch glass reflection detail */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              
              <div className="relative rounded-[24px] bg-apple-gray-50 overflow-hidden border border-apple-gray-100 aspect-square flex items-center justify-center">
                <img
                  id="hero-animated-gif"
                  src="https://cdn.pixabay.com/animation/2025/05/11/22/44/22-44-22-451_512.gif"
                  alt="Iochem Chemical Science Rotation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Decorative Apple-style home indicator indicator bar */}
              <div className="w-24 h-1 bg-gray-200 mx-auto mt-3 rounded-full opacity-60" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
