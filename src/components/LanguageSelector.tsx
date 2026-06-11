import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Settings, Globe, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translationData';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isPortrait?: boolean;
}

export default function LanguageSelector({ currentLang, onLanguageChange, isPortrait }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];

  const t = translations[currentLang];

  return (
    <div className="flex items-center gap-4 relative z-50">
      {/* Inline Language Selector segment pill */}
      {!isPortrait && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F5F5F7] rounded-xl text-xs font-medium border border-[#E5E5EA] shadow-xs">
          <button
            id="lang-toggle-en"
            onClick={() => onLanguageChange('en')}
            className={`cursor-pointer transition-all duration-200 font-semibold uppercase ${
              currentLang === 'en'
                ? 'text-[#0071E3] font-bold scale-105'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            EN
          </button>
          <span className="text-[#E5E5EA] font-light">|</span>
          <button
            id="lang-toggle-ka"
            onClick={() => onLanguageChange('ka')}
            className={`cursor-pointer transition-all duration-200 font-semibold uppercase ${
              currentLang === 'ka'
                ? 'text-[#0071E3] font-bold scale-105'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            KA
          </button>
          <span className="text-[#E5E5EA] font-light">|</span>
          <button
            id="lang-toggle-ru"
            onClick={() => onLanguageChange('ru')}
            className={`cursor-pointer transition-all duration-200 font-semibold uppercase ${
              currentLang === 'ru'
                ? 'text-[#0071E3] font-bold scale-105'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            RU
          </button>
        </div>
      )}

      {/* Settings gear trigger icon */}
      <div className="relative">
        <motion.button
          id="settings-gear-btn"
          className="flex items-center justify-center p-2 rounded-full hover:bg-[#F5F5F7] transition-all text-[#86868B] hover:text-[#1D1D1F] focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 60 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          title={t.settings}
        >
          <Settings size={18} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Click outside backdrop overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

              {/* Apple-style floating popover drawer */}
              <motion.div
                id="settings-dropdown"
                className="absolute right-0 mt-3 w-56 rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg border border-[#E5E5EA] p-2.5 z-50 overflow-hidden"
                initial={{ opacity: 0, scale: 0.93, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -5 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              >
                <div className="px-3 py-1.5 text-xs font-bold text-[#86868B] tracking-wider uppercase flex items-center gap-1.5">
                  <Globe size={11} />
                  <span>{t.language}</span>
                </div>
                <div className="h-px bg-[#E5E5EA] my-1.5" />
                <div className="flex flex-col gap-1">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      id={`lang-btn-${lng.code}`}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        currentLang === lng.code
                          ? 'bg-[#0071E3] text-white shadow-xs'
                          : 'text-[#424245] hover:bg-[#F5F5F7]'
                      }`}
                      onClick={() => {
                        onLanguageChange(lng.code);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lng.flag}</span>
                        <span>{lng.label}</span>
                      </div>
                      {currentLang === lng.code && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
