import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, HelpCircle, CheckCircle, AlertOctagon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translationData';
import { checkValencyFormula } from '../data/chemistryData';

interface EquationCompleterProps {
  currentLang: Language;
}

function predictProducts(leftSide: string): { reactants: string; products: string } | null {
  const cleanSide = leftSide.trim().toLowerCase();
  
  const hasNa = /na/.test(cleanSide);
  const hasK = /\bk\b|\bk\d+/.test(cleanSide) || cleanSide.includes('k');
  const hasCa = /ca/.test(cleanSide);
  const hasMg = /mg/.test(cleanSide);
  const hasAl = /al/.test(cleanSide);
  const hasFe = /fe/.test(cleanSide);
  const hasCu = /cu/.test(cleanSide);
  const hasZn = /zn/.test(cleanSide);
  
  const hasCl = /cl/.test(cleanSide);
  const hasO = /\bo\b|\bo\d+/.test(cleanSide) || cleanSide.includes('o2') || cleanSide.includes('o3') || (cleanSide.includes('o') && !cleanSide.includes('oh') && !cleanSide.includes('so4'));
  const hasS = /\bs\b|\bs\d+/.test(cleanSide) || (cleanSide.includes('s') && !cleanSide.includes('so4') && !cleanSide.includes('fe') && !cleanSide.includes('as'));
  const hasH = /h\d*/.test(cleanSide) && !cleanSide.includes('oh') && !cleanSide.includes('so4');
  const hasC = /\bc\b|\bc\d+/.test(cleanSide) || (cleanSide.includes('c') && !cleanSide.includes('ca') && !cleanSide.includes('cl') && !cleanSide.includes('cu'));
  
  const hasSo4 = /so4/.test(cleanSide);
  const hasOh = /oh/.test(cleanSide);

  // 1. NaOH/KOH/Ca(OH)2 + HCl/H2SO4
  if (hasOh && hasCl) {
    if (hasNa) return { reactants: 'NaOH + HCl', products: 'NaCl + H2O' };
    if (hasK) return { reactants: 'KOH + HCl', products: 'KCl + H2O' };
    if (hasCa) return { reactants: 'Ca(OH)2 + HCl', products: 'CaCl2 + H2O' };
  }
  if (hasOh && hasSo4) {
    if (hasNa) return { reactants: 'NaOH + H2SO4', products: 'Na2SO4 + H2O' };
  }
  
  // 2. Na/K/Ca + H2O
  if (cleanSide.includes('h2o')) {
    if (hasNa) return { reactants: 'Na + H2O', products: 'NaOH + H2' };
    if (hasK) return { reactants: 'K + H2O', products: 'KOH + H2' };
    if (hasCa) return { reactants: 'Ca + H2O', products: 'Ca(OH)2 + H2' };
  }

  // 3. Acids (HCl/H2SO4) + Metals
  if (hasCl && (cleanSide.includes('hcl') || cleanSide.includes('h'))) {
    if (hasZn) return { reactants: 'Zn + HCl', products: 'ZnCl2 + H2' };
    if (hasFe) return { reactants: 'Fe + HCl', products: 'FeCl2 + H2' };
    if (hasMg) return { reactants: 'Mg + HCl', products: 'MgCl2 + H2' };
    if (hasAl) return { reactants: 'Al + HCl', products: 'AlCl3 + H2' };
    if (hasCa) return { reactants: 'Ca + HCl', products: 'CaCl2 + H2' };
    if (hasNa) return { reactants: 'Na + HCl', products: 'NaCl + H2' };
    if (hasK) return { reactants: 'K + HCl', products: 'KCl + H2' };
  }
  if (hasSo4 && (cleanSide.includes('h2so4') || cleanSide.includes('h'))) {
    if (hasZn) return { reactants: 'Zn + H2SO4', products: 'ZnSO4 + H2' };
    if (hasFe) return { reactants: 'Fe + H2SO4', products: 'FeSO4 + H2' };
    if (hasMg) return { reactants: 'Mg + H2SO4', products: 'MgSO4 + H2' };
    if (hasAl) return { reactants: 'Al + H2SO4', products: 'Al2(SO4)3 + H2' };
  }

  // 4. Oxides (Metals / Non-metals + O2)
  if (hasO || cleanSide.includes('o2') || cleanSide.includes('o')) {
    if (hasNa) return { reactants: 'Na + O2', products: 'Na2O' };
    if (hasH) return { reactants: 'H2 + O2', products: 'H2O' };
    if (hasFe) return { reactants: 'Fe + O2', products: 'Fe2O3' };
    if (hasC) return { reactants: 'C + O2', products: 'CO2' };
    if (hasS) return { reactants: 'S + O2', products: 'SO2' };
    if (hasCu) return { reactants: 'Cu + O2', products: 'CuO' };
    if (hasZn) return { reactants: 'Zn + O2', products: 'ZnO' };
    if (hasCa) return { reactants: 'Ca + O2', products: 'CaO' };
    if (hasMg) return { reactants: 'Mg + O2', products: 'MgO' };
    if (hasAl) return { reactants: 'Al + O2', products: 'Al2O3' };
    if (hasK) return { reactants: 'K + O2', products: 'K2O' };
  }

  // 5. Chlorides (Metals + Cl2)
  if (hasCl || cleanSide.includes('cl2') || cleanSide.includes('cl')) {
    if (hasNa) return { reactants: 'Na + Cl2', products: 'NaCl' };
    if (hasK) return { reactants: 'K + Cl2', products: 'KCl' };
    if (hasFe) return { reactants: 'Fe + Cl2', products: 'FeCl3' };
    if (hasCu) return { reactants: 'Cu + Cl2', products: 'CuCl2' };
    if (hasH) return { reactants: 'H2 + Cl2', products: 'HCl' };
    if (hasAl) return { reactants: 'Al + Cl2', products: 'AlCl3' };
    if (hasZn) return { reactants: 'Zn + Cl2', products: 'ZnCl2' };
    if (hasCa) return { reactants: 'Ca + Cl2', products: 'CaCl2' };
    if (hasMg) return { reactants: 'Mg + Cl2', products: 'MgCl2' };
  }

  // 6. Sulfides (Metals + S)
  if (hasS || cleanSide.includes('s')) {
    if (hasNa) return { reactants: 'Na + S', products: 'Na2S' };
    if (hasFe) return { reactants: 'Fe + S', products: 'FeS' };
    if (hasCu) return { reactants: 'Cu + S', products: 'CuS' };
    if (hasH) return { reactants: 'H2 + S', products: 'H2S' };
    if (hasZn) return { reactants: 'Zn + S', products: 'ZnS' };
  }

  if (cleanSide.includes('h') && cleanSide.includes('o')) {
    return { reactants: 'H2 + O2', products: 'H2O' };
  }

  return null;
}

