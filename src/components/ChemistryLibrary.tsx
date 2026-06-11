import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Youtube, Globe, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Language, ScienceCategory } from '../types';
import { translations } from '../data/translationData';
import { organicCategories, inorganicCategories } from '../data/chemistryData';
import MoleculesViewer from './MoleculesViewer';

interface ChemistryLibraryProps {
  currentLang: Language;
}

export default function ChemistryLibrary({ currentLang }: ChemistryLibraryProps) {
  // Nested sub-tab: 'organic' or 'inorganic'
  const [subTab, setSubTab] = useState<'organic' | 'inorganic'>('organic');
  
  // Selected category state
  const [selectedOrganicId, setSelectedOrganicId] = useState(organicCategories[0].id);
  const [selectedInorganicId, setSelectedInorganicId] = useState(inorganicCategories[0].id);

  const t = translations[currentLang];

  const activeCategories = subTab === 'organic' ? organicCategories : inorganicCategories;
  const activeSelectedId = subTab === 'organic' ? selectedOrganicId : selectedInorganicId;
  const activeCategory = activeCategories.find((cat) => cat.id === activeSelectedId) || activeCategories[0];

  const handleSelectId = (id: string) => {
    if (subTab === 'organic') {
      setSelectedOrganicId(id);
    } else {
      setSelectedInorganicId(id);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-4">
      
      {/* 1. Sleek Apple Pill Tab Switcher */}
      <div className="flex justify-center">
        <div className="relative flex p-1 bg-apple-gray-100 rounded-full border border-apple-gray-200">
          <button
            id="subtab-organic-btn"
            className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              subTab === 'organic' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setSubTab('organic')}
          >
            {subTab === 'organic' && (
              <motion.div
                layoutId="activeSubTabBg"
                className="absolute inset-0 bg-[#1D1D1F] rounded-full shadow-sm z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={14} />
              {t.tabOrganic}
            </span>
          </button>
          <button
            id="subtab-inorganic-btn"
            className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              subTab === 'inorganic' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setSubTab('inorganic')}
          >
            {subTab === 'inorganic' && (
              <motion.div
                layoutId="activeSubTabBg"
                className="absolute inset-0 bg-[#1D1D1F] rounded-full shadow-sm z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <BookOpen size={14} />
              {t.tabInorganic}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Responsive Multi-Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Side Navigation Cards */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-4 rounded-2xl bg-white border border-apple-gray-100 shadow-sm">
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              {subTab === 'organic' ? 'Carbon Groups' : 'Metal / Nonmetal Groups'}
            </h3>
            <div className="flex flex-col gap-1.5 max-h-[480px] overflow-y-auto pr-1">
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`substance-card-${cat.id}`}
                  onClick={() => handleSelectId(cat.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-300 border ${
                    activeSelectedId === cat.id
                      ? 'bg-white border-apple-blue shadow-md scale-[1.02] text-apple-blue font-medium'
                      : 'bg-transparent border-transparent text-gray-700 hover:bg-apple-gray-100 hover:text-black'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{cat.name[currentLang]}</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {cat.representativeMolecule.name}
                    </span>
                  </div>
                  <ArrowRight size={16} className={`transition-transform duration-300 ${activeSelectedId === cat.id ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Chemistry Card Portal */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSelectedId + '-' + currentLang}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="space-y-6"
            >
              {/* Card Meta Content Block */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-apple-gray-100 shadow-sm space-y-6">
                <div>
                  <h2 className="text-3xl font-display font-semibold tracking-tight text-gray-900 mb-2">
                    {activeCategory.name[currentLang]}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {activeCategory.description[currentLang]}
                  </p>
                </div>

                {/* 3D Model Visualizer Widget */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      {t.keyProperties}
                    </h3>
                    <ul className="space-y-2.5">
                      {activeCategory.keyProperties[currentLang].map((prop, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-apple-blue flex-shrink-0" />
                          <span>{prop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-5 flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase mb-2 tracking-wider flex items-center gap-1.5 self-start">
                      🧪 {t.molecularStructure}
                    </span>
                    <MoleculesViewer molecule={activeCategory.representativeMolecule} />
                  </div>
                </div>

                <div className="h-px bg-apple-gray-100" />

                {/* Web Integration Frames (Wikipedia iframe + YouTube visual experiment) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* YouTube Experiment Iframe */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                      <Youtube size={15} />
                      <span>{t.youtubeExperiment}</span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-apple-gray-100 aspect-video bg-black">
                      <iframe
                        id={`youtube-iframe-${activeCategory.id}`}
                        src={`https://www.youtube.com/embed/${activeCategory.youtubeVideoId}?autoplay=0&mute=1`}
                        title={`Iochem - Class Experiment Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 italic">
                      Visual experiment demonstration provided via embed link.
                    </div>
                  </div>

                  {/* Wikipedia Iframe */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
                      <Globe size={15} />
                      <span>{t.wikipediaLink}</span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-apple-gray-100 aspect-video bg-apple-gray-50 flex flex-col justify-between p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                          <span className="px-2 py-0.5 bg-gray-200 rounded-md font-mono">Wikipedia</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                          Read deep factual records regarding {activeCategory.name[currentLang]} including historical discovery, thermodynamic constraints, and industrial manufacturing routes.
                        </p>
                      </div>
                      <a
                        id={`wikipedia-anchor-${activeCategory.id}`}
                        href={activeCategory.wikipediaUrl[currentLang]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-apple-gray-100 text-xs font-medium text-gray-700 hover:bg-apple-gray-200 transition-colors border border-apple-gray-200"
                      >
                        {t.wikipediaLink}
                        <ArrowRight size={12} />
                      </a>
                    </div>
                    {/* Embedded interactive Wikipedia frame fallback toggle */}
                    <div className="text-[10px] text-gray-400">
                      Opens Wikipedia encyclopedia in a secure frame tab.
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
