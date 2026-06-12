import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, HelpCircle, CheckCircle, AlertOctagon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translationData';
import { checkValencyFormula } from '../data/chemistryData';
import { balanceChemicalEquation } from '../utils/chemistrySolver';

interface EquationCompleterProps {
  currentLang: Language;
}

function predictProducts(leftSide: string): { reactants: string; products: string } | null {
  const normalizeFormula = (f: string): string => {
    let s = f.trim();
    // Remove coefficient if present (e.g. 2NaOH -> NaOH)
    s = s.replace(/^\d+/, '').trim();
    const upper = s.toUpperCase().replace(/\s+/g, '');
    
    // Precise chemical normalization map for predictable outcomes
    if (upper === 'H2O' || upper === 'H2O1') return 'H2O';
    if (upper === 'CO2') return 'CO2';
    if (upper === 'SO2') return 'SO2';
    if (upper === 'SO3') return 'SO3';
    if (upper === 'P2O5') return 'P2O5';
    if (upper === 'NAOH') return 'NaOH';
    if (upper === 'KOH') return 'KOH';
    if (['CA(OH)2', 'CA(OH)₂'].includes(upper)) return 'Ca(OH)2';
    if (['FE(OH)3', 'FE(OH)₃'].includes(upper)) return 'Fe(OH)3';
    if (upper === 'HCL') return 'HCl';
    if (upper === 'H2SO4') return 'H2SO4';
    if (upper === 'HNO3') return 'HNO3';
    if (upper === 'H2CO3') return 'H2CO3';
    if (upper === 'NA2O') return 'Na2O';
    if (upper === 'K2O') return 'K2O';
    if (upper === 'CAO') return 'CaO';
    if (upper === 'MGO') return 'MgO';
    if (upper === 'AL2O3') return 'Al2O3';
    if (upper === 'FE2O3') return 'Fe2O3';
    if (upper === 'ZNO') return 'ZnO';
    if (upper === 'CUO') return 'CuO';
    if (upper === 'NACL') return 'NaCl';
    if (upper === 'KCL') return 'KCl';
    if (upper === 'CACL2') return 'CaCl2';
    if (upper === 'MGCL2') return 'MgCl2';
    if (upper === 'FECL3') return 'FeCl3';
    if (upper === 'CUCL2') return 'CuCl2';
    if (upper === 'ZNCL2') return 'ZnCl2';
    if (upper === 'ALCL3') return 'AlCl3';
    if (upper === 'NA2S') return 'Na2S';
    if (upper === 'FES') return 'FeS';
    if (upper === 'CUS') return 'CuS';
    if (upper === 'H2S') return 'H2S';
    if (upper === 'ZNS') return 'ZnS';
    if (upper === 'NA') return 'Na';
    if (upper === 'K') return 'K';
    if (upper === 'CA') return 'Ca';
    if (upper === 'MG') return 'Mg';
    if (upper === 'AL') return 'Al';
    if (upper === 'FE') return 'Fe';
    if (upper === 'ZN') return 'Zn';
    if (upper === 'CU') return 'Cu';
    if (upper === 'C') return 'C';
    if (upper === 'S') return 'S';
    if (upper === 'P') return 'P';
    if (upper === 'O2') return 'O2';
    if (upper === 'H2') return 'H2';
    if (upper === 'CL2') return 'Cl2';
    if (upper === 'CACO3') return 'CaCO3';
    if (upper === 'NA2CO3') return 'Na2CO3';
    if (upper === 'H2SO3') return 'H2SO3';
    if (upper === 'H3PO4') return 'H3PO4';
    if (upper === 'NA2SO4') return 'Na2SO4';
    if (upper === 'K2SO4') return 'K2SO4';
    if (upper === 'CASO4') return 'CaSO4';
    if (upper === 'CO') return 'CO';
    if (upper === 'CH4') return 'CH4';
    if (upper === 'C2H5OH') return 'C2H5OH';
    if (upper === 'CH3COOH') return 'CH3COOH';
    if (upper === 'C6H12O6') return 'C6H12O6';
    
    return s;
  };

  const reactants = leftSide
    .split('+')
    .map(r => r.trim())
    .filter(Boolean)
    .map(normalizeFormula);

  if (reactants.length === 0) return null;

  // Single reactant decomposition reactions
  if (reactants.length === 1) {
    const single = reactants[0];
    const decompMap: Record<string, string[]> = {
      'H2O': ['H2', 'O2'],
      'CaCO3': ['CaO', 'CO2'],
      'H2CO3': ['H2O', 'CO2'],
      'H2SO3': ['H2O', 'SO2'],
    };
    const prod = decompMap[single];
    if (prod) {
      return {
        reactants: single,
        products: prod.join(' + ')
      };
    }
    return null;
  }

  // Double reactants reactions
  if (reactants.length === 2) {
    const pair = [...reactants].sort().join('+');
    
    const reactionMap: Record<string, string[]> = {
      // Elements + Oxygen
      'Na+O2': ['Na2O'],
      'K+O2': ['K2O'],
      'Ca+O2': ['CaO'],
      'Mg+O2': ['MgO'],
      'Al+O2': ['Al2O3'],
      'Fe+O2': ['Fe2O3'],
      'Cu+O2': ['CuO'],
      'O2+Zn': ['ZnO'],
      'C+O2': ['CO2'],
      'O2+S': ['SO2'],
      'H2+O2': ['H2O'],

      // Organic + Oxygen (Combustion)
      'CH4+O2': ['CO2', 'H2O'],
      'C2H5OH+O2': ['CO2', 'H2O'],
      'CH3COOH+O2': ['CO2', 'H2O'],
      'C6H12O6+O2': ['CO2', 'H2O'],

      // Elements + Chlorine
      'Cl2+Na': ['NaCl'],
      'Cl2+K': ['KCl'],
      'Ca+Cl2': ['CaCl2'],
      'Cl2+Mg': ['MgCl2'],
      'Cl2+Fe': ['FeCl3'],
      'Cl2+Cu': ['CuCl2'],
      'Cl2+H2': ['HCl'],
      'Cl2+Zn': ['ZnCl2'],
      'Al+Cl2': ['AlCl3'],

      // Elements + Sulfur
      'Fe+S': ['FeS'],
      'Cu+S': ['CuS'],
      'Na+S': ['Na2S'],
      'H2+S': ['H2S'],
      'S+Zn': ['ZnS'],

      // Acid + Base
      'HCl+NaOH': ['NaCl', 'H2O'],
      'HCl+KOH': ['KCl', 'H2O'],
      'Ca(OH)2+HCl': ['CaCl2', 'H2O'],
      'H2SO4+NaOH': ['Na2SO4', 'H2O'],
      'H2SO4+KOH': ['K2SO4', 'H2O'],
      'Ca(OH)2+H2SO4': ['CaSO4', 'H2O'],

      // Metal + Acid
      'HCl+Zn': ['ZnCl2', 'H2'],
      'Fe+HCl': ['FeCl2', 'H2'],
      'HCl+Mg': ['MgCl2', 'H2'],
      'Al+HCl': ['AlCl3', 'H2'],
      'H2SO4+Zn': ['ZnSO4', 'H2'],
      'Fe+H2SO4': ['FeSO4', 'H2'],
      'H2SO4+Mg': ['MgSO4', 'H2'],
      'Al+H2SO4': ['Al2(SO4)3', 'H2'],

      // Metal + Water
      'H2O+Na': ['NaOH', 'H2'],
      'H2O+K': ['KOH', 'H2'],
      'Ca+H2O': ['Ca(OH)2', 'H2'],

      // Acidic Oxide + Water
      'CO2+H2O': ['H2CO3'],
      'H2O+SO2': ['H2SO3'],
      'H2O+SO3': ['H2SO4'],
      'H2O+P2O5': ['H3PO4'],

      // Basic Oxide + Water
      'H2O+Na2O': ['NaOH'],
      'H2O+K2O': ['KOH'],
      'CaO+H2O': ['Ca(OH)2'],

      // Acidic Oxide + Base
      'CO2+NaOH': ['Na2CO3', 'H2O'],
      'CO2+KOH': ['K2CO3', 'H2O'],
      'CO2+Ca(OH)2': ['CaCO3', 'H2O'],

      // Acidic Oxide + Basic Oxide
      'CaO+CO2': ['CaCO3'],
      'CO2+Na2O': ['Na2CO3'],
      'CaO+SO2': ['CaSO3'],

      // Acid + Carbonate
      'CaCO3+HCl': ['CaCl2', 'H2O', 'CO2'],
      'HCl+Na2CO3': ['NaCl', 'H2O', 'CO2'],
      'CaCO3+H2SO4': ['CaSO4', 'H2O', 'CO2'],
      'H2SO4+Na2CO3': ['Na2SO4', 'H2O', 'CO2'],
    };

    const prod = reactionMap[pair];
    if (prod) {
      return {
        reactants: reactants.join(' + '),
        products: prod.join(' + ')
      };
    }

    // Generic organic/combustion synthesis procedural rule
    if (reactants.includes('O2')) {
      const other = reactants.find(r => r !== 'O2');
      if (other && other.includes('C')) {
        const hasH = other.includes('H');
        const hasS = other.includes('S');
        const hasN = other.includes('N');
        const hasP = other.includes('P');
        
        const combustionProducts: string[] = ['CO2'];
        if (hasH) combustionProducts.push('H2O');
        if (hasS) combustionProducts.push('SO2');
        if (hasN) combustionProducts.push('N2');
        if (hasP) combustionProducts.push('P2O5');

        return {
          reactants: reactants.join(' + '),
          products: combustionProducts.join(' + ')
        };
      }
    }
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
      const lhs = parts[0].trim().replace(/[=➔\->]+$/, '').trim();
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

      // Search matching coefficients from 1 up to bounds
      let solvedCoefficients = balanceChemicalEquation(
        reactants.map(r => r.atoms),
        products.map(p => p.atoms)
      );

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
