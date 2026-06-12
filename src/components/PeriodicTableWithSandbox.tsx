import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, ArrowUpRight, Shield, Zap, RefreshCw, Layers } from 'lucide-react';
import { Language, PeriodicElement, SandboxTile } from '../types';
import { translations } from '../data/translationData';
import { periodicElements, physicsReactions } from '../data/chemistryData';

interface PeriodicTableWithSandboxProps {
  currentLang: Language;
}

interface ParsedFormula {
  raw: string;
  isElement: boolean;
  isMetal: boolean;
  isNonmetal: boolean;
  isOxide: boolean;
  isBasicOxide: boolean;
  isAcidicOxide: boolean;
  isAcid: boolean;
  isBase: boolean;
  isSalt: boolean;
  isOrganic: boolean;
  isWater: boolean;
  cation: string;
  anion: string;
  metalElement: string;
  nonmetalElement: string;
}

const parseFormula = (f: string): ParsedFormula => {
  const raw = f.trim();
  const res: ParsedFormula = {
    raw,
    isElement: false,
    isMetal: false,
    isNonmetal: false,
    isOxide: false,
    isBasicOxide: false,
    isAcidicOxide: false,
    isAcid: false,
    isBase: false,
    isSalt: false,
    isOrganic: false,
    isWater: raw === 'H2O',
    cation: '',
    anion: '',
    metalElement: '',
    nonmetalElement: ''
  };

  if (res.isWater) return res;

  // 1. Organic check (contains both C and H, and maybe O, and starts with C)
  if (raw.startsWith('C') && /[A-Za-z0-9]/.test(raw) && raw.includes('H') && !raw.includes('CO3')) {
    res.isOrganic = true;
    return res;
  }

  // List of known active metals and transition metals
  const metals = ['Na', 'K', 'Ca', 'Mg', 'Fe', 'Zn', 'Cu', 'Al'];
  const nonmetals = ['H', 'O', 'Cl', 'S', 'C', 'P', 'N', 'H2', 'O2', 'Cl2'];

  // Check if pure elements
  if (metals.includes(raw)) {
    res.isElement = true;
    res.isMetal = true;
    res.metalElement = raw;
    return res;
  }
  if (nonmetals.includes(raw)) {
    res.isElement = true;
    res.isNonmetal = true;
    res.nonmetalElement = raw.replace(/\d+/g, ''); // get core element
    return res;
  }

  // 2. Bases check: starts with a metal, ends with OH or (OH)x
  const baseMatch = raw.match(/^([A-Z][a-z]?)\(?(OH)\)?(\d+)?$/);
  if (baseMatch && metals.includes(baseMatch[1])) {
    res.isBase = true;
    res.cation = baseMatch[1];
    res.anion = 'OH';
    return res;
  }

  // 3. Acids check: starts with H followed by an anion (except H2O, H2, H2S is acid)
  // Let's check common acids: HCl, H2SO4, HNO3, H2CO3, H2S, H2SO3, H3PO4
  const acidMatch = raw.match(/^H(\d+)?(Cl|SO4|NO3|CO3|S|SO3|PO4)$/);
  if (acidMatch) {
    res.isAcid = true;
    res.cation = 'H';
    res.anion = acidMatch[2];
    return res;
  }

  // 4. Oxides check: Compound of metal/nonmetal + O
  // Basic Oxides: metal + O (e.g. Na2O, CaO, MgO, Fe2O3, CuO, ZnO, Al2O3)
  // Acidic Oxides: nonmetal + O (e.g. CO2, SO2, SO3, P2O5)
  const oxideMatch = raw.match(/^([A-Z][a-z]?)(\d+)?O(\d+)?$/);
  if (oxideMatch) {
    const element = oxideMatch[1];
    if (metals.includes(element)) {
      res.isOxide = true;
      res.isBasicOxide = true;
      res.cation = element;
      return res;
    } else if (['C', 'S', 'P', 'N'].includes(element)) {
      res.isOxide = true;
      res.isAcidicOxide = true;
      res.nonmetalElement = element;
      return res;
    }
  }

  // 5. Salts check: starts with a metal, ends with a known acid anion
  for (const m of metals) {
    if (raw.startsWith(m)) {
      const rest = raw.substring(m.length).replace(/\d+/g, '').replace(/[()]/g, '');
      const validAnions = ['Cl', 'SO4', 'NO3', 'CO3', 'S', 'SO3', 'PO4'];
      if (validAnions.includes(rest)) {
        res.isSalt = true;
        res.cation = m;
        res.anion = rest;
        return res;
      }
    }
  }

  return res;
};

const getCationValency = (cat: string): number => {
  if (['Na', 'K', 'H'].includes(cat)) return 1;
  if (['Ca', 'Mg', 'Zn', 'Cu', 'Fe'].includes(cat)) return 2;
  if (['Al'].includes(cat)) return 3;
  return 1;
};

const getAnionValency = (an: string): number => {
  if (['Cl', 'NO3', 'OH'].includes(an)) return 1;
  if (['SO4', 'CO3', 'S', 'SO3'].includes(an)) return 2;
  if (['PO4'].includes(an)) return 3;
  return 1;
};

const simplifyRatio = (a: number, b: number): [number, number] => {
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const divisor = gcd(a, b);
  return [a / divisor, b / divisor];
};

const createSaltFormula = (cation: string, anion: string): string => {
  const vc = getCationValency(cation);
  const va = getAnionValency(anion);
  const [numAnion, numCation] = simplifyRatio(vc, va);
  
  const catFormula = numCation === 1 ? cation : `${cation}${numCation}`;
  const needsParens = numAnion > 1 && ['SO4', 'CO3', 'NO3', 'SO3', 'PO4'].includes(anion);
  const anFormula = needsParens ? `(${anion})${numAnion}` : (numAnion === 1 ? anion : `${anion}${numAnion}`);
  return `${catFormula}${anFormula}`;
};

