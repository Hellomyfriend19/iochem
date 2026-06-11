import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Sparkles, RefreshCw, Layers, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translationData';

interface FormulaCreatorProps {
  currentLang: Language;
}

export default function FormulaCreator({ currentLang }: FormulaCreatorProps) {
  // Mode switcher: 'oxide' | 'salt' | 'base'
  const [mode, setMode] = useState<'oxide' | 'salt' | 'base'>('oxide');

  // Interactive drop-down states
  const [selectedElement, setSelectedElement] = useState('Al');
  const [selectedMetal, setSelectedMetal] = useState('Na');
  const [selectedRadical, setSelectedRadical] = useState('SO4');

  // Animation visual states
  const [formulaResult, setFormulaResult] = useState('');
  const [displayFormula, setDisplayFormula] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [solubilityInfo, setSolubilityInfo] = useState<{ label: string; soluble: boolean } | null>(null);

  const t = translations[currentLang];

  // Raw Elements Valencies Catalog for Formula Creator
  const valencyMap: Record<string, number> = {
    'H': 1, 'Na': 1, 'K': 1, 'Li': 1, 'Ca': 2, 'Mg': 2, 'Al': 3,
    'Si': 4, 'P': 5, 'S': 6, 'Fe': 3, 'Cu': 2, 'Zn': 2, 'Cl': 1, 'NO3': 1, 'SO4': 2, 'PO4': 3, 'CO3': 2
  };

  const metalsForHydroxides: Record<string, { valency: number; soluble: boolean }> = {
    'Li': { valency: 1, soluble: true },
    'Na': { valency: 1, soluble: true },
    'K': { valency: 1, soluble: true },
    'Ca': { valency: 2, soluble: true }, // moderately soluble (slaked lime)
    'Mg': { valency: 2, soluble: false },
    'Al': { valency: 3, soluble: false },
    'Fe': { valency: 3, soluble: false },
    'Cu': { valency: 2, soluble: false },
    'Zn': { valency: 2, soluble: false }
  };

  const radicalsForSalts: Record<string, { symbol: string; valency: number; fancyName: string }> = {
    'Cl': { symbol: 'Cl', valency: 1, fancyName: 'Chloride' },
    'SO4': { symbol: 'SO4', valency: 2, fancyName: 'Sulfate' },
    'NO3': { symbol: 'NO3', valency: 1, fancyName: 'Nitrate' },
    'PO4': { symbol: 'PO4', valency: 3, fancyName: 'Phosphate' },
    'CO3': { symbol: 'CO3', valency: 2, fancyName: 'Carbonate' }
  };

  // Convert raw numbers to real subscripts string e.g. "Al2(SO4)3" -> "Al₂(SO₄)₃"
  const makeSubscriptString = (input: string) => {
    return input.split('').map((char) => {
      const map: Record<string, string> = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
      };
      return map[char] || char;
    }).join('');
  };

  // Formulas synthesis calculations
  const calculateFormula = () => {
    let finalFormula = '';
    let solubleFlag = false;
    let isHydroxide = false;

    if (mode === 'oxide') {
      const v1 = valencyMap[selectedElement] || 2;
      const v2 = 2; // Oxygen valency is always 2

      // LCM math
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const lcm = (v1 * v2) / gcd(v1, v2);

      const c1 = lcm / v1;
      const c2 = lcm / v2;

      const sub1 = c1 === 1 ? '' : String(c1);
      const sub2 = c2 === 1 ? '' : String(c2);

      finalFormula = `${selectedElement}${sub1}O${sub2}`;
    } 
    else if (mode === 'base') {
      isHydroxide = true;
      const metalInfo = metalsForHydroxides[selectedMetal] || { valency: 2, soluble: false };
      const v1 = metalInfo.valency;
      solubleFlag = metalInfo.soluble;

      // Hydroxide is Me(OH)_v1
      if (v1 === 1) {
        finalFormula = `${selectedMetal}OH`;
      } else {
        finalFormula = `${selectedMetal}(OH)${v1}`;
      }
    } 
    else if (mode === 'salt') {
      const metalInfo = metalsForHydroxides[selectedMetal] || { valency: 2, soluble: false };
      const radicalInfo = radicalsForSalts[selectedRadical] || { symbol: 'SO4', valency: 2 };

      const v1 = metalInfo.valency;
      const v2 = radicalInfo.valency;

      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const lcm = (v1 * v2) / gcd(v1, v2);

      const c1 = lcm / v1;
      const c2 = lcm / v2;

      const prefix = c1 === 1 ? '' : String(c1);
      
      let radicalPart = radicalInfo.symbol;
      if (c2 > 1) {
        // wrap multi-atom group in parentheses
        if (radicalInfo.symbol.length > 2) {
          radicalPart = `(${radicalInfo.symbol})${c2}`;
        } else {
          radicalPart = `${radicalInfo.symbol}${c2}`;
        }
      }

      finalFormula = `${selectedMetal}${prefix}${radicalPart}`;
    }

    // Set results and start character-by-character timed builder simulation
    const styledFormula = makeSubscriptString(finalFormula);
    setFormulaResult(styledFormula);
    setDisplayFormula('');
    setIsAnimating(true);

    if (isHydroxide) {
      setSolubilityInfo({
        label: solubleFlag ? t.soluble : t.insoluble,
        soluble: solubleFlag
      });
    } else {
      setSolubilityInfo(null);
    }
  };

  // Perform character-by-character continuous typewriter lock animation
  useEffect(() => {
    if (!isAnimating || !formulaResult) return;

    let charIdx = 0;
    setDisplayFormula('');

    const interval = setInterval(() => {
      if (charIdx < formulaResult.length) {
        setDisplayFormula((prev) => prev + formulaResult[charIdx]);
        charIdx++;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [formulaResult, isAnimating]);

  // Recalculate whenever inputs adapt
  useEffect(() => {
    calculateFormula();
  }, [mode, selectedElement, selectedMetal, selectedRadical]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-4">
      {/* Sleek sub-tool toggle bar */}
      <div className="flex justify-center">
        <div className="flex p-1 bg-apple-gray-100 rounded-full border border-apple-gray-200 shadow-sm">
          <button
            id="formula-mode-oxide"
            onClick={() => setMode('oxide')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              mode === 'oxide' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {t.oxideCreator}
          </button>
          <button
            id="formula-mode-salt"
            onClick={() => setMode('salt')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              mode === 'salt' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {t.saltCreator}
          </button>
          <button
            id="formula-mode-base"
            onClick={() => setMode('base')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
              mode === 'base' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {t.baseCreator}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Input Selection Panels */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-white border border-apple-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Layers size={14} className="text-apple-blue" />
              Configure Inputs
            </h4>

            {mode === 'oxide' && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">{t.elementLabel}</label>
                <select
                  id="select-oxide-element"
                  value={selectedElement}
                  onChange={(e) => setSelectedElement(e.target.value)}
                  className="w-full p-3 bg-apple-gray-50 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue/20 outline-none text-sm font-semibold text-gray-800"
                >
                  {Object.keys(valencyMap).filter(k => k !== 'SO4' && k !== 'PO4' && k !== 'CO3' && k !== 'NO3' && k !== 'Cl').map((k) => (
                    <option key={k} value={k}>
                      {k} ({currentLang === 'ka' ? 'ვალენტობა' : 'Valency'}: {valencyMap[k]})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'base' && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">{t.metalLabel}</label>
                <select
                  id="select-base-metal"
                  value={selectedMetal}
                  onChange={(e) => setSelectedMetal(e.target.value)}
                  className="w-full p-3 bg-apple-gray-50 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue/20 outline-none text-sm font-semibold text-gray-800"
                >
                  {Object.keys(metalsForHydroxides).map((m) => (
                    <option key={m} value={m}>
                      {m} (Valency: {metalsForHydroxides[m].valency})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'salt' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">{t.metalLabel}</label>
                  <select
                    id="select-salt-metal"
                    value={selectedMetal}
                    onChange={(e) => setSelectedMetal(e.target.value)}
                    className="w-full p-3 bg-apple-gray-50 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue/20 outline-none text-sm font-semibold text-gray-800"
                  >
                    {Object.keys(metalsForHydroxides).map((m) => (
                      <option key={m} value={m}>
                        {m} (Valency: {metalsForHydroxides[m].valency})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">{t.radicalLabel}</label>
                  <select
                    id="select-salt-radical"
                    value={selectedRadical}
                    onChange={(e) => setSelectedRadical(e.target.value)}
                    className="w-full p-3 bg-apple-gray-50 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue/20 outline-none text-sm font-semibold text-gray-800"
                  >
                    {Object.entries(radicalsForSalts).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.symbol}⁻ ({val.fancyName} • Valency: {val.valency})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Trigger synthesis manual reset if needed */}
          <button
            id="formula-synthesize-btn"
            onClick={calculateFormula}
            className="w-full mt-4 py-3 bg-[#1D1D1F] hover:bg-black text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} className={isAnimating ? 'animate-spin' : ''} />
            {t.calculateFormula}
          </button>
        </div>

        {/* Right Column: Visual Formula Generation Block */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-apple-gray-100 border border-apple-gray-200 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-apple-blue uppercase tracking-wider flex items-center gap-1.5 matches">
              <Sparkles size={12} />
              {t.generatedFormula}
            </span>
            <p className="text-xs text-gray-400">
              Generated in physical real-time lock with chemical constant ratios constraints.
            </p>
          </div>

          {/* Formula locked focus board */}
          <div className="relative flex-1 min-h-[140px] rounded-2xl bg-white border border-apple-gray-200 shadow-inner flex items-center justify-center">
            
            {/* Glossy radial blur highlight */}
            <div className="absolute w-24 h-24 rounded-full bg-apple-blue/10 blur-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={displayFormula}
                initial={{ scale: 0.94, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-mono font-bold text-gray-900 tracking-wider select-text"
              >
                {displayFormula || '...'}
                {isAnimating && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="inline-block w-4 h-1.5 bg-apple-blue ml-1 align-baseline rounded-full"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Secondary metadata labels (Solubility info) */}
          <AnimatePresence>
            {solubilityInfo && (
              <motion.div
                id="solubility-output-alert"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
                  solubilityInfo.soluble
                    ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
                    : 'bg-amber-50/50 border-amber-100 text-amber-800'
                }`}
              >
                {solubilityInfo.soluble ? (
                  <CheckCircle size={15} className="text-emerald-500" />
                ) : (
                  <ShieldAlert size={15} className="text-amber-500" />
                )}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t.solubilityLabel}</span>
                  <span className="font-semibold">{solubilityInfo.label}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