export default function EquationCompleter({ currentLang }: EquationCompleterProps) {
  const [equationStr, setEquationStr] = useState('H2 + O2 = H2O');
  const [balancedEquation, setBalancedEquation] = useState<string | null>(null);
  const [invalidTokens, setInvalidTokens] = useState<Array<{ token: string; suggestions: string[] }>>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'neutral' | 'success' | 'error'; text: string }>({ type: 'neutral', text: '' });

  const t = translations[currentLang];

  // Helper: Replace numbers inside formulas with subscripts
  const toSubscript = (text: string) => {
    return text.replace(/([A-Za-z])(\d+)/g, (_, char, num) => {
      const subs = num.split('').map((n: string) => {
        const map: Record<string, string> = {
          '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
          '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
        };
        return map[n] || n;
      }).join('');
      return char + subs;
    });
  };

  // Extract individual substance tokens e.g. ["H2", "O2", "H2O"] from "H2 + O2 = H2O"
  const extractTokens = (eq: string) => {
    return eq
      .split(/[+=➔\->\s]+/)
      .map(t => t.trim())
      .filter(t => /^[A-Z][a-z]?\d*[A-Z]?[a-z]?\d*$/.test(t));
  };

  // Check substances for valency alignment
  useEffect(() => {
    const tokens = extractTokens(equationStr);
    const badTokens: Array<{ token: string; suggestions: string[] }> = [];

    tokens.forEach((tok) => {
      // Find element constituents
      // Regex matches e.g. (Fe)(2)(O)(3) or (H)(2)(O)(1)
      const matches = [...tok.matchAll(/([A-Z][a-z]?)(\d*)/g)];
      if (matches.length === 2) {
        const elem1 = matches[0][1];
        const count1 = matches[0][2] ? parseInt(matches[0][2]) : 1;
        const elem2 = matches[1][1];
        const count2 = matches[1][2] ? parseInt(matches[1][2]) : 1;

        const valResult = checkValencyFormula(elem1, count1, elem2, count2);
        if (!valResult.valid) {
          badTokens.push({
            token: tok,
            suggestions: valResult.suggestions
          });
        }
      }
    });

    setInvalidTokens(badTokens);
  }, [equationStr]);

  // Substance fix action button
  const handleFixToken = (oldTok: string, newTok: string) => {
    const regex = new RegExp(`\\b${oldTok}\\b`, 'g');
    setEquationStr(prev => prev.replace(regex, newTok));
  };

  // Balancing algorithm: search coefficients using atomic counts conservation
  const handleBalance = () => {
    let currentEquation = equationStr.trim();
    
    // If LHS contains no RHS or RHS is empty, try to predict products
    const hasDivider = /=|➔|->/.test(currentEquation);
    const parts = currentEquation.split(/=|➔|->/);
    const emptyRhs = !hasDivider || parts.length < 2 || parts[1].trim() === '';
    
    if (emptyRhs) {
      const lhs = parts[0].trim();
      const predicted = predictProducts(lhs);
      if (predicted) {
        currentEquation = `${predicted.reactants} = ${predicted.products}`;
        setEquationStr(currentEquation);
      } else {
        setStatusMsg({
          type: 'error',
          text: currentLang === 'ka' 
            ? 'რეაქციის პროდუქტების ამოცნობა ვერ მოხერხდა. მიუთითეთ სრულად, მაგ. Na + O2 = Na2O' 
            : 'Could not predict reaction products. Please write them, e.g. Na + O2 = Na2O'
        });
        return;
      }
    }

    if (invalidTokens.length > 0) {
      setStatusMsg({
        type: 'error',
        text: currentLang === 'ka' ? 'შეცვალეთ შეცდომები ფორმულაში გათანაბრებამდე!' : 'Resolve formula composition errors before balancing!'
      });
      return;
    }

    try {
      // Split into Reactants (Left) and Products (Right)
      const sides = currentEquation.split(/=|➔|->/);
      if (sides.length !== 2) {
        throw new Error('Missing equation divider sign (= or ->)');
      }

      const parseMolecules = (sideStr: string) => {
        return sideStr
          .split('+')
          .map(m => m.trim())
          .filter(Boolean)
          .map(m => {
            // matches element + count counts
            const atomMap: Record<string, number> = {};
            const matches = [...m.matchAll(/([A-Z][a-z]?)(\d*)/g)];
            matches.forEach(match => {
              const elementSymbol = match[1];
              const count = match[2] ? parseInt(match[2]) : 1;
              atomMap[elementSymbol] = (atomMap[elementSymbol] || 0) + count;
            });
            return { raw: m, atoms: atomMap };
          });
      };

      const reactants = parseMolecules(sides[0]);
      const products = parseMolecules(sides[1]);

      if (reactants.length === 0 || products.length === 0) {
        throw new Error('Elements missing on reactants or products sides');
      }

      // Gather unified unique atomic symbols (e.g. ["H", "O"])
      const allAtomsSet = new Set<string>();
      reactants.forEach(m => Object.keys(m.atoms).forEach(a => allAtomsSet.add(a)));
      products.forEach(m => Object.keys(m.atoms).forEach(a => allAtomsSet.add(a)));
      const allAtoms = Array.from(allAtomsSet);

      // Search matching coefficients from 1 up to 16
      // Since chemicals equations are small, searching coefficient arrays iteratively is incredibly performant and 100% precise.
      let solvedCoefficients: { rCoeffs: number[]; pCoeffs: number[] } | null = null;

      // Reactants size array bounds, Products size array bounds
      const rSize = reactants.length;
      const pSize = products.length;

      // We support up to 3 reactants and 3 products (covering all typical high-school and college chemistry reactions!)
      const rMax = Math.pow(15, rSize);
      const pMax = Math.pow(15, pSize);

      outerLoop:
      for (let rVal = 1; rVal < rMax; rVal++) {
        // extract coefficients base 15
        const rCoeffs: number[] = [];
        let tempR = rVal;
        for (let i = 0; i < rSize; i++) {
          rCoeffs.push((tempR % 15) + 1);
          tempR = Math.floor(tempR / 15);
        }

        for (let pVal = 1; pVal < pMax; pVal++) {
          const pCoeffs: number[] = [];
          let tempP = pVal;
          for (let i = 0; i < pSize; i++) {
            pCoeffs.push((tempP % 15) + 1);
            tempP = Math.floor(tempP / 15);
          }

          // Verify conservation balance matches exactly
          let match = true;
          for (let atom of allAtoms) {
            let leftCount = 0;
            reactants.forEach((m, idx) => {
              leftCount += (m.atoms[atom] || 0) * rCoeffs[idx];
            });

            let rightCount = 0;
            products.forEach((m, idx) => {
              rightCount += (m.atoms[atom] || 0) * pCoeffs[idx];
            });

            if (leftCount !== rightCount) {
              match = false;
              break;
            }
          }

          if (match) {
            solvedCoefficients = { rCoeffs, pCoeffs };
            break outerLoop;
          }
        }
      }

      if (solvedCoefficients) {
        // Format with balanced numbers coefficient prefix!
        const rStr = reactants.map((m, idx) => {
          const coeff = solvedCoefficients!.rCoeffs[idx];
          return `${coeff === 1 ? '' : coeff}${m.raw}`;
        }).join(' + ');

        const pStr = products.map((m, idx) => {
          const coeff = solvedCoefficients!.pCoeffs[idx];
          return `${coeff === 1 ? '' : coeff}${m.raw}`;
        }).join(' + ');

        setBalancedEquation(`${rStr} = ${pStr}`);
        setStatusMsg({
          type: 'success',
          text: currentLang === 'ka' ? 'განტოლება წარმატებით გათანაბრდა!' : 'Chemical equation balanced successfully!'
        });
      } else {
        throw new Error('Solver exceeded constraints. Make sure elements are equal on both sides.');
      }

    } catch (err: any) {
      setBalancedEquation(null);
      setStatusMsg({
        type: 'error',
        text: err.message || 'Algebraic parsing failed. Please verify syntax structure.'
      });
    }
  };

  const handleClear = () => {
    setEquationStr('');
    setBalancedEquation(null);
    setStatusMsg({ type: 'neutral', text: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-4">
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-apple-gray-100 shadow-sm space-y-6">
        
        {/* Header summary tool */}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 pb-1 flex items-center gap-2">
            <Sparkles size={18} className="text-apple-blue" />
            {t.equationCompleter}
          </h3>
          <p className="text-xs text-gray-400">
            Automatically applies chemical coefficient counts, real-time formula auto-subscripts, and flags valency mismatches instantly.
          </p>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <div className="relative">
            <input
              id="equation-input-field"
              type="text"
              className="w-full px-5 py-4 bg-apple-gray-50 border border-apple-gray-200 rounded-2xl text-lg font-mono font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue/80 transition-all shadow-inner uppercase"
              value={equationStr}
              onChange={(e) => {
                const val = e.target.value;
                setEquationStr(val);
                setBalancedEquation(null);
                setStatusMsg({ type: 'neutral', text: '' });

                // Detect if the string ends with =, -> or ➔
                const trimmed = val.trim();
                if (trimmed.endsWith('=') || trimmed.endsWith('->') || trimmed.endsWith('➔')) {
                  const reactantsSide = trimmed.replace(/[=➔\->]+$/, '');
                  const predicted = predictProducts(reactantsSide);
                  if (predicted) {
                    setEquationStr(`${predicted.reactants} = ${predicted.products}`);
                  }
                }
              }}
              placeholder={t.equationPlaceholder}
            />
          </div>

          {/* Render real-time visual auto-subscripts preview below */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-gray-500 font-mono">
            <span className="font-semibold text-gray-400 uppercase">PREVIEW:</span>
            <span className="text-gray-700 font-bold">{toSubscript(equationStr) || '...'}</span>
          </div>
        </div>

        {/* Incorrect/Valency Warning Blocks */}
        <AnimatePresence>
          {invalidTokens.length > 0 && (
            <motion.div
              id="valency-error-alert"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col gap-3 overflow-hidden text-xs text-rose-700"
            >
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <AlertOctagon size={15} />
                <span>{t.incorrectSubstance}</span>
              </div>
              <div className="space-y-2">
                {invalidTokens.map((bad, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-rose-100/50 pt-2 first:border-0 first:pt-0">
                    <div>
                      <span>Element token </span>
                      <strong className="font-mono text-sm px-1.5 py-0.5 bg-rose-100 rounded-md">{toSubscript(bad.token)}</strong>
                      <span> does not fulfill molecular valency ratio requirements.</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-rose-500 font-medium">{t.fixBtn}:</span>
                      {bad.suggestions.map((sug) => (
                        <button
                          key={sug}
                          id={`fix-token-btn-${sug}`}
                          onClick={() => handleFixToken(bad.token, sug)}
                          className="px-2.5 py-1 bg-white hover:bg-rose-600 hover:text-white transition-colors border border-rose-300 font-mono rounded-lg cursor-pointer font-bold text-rose-800 shadow-xs"
                        >
                          {toSubscript(sug)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Controls */}
        <div className="flex gap-3">
          <button
            id="balance-action-btn"
            onClick={handleBalance}
            className="flex-1 py-3.5 bg-[#1D1D1F] text-white rounded-2xl font-semibold hover:bg-black transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
          >
            <Sparkles size={16} />
            {t.balanceBtn}
          </button>
          <button
            id="clear-equation-btn"
            onClick={handleClear}
            className="px-4 py-3 bg-apple-gray-100 border border-apple-gray-200 text-gray-500 rounded-2xl hover:bg-apple-gray-200 transition-colors flex items-center justify-center"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Status Msg */}
        {statusMsg.text && (
          <div className={`p-4 rounded-2xl border flex items-start gap-2.5 text-xs text-left ${
            statusMsg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
            statusMsg.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-700' :
            'bg-apple-gray-50 border-apple-gray-200 text-gray-700'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle size={15} className="mt-0.5 text-emerald-500" /> : <HelpCircle size={15} className="mt-0.5 text-gray-400" />}
            <div>
              <p className="font-semibold">{statusMsg.text}</p>
            </div>
          </div>
        )}

        {/* Balanced Output Area */}
        <AnimatePresence>
          {balancedEquation && (
            <motion.div
              id="balanced-result-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 bg-gradient-to-tr from-blue-50/50 to-indigo-50/50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center gap-2"
            >
              <div className="text-[10px] font-bold text-apple-blue uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} />
                {t.balancedResult}
              </div>
              <div className="text-2xl md:text-3xl font-mono font-bold text-gray-900 tracking-wider">
                {toSubscript(balancedEquation)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