const findProceduralReaction = (s1: string, s2: string) => {
  const p1 = parseFormula(s1);
  const p2 = parseFormula(s2);

  const textEnglish = (r1: string, r2: string, products: string[], typeStr: string) => {
    return `${r1} and ${r2} react to produce ${products.join(' + ')} (${typeStr}).`;
  };

  const buildReactionResponse = (products: string[], desc: string) => {
    return {
      reactants: [s1, s2],
      products,
      description: { en: desc, ka: desc, ru: desc }
    };
  };

  const checkReactionPairs = (a: ParsedFormula, b: ParsedFormula) => {
    // 1. Water + Acidic Oxide ➜ Acid
    if (a.isWater && b.isAcidicOxide) {
      if (b.nonmetalElement === 'C') {
        return buildReactionResponse(
          ['H2CO3'],
          textEnglish(a.raw, b.raw, ['H2CO3'], 'Carbonic Acid Synthesis')
        );
      }
      if (b.nonmetalElement === 'S') {
        const product = b.raw.includes('3') ? 'H2SO4' : 'H2SO3';
        const typeStr = product === 'H2SO4' ? 'Sulfuric Acid Synthesis' : 'Sulfurous Acid Synthesis';
        return buildReactionResponse(
          [product],
          textEnglish(a.raw, b.raw, [product], typeStr)
        );
      }
      if (b.nonmetalElement === 'P') {
        return buildReactionResponse(
          ['H3PO4'],
          textEnglish(a.raw, b.raw, ['H3PO4'], 'Phosphoric Acid Synthesis')
        );
      }
    }

    // 2. Water + Basic Oxide ➜ Base
    if (a.isWater && b.isBasicOxide) {
      if (['Na', 'K', 'Ca'].includes(b.cation)) {
        const baseFormula = b.cation === 'Ca' ? 'Ca(OH)2' : `${b.cation}OH`;
        return buildReactionResponse(
          [baseFormula],
          textEnglish(a.raw, b.raw, [baseFormula], 'Hydroxide Base Synthesis')
        );
      }
    }

    // 3. Active Metal + Water ➜ Base + H2
    if (a.isWater && b.isMetal && ['Na', 'K', 'Ca'].includes(b.metalElement)) {
      const baseFormula = b.metalElement === 'Ca' ? 'Ca(OH)2' : `${b.metalElement}OH`;
      return buildReactionResponse(
        [baseFormula, 'H2'],
        textEnglish(a.raw, b.raw, [baseFormula, 'H2'], 'Metal-Water Displacement')
      );
    }

    // 4. Acid + Base ➜ Salt + H2O
    if (a.isAcid && b.isBase) {
      const salt = createSaltFormula(b.cation, a.anion);
      return buildReactionResponse(
        [salt, 'H2O'],
        textEnglish(a.raw, b.raw, [salt, 'H2O'], 'Acid-Base Neutralization')
      );
    }

    // 5. Acid + Basic Oxide ➜ Salt + H2O
    if (a.isAcid && b.isBasicOxide) {
      const salt = createSaltFormula(b.cation, a.anion);
      return buildReactionResponse(
        [salt, 'H2O'],
        textEnglish(a.raw, b.raw, [salt, 'H2O'], 'Acid-Oxide Reaction')
      );
    }

    // 6. Base + Acidic Oxide ➜ Salt + H2O
    if (a.isBase && b.isAcidicOxide) {
      let anion = 'CO3';
      if (b.nonmetalElement === 'S') anion = b.raw.includes('3') ? 'SO4' : 'SO3';
      if (b.nonmetalElement === 'P') anion = 'PO4';

      const salt = createSaltFormula(a.cation, anion);
      return buildReactionResponse(
        [salt, 'H2O'],
        textEnglish(a.raw, b.raw, [salt, 'H2O'], 'Base-Oxide Carbonation')
      );
    }

    // 7. Basic Oxide + Acidic Oxide ➜ Salt
    if (a.isBasicOxide && b.isAcidicOxide) {
      let anion = 'CO3';
      if (b.nonmetalElement === 'S') anion = b.raw.includes('3') ? 'SO4' : 'SO3';
      if (b.nonmetalElement === 'P') anion = 'PO4';

      const salt = createSaltFormula(a.cation, anion);
      return buildReactionResponse(
        [salt],
        textEnglish(a.raw, b.raw, [salt], 'Direct Salt Synthesis')
      );
    }

    // 8. Metal + Acid ➜ Salt + H2
    if (a.isMetal && b.isAcid) {
      if (a.metalElement !== 'Cu') {
        const salt = createSaltFormula(a.metalElement, b.anion);
        return buildReactionResponse(
          [salt, 'H2'],
          textEnglish(a.raw, b.raw, [salt, 'H2'], 'Single Displacement')
        );
      }
    }

    // 9. Combustion / Oxidation of Elements/Organics
    const isOx = (pStr: ParsedFormula) => pStr.isNonmetal && pStr.nonmetalElement === 'O';
    if (isOx(a) || isOx(b)) {
      const other = isOx(a) ? b : a;

      if (other.isMetal) {
        let oxide = 'Na2O';
        if (other.metalElement === 'Na') oxide = 'Na2O';
        else if (other.metalElement === 'K') oxide = 'K2O';
        else if (other.metalElement === 'Ca') oxide = 'CaO';
        else if (other.metalElement === 'Mg') oxide = 'MgO';
        else if (other.metalElement === 'Al') oxide = 'Al2O3';
        else if (other.metalElement === 'Fe') oxide = 'Fe2O3';
        else if (other.metalElement === 'Zn') oxide = 'ZnO';
        else if (other.metalElement === 'Cu') oxide = 'CuO';

        return buildReactionResponse(
          [oxide],
          textEnglish(a.raw, b.raw, [oxide], 'Metal Combustion')
        );
      }

      if (other.isNonmetal) {
        if (other.nonmetalElement === 'C') {
          return buildReactionResponse(
            ['CO2'],
            textEnglish(a.raw, b.raw, ['CO2'], 'Carbon Combustion')
          );
        }
        if (other.nonmetalElement === 'S') {
          return buildReactionResponse(
            ['SO2'],
            textEnglish(a.raw, b.raw, ['SO2'], 'Sulfur Combustion')
          );
        }
        if (other.nonmetalElement === 'H') {
          return buildReactionResponse(
            ['H2O'],
            textEnglish(a.raw, b.raw, ['H2O'], 'Hydrogen Synthesis')
          );
        }
      }

      if (other.isOrganic) {
        const hasH = other.raw.includes('H');
        const hasS = other.raw.includes('S');
        const hasN = other.raw.includes('N');
        const hasP = other.raw.includes('P');
        
        const combustionProducts: string[] = ['CO2'];
        if (hasH) combustionProducts.push('H2O');
        if (hasS) combustionProducts.push('SO2');
        if (hasN) combustionProducts.push('N2');
        if (hasP) combustionProducts.push('P2O5');

        return buildReactionResponse(
          combustionProducts,
          textEnglish(a.raw, b.raw, combustionProducts, 'Hydrocarbon Combustion')
        );
      }
    }

    // 10. Acid + Carbonate/Sulfide Salt
    if (a.isAcid && b.isSalt) {
      if (b.anion === 'CO3') {
        const salt = createSaltFormula(b.cation, a.anion);
        return buildReactionResponse(
          [salt, 'H2O', 'CO2'],
          textEnglish(a.raw, b.raw, [salt, 'H2O', 'CO2'], 'Carbonate Acidolysis')
        );
      }
      if (b.anion === 'S') {
        const salt = createSaltFormula(b.cation, a.anion);
        return buildReactionResponse(
          [salt, 'H2S'],
          textEnglish(a.raw, b.raw, [salt, 'H2S'], 'Sulfide Acidolysis')
        );
      }
    }

    return null;
  };

  const rx1 = checkReactionPairs(p1, p2);
  if (rx1) return rx1;
  const rx2 = checkReactionPairs(p2, p1);
  if (rx2) return rx2;

  return null;
};

