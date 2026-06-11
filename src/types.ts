export type Language = 'en' | 'ka' | 'ru';

export interface TranslationDictionary {
  brand: string;
  tagline: string;
  settings: string;
  language: string;
  sectionInformational: string;
  sectionPlayground: string;
  tabOrganic: string;
  tabInorganic: string;
  wikipediaLink: string;
  youtubeExperiment: string;
  keyProperties: string;
  molecularStructure: string;
  interactivePeriodicTable: string;
  sandboxTitle: string;
  sandboxDesc: string;
  reactionPartners: string;
  dragHint: string;
  equationCompleter: string;
  equationPlaceholder: string;
  balanceBtn: string;
  cleanBtn: string;
  characteristicsTitle: string;
  formulaCreator: string;
  oxideCreator: string;
  saltCreator: string;
  baseCreator: string;
  calculateFormula: string;
  elementLabel: string;
  metalLabel: string;
  radicalLabel: string;
  generatedFormula: string;
  solubilityLabel: string;
  soluble: string;
  insoluble: string;
  atomicMass: string;
  valency: string;
  oxides: string;
  exampleSalts: string;
  hydroxide: string;
  acidForm: string;
  suggestedProducts: string;
  incorrectSubstance: string;
  fixBtn: string;
  suggestionChip: string;
  balancedResult: string;
}

export interface MoleculeModel {
  name: string;
  svgPath?: string;
  atoms: Array<{ type: 'C' | 'H' | 'O' | 'N' | 'P' | 'Cl' | 'S' | 'Fe' | 'Al' | 'K' | 'Na' | 'Ca' | 'Cu' | 'Zn'; x: number; y: number; size: number; color: string }>;
  bonds: Array<{ from: number; to: number; double?: boolean; triple?: boolean }>;
}

export interface ScienceCategory {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  wikipediaUrl: Record<Language, string>;
  youtubeVideoId: string;
  representativeMolecule: MoleculeModel;
  keyProperties: Record<Language, string[]>;
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: Record<Language, string>;
  mass: number;
  category: 'alkali' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' | 'metalloid' | 'reactive-nonmetal' | 'halogen' | 'noble-gas' | 'lanthanide' | 'actinide';
  valencies: number[];
  oxides: string[];
  salts: string[];
  hydroxides: string[];
  acids?: string[];
  row: number;
  col: number;
}

export interface SandboxTile {
  id: string;
  symbol: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}
