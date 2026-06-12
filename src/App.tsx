import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Library, PlayCircle, Settings, Beaker, HelpCircle } from 'lucide-react';
import { Language } from './types';
import { translations } from './data/translationData';

// Custom component imports
import LanguageSelector from './components/LanguageSelector';
import HeroSection from './components/HeroSection';
import ChemistryLibrary from './components/ChemistryLibrary';
import PeriodicTableWithSandbox from './components/PeriodicTableWithSandbox';
import EquationCompleter from './components/EquationCompleter';
import SubstanceCharacteristics from './components/SubstanceCharacteristics';
import FormulaCreator from './components/FormulaCreator';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<'library' | 'playground'>('library');
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Playground sub-tabs state
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'table' | 'completer' | 'characteristics' | 'creator'>('table');

  const t = translations[currentLang];

  // Playground sub-tab options
  const playgroundSubTabs = [
    { id: 'table', label: { en: 'Periodic Table & Physics', ka: 'პერიოდული სისტემა', ru: 'Панель элементов' } },
    { id: 'completer', label: { en: 'Equation Balancer', ka: 'განტოლების ბალანსი', ru: 'Баланс уравнений' } },
    { id: 'characteristics', label: { en: 'Reaction Guides', ka: 'რეაქციის მახასიათებლები', ru: 'Свойства реакций' } },
    { id: 'creator', label: { en: 'Formula Builder', ka: 'ფორმულების მშენებელი', ru: 'Сборщик формул' } }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] selection:bg-[#0071E3]/10 flex flex-col justify-between">
      
      {/* 1. Frosted Glass Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E5E5EA] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          {!isPortrait && (
            <div className="flex items-center gap-2.5">
              <img 
                src="https://github.com/Hellomyfriend19/iochem/blob/main/New%20Project-5.png?raw=true" 
                alt="Iochem Logo"
                className="w-8 h-8 rounded-lg object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="font-bebas text-2xl tracking-wider text-[#1D1D1F] mt-1">
                Iochem
              </span>
            </div>
          )}

          {/* Center Apple-style Section Switchers Tab */}
          <nav className="flex bg-[#F5F5F7] p-1 rounded-full border border-[#E5E5EA]">
            <button
              id="nav-library-btn"
              onClick={() => setActiveSection('library')}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                activeSection === 'library'
                  ? 'text-[#0071E3]'
                  : 'text-[#424245] hover:text-[#1D1D1F]'
              }`}
            >
              {activeSection === 'library' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white rounded-full shadow-xs z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Library size={13} />
                {t.sectionInformational}
              </span>
            </button>

            <button
              id="nav-playground-btn"
              onClick={() => setActiveSection('playground')}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                activeSection === 'playground'
                  ? 'text-[#0071E3]'
                  : 'text-[#424245] hover:text-[#1D1D1F]'
              }`}
            >
              {activeSection === 'playground' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white rounded-full shadow-xs z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <PlayCircle size={13} />
                {t.sectionPlayground}
              </span>
            </button>
          </nav>

          {/* Right settings switcher gear */}
          <LanguageSelector
            currentLang={currentLang}
            onLanguageChange={(lang) => setCurrentLang(lang)}
            isPortrait={isPortrait}
          />

        </div>
      </header>

      {/* 2. Core App Body */}
      <main className="flex-1">
        
        {/* Landing Hero banner shows at the top of Library main landing screen */}
        {activeSection === 'library' && (
          <HeroSection currentLang={currentLang} />
        )}

        <AnimatePresence mode="wait">
          {activeSection === 'library' ? (
            <motion.div
              key="library-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pb-20"
            >
              {/* Chemistry interactive substances library */}
              <ChemistryLibrary currentLang={currentLang} />
            </motion.div>
          ) : (
            <motion.div
              key="playground-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-[#FAFAFA]"
            >
              {/* Left Toolbar Sidebar */}
              <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#E5E5EA] p-4 gap-2 shrink-0">
                <div className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider mb-2 px-1">
                  {currentLang === 'ka' ? 'ინსტრუმენტები' : currentLang === 'ru' ? 'Инструменты' : 'Playground Tools'}
                </div>
                
                <div className="space-y-1.5 relative">
                  {playgroundSubTabs.map((pTab) => {
                    const isActive = activePlaygroundTab === pTab.id;
                    return (
                      <button
                        key={pTab.id}
                        id={`sidebar-subtab-btn-${pTab.id}`}
                        onClick={() => setActivePlaygroundTab(pTab.id as any)}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold w-full text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'text-[#0071E3] font-bold'
                            : 'text-[#424245] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeSubTabDesktop"
                            className="absolute inset-0 bg-[#F2F8FF] rounded-xl shadow-xs z-0"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          />
                        )}
                        <div
                          className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all ${
                            isActive ? 'bg-[#0071E3] scale-125' : 'border border-[#424245]'
                          }`}
                        />
                        <span className="relative z-10">{pTab.label[currentLang]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Aesthetic Tip of the day card */}
                <div className="mt-auto p-4 bg-gradient-to-br from-[#0071E3] to-[#00AEEF] rounded-2xl text-white shadow-xs">
                  <div className="text-[9px] uppercase font-bold tracking-wider opacity-85 mb-1.5">
                    {currentLang === 'ka' ? 'დღის რჩევა' : currentLang === 'ru' ? 'Совет дня' : 'Tip of the day'}
                  </div>
                  <div className="text-xs font-medium leading-relaxed font-sans">
                    {currentLang === 'ka' 
                      ? 'ტუტე ლითონები ფეთქდება წყალთან (H₂O) შეხებისას. გამოსცადეთ ლაბორატორიაში!'
                      : currentLang === 'ru' 
                        ? 'Щелочные металлы взрываются при контакте с H₂O. Попробуйте в песочнице!'
                        : 'Alkali metals explode in contact with H₂O. Try it in the sandbox!'}
                  </div>
                </div>
              </aside>

              {/* Central Workspace area */}
              <div className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden pb-12">
                {/* On mobile: display a responsive horizontal pill row inside Playground header */}
                <div className="md:hidden flex flex-col gap-3 pb-2">
                  <div className="max-w-md mx-auto text-center space-y-2">
                    <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-[#0071E3] uppercase bg-blue-50 border border-blue-100 rounded-full">
                       Chemical Suite
                    </span>
                    <h2 className="text-2xl font-display font-semibold tracking-tight text-gray-900">
                      {currentLang === 'ka' ? 'ინტერაქტიული ლაბორატორია' : currentLang === 'ru' ? 'Виртуальная лаборатория' : 'Interactive Lab'}
                    </h2>
                  </div>
                  <div className="flex overflow-x-auto gap-1 bg-[#F5F5F7] py-1 px-1.5 rounded-2xl border border-[#E5E5EA] shadow-xs max-w-lg mx-auto no-scrollbar scrollbar-none">
                    {playgroundSubTabs.map((pTab) => (
                      <button
                        key={pTab.id}
                        id={`playground-subtab-btn-${pTab.id}`}
                        onClick={() => setActivePlaygroundTab(pTab.id as any)}
                        className={`relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          activePlaygroundTab === pTab.id
                            ? 'text-[#0071E3] font-bold'
                            : 'text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {activePlaygroundTab === pTab.id && (
                          <motion.div
                            layoutId="activeSubTabMobile"
                            className="absolute inset-0 bg-white rounded-xl shadow-xs z-0"
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{pTab.label[currentLang]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtle header for desktop viewport */}
                <div className="hidden md:block pb-1">
                  <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-[#0071E3] uppercase bg-blue-50 border border-blue-100 rounded-full">
                     Chemical Engineering Suite
                  </span>
                  <h2 className="text-2xl font-display font-semibold tracking-tight text-[#1D1D1F] mt-2 block">
                    {playgroundSubTabs.find(t => t.id === activePlaygroundTab)?.label[currentLang]}
                  </h2>
                </div>

                {/* Sub-tools render viewport container */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {activePlaygroundTab === 'table' && (
                      <motion.div
                        key="playground-sub-table"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <PeriodicTableWithSandbox currentLang={currentLang} />
                      </motion.div>
                    )}

                    {activePlaygroundTab === 'completer' && (
                      <motion.div
                        key="playground-sub-completer"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <EquationCompleter currentLang={currentLang} />
                      </motion.div>
                    )}

                    {activePlaygroundTab === 'characteristics' && (
                      <motion.div
                        key="playground-sub-characteristics"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <SubstanceCharacteristics currentLang={currentLang} />
                      </motion.div>
                    )}

                    {activePlaygroundTab === 'creator' && (
                      <motion.div
                        key="playground-sub-creator"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FormulaCreator currentLang={currentLang} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 3. Apple Simple minimalist footer */}
      <footer className="w-full bg-white border-t border-[#E5E5EA] py-6 text-center text-xs text-gray-400 font-mono mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span> {t.brand} Chemistry Engineering Platform • Copyright © 2026. All rights preserved.</span>
        </div>
      </footer>

    </div>
  );
}