const findReactionForSymbols = (s1: string, s2: string) => {
  const sym1 = s1.trim();
  const sym2 = s2.trim();
  
  // 1. Procedural Smart Match
  const proc = findProceduralReaction(sym1, sym2);
  if (proc) return proc;

  // 2. Direct match in physicsReactions
  const found = physicsReactions.find(r => 
    (r.reactants[0] === sym1 && r.reactants[1] === sym2) ||
    (r.reactants[0] === sym2 && r.reactants[1] === sym1)
  );
  if (found) return found;

  // 3. Add atomic elements matchups
  const sortedPair = [sym1, sym2].sort().join('+');
  
  const elementReactions: Record<string, { products: string[], desc: string }> = {
    'H+O': { products: ['H2O'], desc: 'Hydrogen and Oxygen react to form Water.' },
    'C+O': { products: ['CO2'], desc: 'Carbon and Oxygen react to form Carbon Dioxide.' },
    'C+O2': { products: ['CO2'], desc: 'Carbon and Oxygen gas react to form Carbon Dioxide.' },
    'Cl+Na': { products: ['NaCl'], desc: 'Sodium and Chlorine react to form Sodium Chloride (Salt).' },
    'Cl+H': { products: ['HCl'], desc: 'Hydrogen and Chlorine react to form Hydrochloric Acid.' },
    'Cl+K': { products: ['KCl'], desc: 'Potassium and Chlorine react to form Potassium Chloride.' },
    'Cl+Fe': { products: ['FeCl3'], desc: 'Iron and Chlorine react to form Iron(III) Chloride.' },
    'Cl+Zn': { products: ['ZnCl2'], desc: 'Zinc and Chlorine react to form Zinc Chloride.' },
    'O+S': { products: ['SO2'], desc: 'Sulfur and Oxygen react to form Sulfur Dioxide.' },
    'O+Na': { products: ['Na2O'], desc: 'Sodium and Oxygen react to form Sodium Oxide.' },
    'Al+O': { products: ['Al2O3'], desc: 'Aluminum and Oxygen react to form Aluminum Oxide.' },
    'Fe+O': { products: ['Fe2O3'], desc: 'Iron and Oxygen react to form Iron Oxide (Rust).' },
    'Cu+O': { products: ['CuO'], desc: 'Copper and Oxygen react to form Copper Oxide.' },
    'Mg+O': { products: ['MgO'], desc: 'Magnesium and Oxygen react to form Magnesium Oxide.' },
    'Ca+O': { products: ['CaO'], desc: 'Calcium and Oxygen react to form Calcium Oxide.' },
    'O+Zn': { products: ['ZnO'], desc: 'Zinc and Oxygen react to form Zinc Oxide.' },
    'H2+O2': { products: ['H2O'], desc: 'Hydrogen gas and Oxygen gas react to form Water.' },
    'Cl2+Na': { products: ['NaCl'], desc: 'Sodium and Chlorine gas react to form Sodium Chloride.' },
    'Cl2+H2': { products: ['HCl'], desc: 'Hydrogen gas and Chlorine gas react to form Hydrochloric Acid.' },
    'Na+S': { products: ['Na2S'], desc: 'Sodium and Sulfur react to form Sodium Sulfide.' },
    'Fe+S': { products: ['FeS'], desc: 'Iron and Sulfur react to form Iron Sulfide.' },
    'Cu+S': { products: ['CuS'], desc: 'Copper and Sulfur react to form Copper Sulfide.' },
    'H+S': { products: ['H2S'], desc: 'Hydrogen and Sulfur react to form Hydrogen Sulfide.' },
    'S+Zn': { products: ['ZnS'], desc: 'Zinc and Sulfur react to form Zinc Sulfide.' },
  };

  if (elementReactions[sortedPair]) {
    const rx = elementReactions[sortedPair];
    return {
      reactants: [sym1, sym2],
      products: rx.products,
      description: { en: rx.desc, ka: rx.desc, ru: rx.desc }
    };
  }
  
  return null;
};

export default function PeriodicTableWithSandbox({ currentLang }: PeriodicTableWithSandboxProps) {
  // Elements and Hover Tooltip State
  const [hoveredElement, setHoveredElement] = useState<PeriodicElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(() => {
    return periodicElements.find((e) => e.symbol === 'Na') || null;
  });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Sandbox State variables
  const [tiles, setTiles] = useState<SandboxTile[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  
  // Flash particle effect coordinates for chemical merge reactions
  const [burstEffects, setBurstEffects] = useState<Array<{ id: string; x: number; y: number; text: string }>>([]);

  const sandboxRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const t = translations[currentLang];

  // Map category code to Tailwind/hex colors
  const categoryColors: Record<PeriodicElement['category'], { bg: string; text: string; border: string }> = {
    'alkali': { bg: 'bg-[#FF3B30]/10', text: 'text-[#FF3B30]', border: 'border-[#FF3B30]/30' },
    'alkaline-earth': { bg: 'bg-[#FF9500]/10', text: 'text-[#FF9500]', border: 'border-[#FF9500]/30' },
    'transition-metal': { bg: 'bg-[#34C759]/10', text: 'text-[#34C759]', border: 'border-[#34C759]/30' },
    'post-transition-metal': { bg: 'bg-[#0071E3]/10', text: 'text-[#0071E3]', border: 'border-[#0071E3]/30' },
    'metalloid': { bg: 'bg-[#52525B]/10', text: 'text-gray-700', border: 'border-gray-300' },
    'reactive-nonmetal': { bg: 'bg-[#5856D6]/10', text: 'text-[#5856D6]', border: 'border-[#5856D6]/30' },
    'halogen': { bg: 'bg-[#AF52DE]/10', text: 'text-[#AF52DE]', border: 'border-[#AF52DE]/30' },
    'noble-gas': { bg: 'bg-[#8E8E93]/10', text: 'text-[#8E8E93]', border: 'border-[#8E8E93]/40' },
    'lanthanide': { bg: 'bg-[#30B0C7]/10', text: 'text-[#30B0C7]', border: 'border-[#30B0C7]/30' },
    'actinide': { bg: 'bg-[#BF5AF2]/10', text: 'text-[#BF5AF2]', border: 'border-[#BF5AF2]/30' }
  };

  const categoryLabels: Record<PeriodicElement['category'], Record<Language, string>> = {
    'alkali': { en: 'Alkali Metals', ka: 'ტუტე ლითონები', ru: 'Щелочные металлы' },
    'alkaline-earth': { en: 'Alkaline Earth', ka: 'ტუტემიწა ლითონები', ru: 'Щелочноземельные металлы' },
    'transition-metal': { en: 'Transition Metals', ka: 'გარდამავალი ლითონები', ru: 'Переходные металлы' },
    'post-transition-metal': { en: 'Post-Transition', ka: 'პოსტგარდამავალი', ru: 'Постпереходные металлы' },
    'metalloid': { en: 'Metalloids', ka: 'მეტალოიდები', ru: 'Металлоиды' },
    'reactive-nonmetal': { en: 'Nonmetals', ka: 'არალითონები', ru: 'Неметаллы' },
    'halogen': { en: 'Halogens', ka: 'ჰალოგენები', ru: 'Галогены' },
    'noble-gas': { en: 'Noble Gases', ka: 'ინერტული აირები', ru: 'Благородные газы' },
    'lanthanide': { en: 'Lanthanides', ka: 'ლანთანიდები', ru: 'Лантаноиды' },
    'actinide': { en: 'Actinides', ka: 'აქტინიდები', ru: 'Актиноиды' }
  };

  // Sandbox Drag state variables
  const [draggingTileId, setDraggingTileId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const reactingIdsRef = useRef<Set<string>>(new Set());

  // Custom compound formula adding states and methods
  const [customFormula, setCustomFormula] = useState('');
  const [customError, setCustomError] = useState('');

  const calculateFormulaMass = (formula: string): number => {
    const elementMasses: Record<string, number> = {
      H: 1.008, He: 4.002, Li: 6.94, Be: 9.012, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
      F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
      S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867,
      V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546,
      Zn: 65.38, Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798
    };
    const matches = formula.match(/([A-Z][a-z]?)(\d+)?/g) || [];
    let total = 0;
    for (const m of matches) {
      const elMatch = m.match(/([A-Z][a-z]?)(\d+)?/);
      if (elMatch) {
        const el = elMatch[1];
        const count = elMatch[2] ? parseInt(elMatch[2], 10) : 1;
        const mass = elementMasses[el] || 20;
        total += mass * count;
      }
    }
    if (formula.includes('(OH)2')) total += 17;
    if (formula.includes('(OH)3')) total += 34;
    if (formula.includes('(SO4)3')) total += 192;
    if (formula.includes('(CO3)3')) total += 120;
    return Math.round(total * 10) / 10 || 40;
  };

  const getCompoundColor = (formula: string): string => {
    const p = parseFormula(formula);
    if (p.isWater) return '#38BDF8';
    if (p.isBase) return '#AF52DE';
    if (p.isAcid) return '#FF3B30';
    if (p.isOxide) return '#FF9500';
    if (p.isSalt) return '#34C759';
    if (p.isOrganic) return '#10B981';
    return '#0071E3';
  };

  const spawnCompound = (formula: string) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const radius = 28;

    const newTile: SandboxTile = {
      id: Math.random().toString(36).substring(2, 9),
      symbol: formula,
      x: rect.width / 2 + (Math.random() * 80 - 40),
      y: rect.height / 2 + (Math.random() * 80 - 40),
      vx: 0,
      vy: 0,
      radius,
      color: getCompoundColor(formula),
      mass: calculateFormulaMass(formula)
    };

    setTiles((prev) => [...prev, newTile]);
  };

  const handleAddCustom = () => {
    const formula = customFormula.trim();
    if (!formula) return;
    
    // Quick validation
    if (!/^[A-Z][A-Za-z0-9()]*$/.test(formula)) {
      setCustomError("Enter a valid formula (e.g. NaOH, HCl)");
      setTimeout(() => setCustomError(''), 4000);
      return;
    }

    spawnCompound(formula);
    setCustomFormula('');
  };

  // Add element to Sandbox Onboarding Drag/Click
  const addElementToSandbox = (elem: PeriodicElement) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const radius = 28; // fixed visual tile radius

    // Create a new direct-drag workspace tile placed near the container center
    const newTile: SandboxTile = {
      id: Math.random().toString(36).substring(2, 9),
      symbol: elem.symbol,
      x: rect.width / 2 + (Math.random() * 80 - 40),
      y: rect.height / 2 + (Math.random() * 80 - 40),
      vx: 0,
      vy: 0,
      radius,
      color: elem.category === 'reactive-nonmetal' || elem.category === 'halogen' ? '#EF4444' : '#0071E3',
      mass: elem.mass
    };

    setTiles((prev) => [...prev, newTile]);
  };

  // Helper: Trigger a beautiful chemical reaction merger
  const triggerChemicalReaction = (t1: SandboxTile, t2: SandboxTile, reaction: any) => {
    // Determine midpoint of collision
    const midX = (t1.x + t2.x) / 2;
    const midY = (t1.y + t2.y) / 2;
    
    const rxId = Math.random().toString();
    const reactionText = reaction.products.join(' + ');

    // Burst shockwave animation
    setBurstEffects((prev) => [...prev, { id: rxId, x: midX, y: midY, text: reactionText }]);
    setTimeout(() => {
      setBurstEffects((prev) => prev.filter(b => b.id !== rxId));
    }, 2400);

    // Create the new product tiles
    const productTiles: SandboxTile[] = reaction.products.map((prodSymbol: string, idx: number) => {
      const rxProdId = Math.random().toString(36).substring(2, 9);
      return {
        id: rxProdId,
        symbol: prodSymbol,
        x: midX + (idx * 34 - 17),
        y: midY + (idx * 16 - 8),
        vx: 0,
        vy: 0,
        radius: 28,
        color: getCompoundColor(prodSymbol),
        mass: calculateFormulaMass(prodSymbol)
      };
    });

    // Update state in exactly ONE setter call
    setTiles((prev) => {
      const filtered = prev.filter(t => t.id !== t1.id && t.id !== t2.id);
      return [...filtered, ...productTiles];
    });

    // Revoke the reacting guard after a short cooldown
    setTimeout(() => {
      reactingIdsRef.current.delete(t1.id);
      reactingIdsRef.current.delete(t2.id);
    }, 300);
  };

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, tile: SandboxTile) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDraggingTileId(tile.id);
    setSelectedTileId(tile.id); // Choose for reactant suggestions below

    const rect = sandboxRef.current?.getBoundingClientRect();
    if (rect) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      dragOffset.current = {
        x: clickX - tile.x,
        y: clickY - tile.y
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, tile: SandboxTile) => {
    if (draggingTileId !== tile.id) return;
    e.stopPropagation();

    const rect = sandboxRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    let nx = clickX - dragOffset.current.x;
    let ny = clickY - dragOffset.current.y;

    // Keep within bounds of the sandbox area
    const r = tile.radius;
    nx = Math.max(r, Math.min(rect.width - r, nx));
    ny = Math.max(r, Math.min(rect.height - r, ny));

    // Update coordinates and dynamically detect chemical collisions
    setTiles((prevTiles) => {
      if (reactingIdsRef.current.has(tile.id)) {
        return prevTiles;
      }

      let reacted = false;
      let otherTileToReact: SandboxTile | null = null;
      let rxInfo: any = null;

      // Check distance against other elements
      for (let i = 0; i < prevTiles.length; i++) {
        const other = prevTiles[i];
        if (other.id === tile.id) continue;
        if (reactingIdsRef.current.has(other.id)) continue;

        const dx = other.x - nx;
        const dy = other.y - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // When overlap triggers (radius + radius), check chemicals reactivity
        if (dist < (r + other.radius - 2)) {
          const rx = findReactionForSymbols(tile.symbol, other.symbol);
          if (rx) {
            otherTileToReact = other;
            rxInfo = rx;
            reacted = true;
            break;
          }
        }
      }

      if (reacted && otherTileToReact && rxInfo) {
        // Enforce lock synchronously inside callback
        reactingIdsRef.current.add(tile.id);
        reactingIdsRef.current.add(otherTileToReact.id);

        // Release tracking lock
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) {}

        const t1 = { ...tile, x: nx, y: ny };
        const t2 = { ...otherTileToReact };
        setTimeout(() => {
          triggerChemicalReaction(t1, t2, rxInfo);
        }, 0);

        setDraggingTileId(null);
        // Clear reactants instantly in this tick
        return prevTiles.filter(t => t.id !== tile.id && t.id !== otherTileToReact!.id);
      }

      // No match, just move the tile along under finger
      return prevTiles.map(t => t.id === tile.id ? { ...t, x: nx, y: ny } : t);
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, tile: SandboxTile) => {
    if (draggingTileId === tile.id) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggingTileId(null);
    }
  };

  // Handle periodic hover coords tracker
  const handleElementHover = (e: React.MouseEvent, elem: PeriodicElement | null) => {
    if (elem) {
      const rect = e.currentTarget.getBoundingClientRect();
      const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
      const x = rect.left - (parentRect?.left || 0) + rect.width / 2;
      const y = rect.top - (parentRect?.top || 0) - 45;
      setTooltipPos({ x, y });
    }
    setHoveredElement(elem);
  };

  // Click on a physics sandbox tile
  const handleTileClick = (tileId: string) => {
    setSelectedTileId(tileId === selectedTileId ? null : tileId);
  };

  // Helper: check list of possible suggested reaction partners for selected tile
  const getSuggestionsForTile = (symbol: string): string[] => {
    const p = parseFormula(symbol);
    const setOfPartners = new Set<string>();

    const matchedReactions = physicsReactions.filter(r => r.reactants.includes(symbol));
    matchedReactions.forEach(r => {
      const partner = r.reactants.find(rect => rect !== symbol);
      if (partner) setOfPartners.add(partner);
    });

    // Add procedural ones dynamically!
    if (p.isWater) {
      ['CO2', 'SO2', 'Na2O', 'K2O', 'CaO', 'Na', 'K', 'Ca'].forEach(s => setOfPartners.add(s));
    } else if (p.isAcidicOxide) {
      ['H2O', 'NaOH', 'KOH', 'Ca(OH)2', 'Na2O', 'CaO'].forEach(s => setOfPartners.add(s));
    } else if (p.isBasicOxide) {
      ['H2O', 'HCl', 'H2SO4', 'CO2', 'SO2'].forEach(s => setOfPartners.add(s));
    } else if (p.isAcid) {
      ['NaOH', 'KOH', 'Ca(OH)2', 'Na2O', 'CaO', 'Na', 'Zn', 'Fe', 'CaCO3', 'Na2CO3'].forEach(s => setOfPartners.add(s));
    } else if (p.isBase) {
      ['HCl', 'H2SO4', 'HNO3', 'CO2', 'SO2', 'SO3'].forEach(s => setOfPartners.add(s));
    } else if (p.isElement && p.nonmetalElement === 'O') {
      ['Na', 'Ca', 'Mg', 'Fe', 'Al', 'C', 'S', 'CH4', 'C2H5OH', 'CH3COOH'].forEach(s => setOfPartners.add(s));
    } else if (p.isOrganic) {
      ['O2', 'O'].forEach(s => setOfPartners.add(s));
    } else if (p.isMetal) {
      if (symbol !== 'Cu') {
        ['HCl', 'H2SO4', 'O2', 'O'].forEach(s => setOfPartners.add(s));
      } else {
        ['O2', 'O'].forEach(s => setOfPartners.add(s));
      }
    } else if (p.isSalt && p.anion === 'CO3') {
      ['HCl', 'H2SO4', 'HNO3'].forEach(s => setOfPartners.add(s));
    }

    return Array.from(setOfPartners).filter(pStr => pStr !== symbol);
  };

  // Handle clicking a suggestion button to generate and collide in reactions
  const triggerReaction = (reactorSymbol: string, partnerSymbol: string) => {
    if (!selectedTileId) return;
    const currentTile = tiles.find(t => t.id === selectedTileId);
    if (!currentTile) return;

    // Search reactants library
    let reaction = findProceduralReaction(currentTile.symbol, partnerSymbol);
    if (!reaction) {
      reaction = physicsReactions.find(r =>
        r.reactants.includes(currentTile.symbol) && r.reactants.includes(partnerSymbol)
      );
    }

    if (!reaction) return;

    // Trigger visual merge action and create product tiles
    const productTiles = reaction.products.map((prodSymbol, idx) => {
      return {
        id: Math.random().toString(36).substring(2, 9),
        symbol: prodSymbol,
        x: currentTile.x + (idx * 30 - 15),
        y: currentTile.y - 10,
        vx: 0,
        vy: 0,
        radius: 28,
        color: getCompoundColor(prodSymbol),
        mass: calculateFormulaMass(prodSymbol)
      };
    });

    setTiles((prev) => {
      const filtered = prev.filter(t => t.id !== selectedTileId);
      return [...filtered, ...productTiles];
    });
    setSelectedTileId(null);

    // Create burst rings particle impact
    const burstId = Math.random().toString();
    const burstText = reaction.products.join(' + ');
    setBurstEffects((prev) => [...prev, { id: burstId, x: currentTile.x, y: currentTile.y, text: burstText }]);

    // Clean burst text after 2 seconds
    setTimeout(() => {
      setBurstEffects((prev) => prev.filter(b => b.id !== burstId));
    }, 2400);
  };

  // Drop element helper to empty space
  const clearSandbox = () => {
    setTiles([]);
    setSelectedTileId(null);
    setDraggingTileId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-1 py-1">
      {/* Central Viewport Workspace (Left Column, spans 8 cols on desktop) */}
      <div className="col-span-1 lg:col-span-8 space-y-8">
        
        {/* SECTION 2A-1: Periodic Grid Table Structure */}
        <div className="relative rounded-3xl bg-white border border-[#E5E5EA] p-6 shadow-xs overflow-x-auto">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
            <Layers size={18} className="text-[#0071E3]" />
            {t.interactivePeriodicTable}
          </h3>

          {/* Hover elements tooltip card overlay */}
          <AnimatePresence>
            {hoveredElement && (
              <motion.div
                id="periodic-tooltip"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
                className="absolute z-30 -translate-x-1/2 p-2 px-3 rounded-xl bg-gray-900 text-white text-xs border border-white/10 shadow-lg pointer-events-none flex flex-col items-center gap-0.5"
              >
                <div className="font-mono text-[10px] text-gray-400 font-semibold">{hoveredElement.number} • {hoveredElement.symbol}</div>
                <div className="font-semibold">{hoveredElement.name[currentLang]}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core 18x10 Periodic System Grid */}
          <div className="grid grid-cols-18 gap-[3px] min-w-[760px]">
            {Array.from({ length: 10 }).map((_, rIdx) => {
              const rowNumber = rIdx + 1;
              return Array.from({ length: 18 }).map((_, cIdx) => {
                const colNumber = cIdx + 1;
                const el = periodicElements.find((e) => e.row === rowNumber && e.col === colNumber);

                if (!el) {
                  return <div key={`empty-${rowNumber}-${colNumber}`} className="aspect-square opacity-0 pointer-events-none" />;
                }

                const colors = categoryColors[el.category];

                return (
                  <button
                    key={el.symbol}
                    id={`element-cell-${el.symbol.toLowerCase()}`}
                    onMouseEnter={(e) => handleElementHover(e, el)}
                    onMouseLeave={(e) => handleElementHover(e, null)}
                    onClick={() => {
                      setSelectedElement(el);
                      addElementToSandbox(el);
                    }}
                    className={`relative flex flex-col items-center justify-center p-1.5 aspect-square rounded-lg border ${colors.bg} ${colors.border} ${colors.text} cursor-pointer hover:scale-108 active:scale-95 transition-all duration-200 shadow-sm overflow-hidden`}
                  >
                    <span className="text-[7px] font-semibold opacity-70 absolute top-1 left-1.5 font-mono">{el.number}</span>
                    <span className="text-xs font-bold leading-none tracking-tight mt-1">{el.symbol}</span>
                    <span className="text-[6px] opacity-60 leading-none tracking-normal truncate w-full px-0.5 text-center mt-0.5">{el.name[currentLang]}</span>
                  </button>
                );
              });
            })}
          </div>

          {/* Categories Color Legends Indicators */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 pt-4 border-t border-[#E5E5EA] justify-center">
            {Object.entries(categoryColors).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                <span className={`w-3 h-3 rounded-md border ${value.bg} ${value.border}`} />
                <span>{categoryLabels[key as PeriodicElement['category']][currentLang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2A-2: Dynamic Gravity Physics Sandbox Area */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h4 className="text-lg font-semibold tracking-tight text-gray-900 flex items-center gap-2">
                <Sparkles size={18} className="text-[#0071E3]" />
                {t.sandboxTitle}
              </h4>
              <p className="text-xs text-[#86868B] leading-normal max-w-xl">
                {t.sandboxDesc}
              </p>
            </div>
            <button
              id="clear-sandbox-btn"
              onClick={clearSandbox}
              className="px-4 py-2 flex items-center gap-1.5 rounded-xl text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all bg-white cursor-pointer"
            >
              <Trash2 size={14} />
              {t.cleanBtn}
            </button>
          </div>

          {/* Dynamic Compounds Creator & Custom Spawner Dashboard Panel */}
          <div className="bg-white border border-[#E5E5EA] rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  🧪 Spawner & Compounds Lab
                </span>
                <p className="text-[11px] text-gray-500">
                  Select predefined chemicals or type any custom formula to drop its active tile.
                </p>
              </div>
              
              {/* Add Custom Formula input with live validation */}
              <div className="w-full md:w-auto space-y-1">
                <div className="flex items-center gap-1.5 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="e.g. NaOH, HCl, Na2O, CH3COOH..."
                    className="px-3.5 py-2 text-xs rounded-xl border border-[#E5E5EA] bg-[#F5F5F7] text-gray-900 focus:outline-[#0071E3] font-mono tracking-wide w-full md:w-56 placeholder:font-sans placeholder:tracking-normal"
                    value={customFormula}
                    onChange={(e) => setCustomFormula(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddCustom();
                    }}
                  />
                  <button
                    id="add-custom-compound-btn"
                    onClick={handleAddCustom}
                    className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-blue-600 font-semibold text-xs text-white shadow-sm transition-all whitespace-nowrap cursor-pointer"
                  >
                    Add Custom
                  </button>
                </div>
                {customError && (
                  <p className="text-[10px] text-red-500 font-medium pl-1 animate-pulse">
                    ⚠️ {customError}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Categories grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
              {/* BASES */}
              <div className="space-y-2 bg-[#F5F5F7]/40 p-2.5 rounded-2xl border border-[#E5E5EA]">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  🧬 Bases
                </div>
                <div className="flex flex-wrap gap-1">
                  {['NaOH', 'KOH', 'Ca(OH)2', 'Fe(OH)3'].map(c => (
                    <button
                      key={c}
                      onClick={() => spawnCompound(c)}
                      className="px-2 py-1 text-[10px] font-bold font-mono bg-white border border-gray-200 rounded-lg text-purple-700 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* OXIDES */}
              <div className="space-y-2 bg-[#F5F5F7]/40 p-2.5 rounded-2xl border border-[#E5E5EA]">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  🌋 Oxides
                </div>
                <div className="flex flex-wrap gap-1">
                  {['CO2', 'Na2O', 'Fe2O3', 'CaO', 'SO2'].map(c => (
                    <button
                      key={c}
                      onClick={() => spawnCompound(c)}
                      className="px-2 py-1 text-[10px] font-bold font-mono bg-white border border-gray-200 rounded-lg text-amber-700 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACIDS */}
              <div className="space-y-2 bg-[#F5F5F7]/40 p-2.5 rounded-2xl border border-[#E5E5EA]">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  🔥 Acids
                </div>
                <div className="flex flex-wrap gap-1">
                  {['HCl', 'H2SO4', 'H2CO3', 'HNO3'].map(c => (
                    <button
                      key={c}
                      onClick={() => spawnCompound(c)}
                      className="px-2 py-1 text-[10px] font-bold font-mono bg-white border border-gray-200 rounded-lg text-red-600 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* SALTS */}
              <div className="space-y-2 bg-[#F5F5F7]/40 p-2.5 rounded-2xl border border-[#E5E5EA]">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  🧂 Salts
                </div>
                <div className="flex flex-wrap gap-1">
                  {['NaCl', 'CaCl2', 'MgSO4', 'CaCO3'].map(c => (
                    <button
                      key={c}
                      onClick={() => spawnCompound(c)}
                      className="px-2 py-1 text-[10px] font-bold font-mono bg-white border border-gray-200 rounded-lg text-green-700 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* ORGANIC */}
              <div className="space-y-2 bg-[#F5F5F7]/40 p-2.5 rounded-2xl border border-[#E5E5EA]">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  🌿 Organics
                </div>
                <div className="flex flex-wrap gap-1">
                  {['CH4', 'C2H5OH', 'CH3COOH', 'C6H12O6'].map(c => (
                    <button
                      key={c}
                      onClick={() => spawnCompound(c)}
                      className="px-2 py-1 text-[10px] font-bold font-mono bg-white border border-gray-200 rounded-lg text-emerald-700 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Physics Canvas Area wrapper */}
          <div
            ref={sandboxRef}
            id="physics-sandbox-container"
            className="relative w-full h-[460px] bg-[#F5F5F7] rounded-3xl border border-[#E5E5EA] shadow-inner overflow-hidden select-none flex items-center justify-center pt-8"
          >
            {tiles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.6, scale: 1 }}
                className="text-center max-w-xs text-gray-400 p-6 pointer-events-none flex flex-col items-center gap-3 z-0"
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 flex items-center justify-center">
                  <ArrowUpRight size={20} className="animate-pulse" />
                </div>
                <span className="text-xs font-medium leading-relaxed">
                  Click any chemical element above to drop iOS interactive tiles inside this physics Sandbox workspace.
                </span>
              </motion.div>
            )}

            {/* Render iOS bounce tiles */}
            <AnimatePresence>
              {tiles.map((tile) => {
                const matches = getSuggestionsForTile(tile.symbol);
                const isSelected = selectedTileId === tile.id;
                
                return (
                  <motion.div
                    key={tile.id}
                    id={`sandbox-tile-${tile.id}`}
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: isSelected ? 1.08 : 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    onPointerDown={(e) => handlePointerDown(e, tile)}
                    onPointerMove={(e) => handlePointerMove(e, tile)}
                    onPointerUp={(e) => handlePointerUp(e, tile)}
                    onPointerCancel={(e) => handlePointerUp(e, tile)}
                    onClick={() => handleTileClick(tile.id)}
                    style={{
                      position: 'absolute',
                      left: `${tile.x - tile.radius}px`,
                      top: `${tile.y - tile.radius}px`,
                      width: `${tile.radius * 2}px`,
                      height: `${tile.radius * 2}px`
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl cursor-grab active:cursor-grabbing shadow-sm select-none touch-none transition-shadow z-20 ${
                      isSelected
                        ? 'ring-4 ring-[#0071E3] bg-white border-2 border-[#0071E3] font-bold text-[#0071E3] shadow-md'
                        : 'bg-white border text-gray-900 border-[#E5E5EA] hover:shadow-md'
                    }`}
                  >
                    <span className="text-xs font-bold leading-none font-sans">{tile.symbol}</span>
                    <span className="text-[7px] font-mono opacity-50 mt-0.5">{Math.round(tile.mass)}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Chemical Merges Burst Shockwave rings */}
            {burstEffects.map((burst) => (
              <div
                key={burst.id}
                className="absolute pointer-events-none z-30"
                style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
              >
                <motion.div
                  initial={{ scale: 0.1, opacity: 1 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="w-16 h-16 -ml-8 -mt-8 rounded-full border-4 border-[#10B981] bg-[#10B981]/15"
                />
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: -45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4 }}
                  className="absolute left-1/2 -translate-x-1/2 -top-4 rounded-full px-3 py-1 bg-[#10B981] text-white text-[10px] font-bold font-mono shadow-sm flex items-center gap-1 w-max"
                >
                  <Sparkles size={10} />
                  <span>{burst.text} Reacts!</span>
                </motion.div>
              </div>
            ))}

            {/* Suggestions Bottom bar popup when an element is active (now contained with absolute position to prevent page layout jumps) */}
            <AnimatePresence>
              {selectedTileId && (() => {
                const activeTile = tiles.find(t => t.id === selectedTileId);
                if (!activeTile) return null;
                const suggestions = getSuggestionsForTile(activeTile.symbol);

                return (
                  <motion.div
                    id="sandbox-suggestions-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute bottom-4 left-4 right-4 z-40 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E5EA] shadow-lg flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-semibold uppercase tracking-wider">
                      <RefreshCw size={13} className="text-[#0071E3] animate-spin-[linear_3s_infinite]" />
                      <span>{t.reactionPartners} ➜ {activeTile.symbol} :</span>
                    </div>
                    
                    {suggestions.length === 0 ? (
                      <div className="text-xs text-[#86868B] italic">
                        No immediate known reaction triggers cataloged in basic database scope. Try combining K, Na, Ca, Fe, Al, Cu, Zn with O2, H2O, HCl, or NaOH.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto no-scrollbar pb-1">
                        {suggestions.map((pSymbol) => {
                          return (
                            <button
                              key={pSymbol}
                              id={`react-suggestion-btn-${pSymbol.toLowerCase()}`}
                              onClick={() => triggerReaction(activeTile.symbol, pSymbol)}
                              className="px-3.5 py-2 inline-flex items-center gap-1 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-xs text-gray-700 font-bold font-mono hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] hover:shadow-xs scale-1 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                              + {pSymbol}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION 2A-3: Persistent Detail Panel on Right Column */}
      <div className="col-span-1 lg:col-span-4">
        {selectedElement ? (
          <div className="bg-white border border-[#E5E5EA] rounded-3xl p-6 shadow-xs sticky top-20 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5EA]">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold font-mono px-4 py-2 rounded-2xl bg-[#F5F5F7] text-[#0071E3] border border-[#E5E5EA] shadow-inner">
                  {selectedElement.symbol}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">{selectedElement.name[currentLang]}</h4>
                  <span className="text-xs text-[#86868B] capitalize">
                    {categoryLabels[selectedElement.category][currentLang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Atomic Core Properties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#F5F5F7] rounded-2xl border border-[#E5E5EA]">
                <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1">{t.atomicMass}</div>
                <div className="text-xs font-bold font-mono text-[#1D1D1F]">{selectedElement.mass} u</div>
              </div>
              <div className="p-3 bg-[#F5F5F7] rounded-2xl border border-[#E5E5EA]">
                <div className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1">{t.valency}</div>
                <div className="text-xs font-bold font-mono text-[#1D1D1F]">
                  {selectedElement.valencies.join(', ')}
                </div>
              </div>
            </div>

            {/* Chemical reaction details */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-500" />
                  {t.oxides}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedElement.oxides.map((ox, index) => (
                    <span key={index} className="px-2.5 py-1 bg-amber-50/50 border border-amber-100 text-xs font-semibold font-mono text-amber-700 rounded-lg">
                      {ox}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={12} className="text-[#34C759]" />
                  {t.exampleSalts}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedElement.salts.map((salt, index) => (
                    <span key={index} className="px-2.5 py-1 bg-green-50/50 border border-green-100 text-xs font-semibold font-mono text-green-700 rounded-lg">
                      {salt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={12} className="text-purple-500" />
                  {t.hydroxide}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedElement.hydroxides.map((hyd, index) => (
                    <span key={index} className="px-2.5 py-1 bg-purple-50/50 border border-purple-100 text-xs font-semibold font-mono text-purple-700 rounded-lg">
                      {hyd}
                    </span>
                  ))}
                </div>
              </div>

              {selectedElement.acids && selectedElement.acids.length > 0 && (
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
                    🧪 {t.acidForm}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedElement.acids.map((acid, index) => (
                      <span key={index} className="px-2.5 py-1 bg-red-50/50 border border-red-100 text-xs font-semibold font-mono text-red-700 rounded-lg">
                        {acid}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Element Reaction Video */}
            <div className="mt-6 pt-6 border-t border-[#E5E5EA]">
              <div className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mb-2">
                {currentLang === 'ka' ? 'რეაქციის ვიდეო ნიმუში' : currentLang === 'ru' ? 'Видео химической реакции' : 'Selected Element Reaction'}
              </div>
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                <img
                  src="https://cdn.pixabay.com/animation/2025/05/11/22/44/22-44-22-451_512.gif"
                  alt="Iochem - Chemistry dynamic reactions visual"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              </div>
            </div>

            {/* Sandbox Addition trigger button */}
            <button
              id="drawer-add-sandbox-btn"
              onClick={() => {
                addElementToSandbox(selectedElement);
              }}
              className="w-full py-3 bg-[#0071E3] text-white rounded-2xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              Add to Physics Sandbox
              <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E5EA] rounded-3xl p-8 shadow-xs text-center text-gray-400 font-medium">
            Select an element from the system grid to explore detailed properties and reaction catalogs!
          </div>
        )}
      </div>

    </div>
  );
}
