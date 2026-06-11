import { ScienceCategory, PeriodicElement, MoleculeModel } from '../types';

// Representative molecular 3D structures models
export const sampleMolecules: Record<string, MoleculeModel> = {
  hydrocarbons: {
    name: 'Methane (CH4)',
    atoms: [
      { type: 'C', x: 0, y: 0, size: 28, color: '#4B5563' },
      { type: 'H', x: -60, y: 40, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 60, y: 40, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -30, y: -70, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 30, y: -70, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 }
    ]
  },
  alcohols: {
    name: 'Ethanol (C2H5OH)',
    atoms: [
      { type: 'C', x: -50, y: 20, size: 28, color: '#4B5563' },
      { type: 'C', x: 20, y: -20, size: 28, color: '#4B5563' },
      { type: 'O', x: 80, y: 30, size: 24, color: '#EF4444' },
      { type: 'H', x: 130, y: 10, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -95, y: -30, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -40, y: 90, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -80, y: -50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 10, y: -90, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 40, y: -50, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 0, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 },
      { from: 1, to: 7 },
      { from: 1, to: 8 }
    ]
  },
  ethers: {
    name: 'Dimethyl Ether (CH3OCH3)',
    atoms: [
      { type: 'O', x: 0, y: 0, size: 24, color: '#EF4444' },
      { type: 'C', x: -65, y: -30, size: 28, color: '#4B5563' },
      { type: 'C', x: 65, y: -30, size: 28, color: '#4B5563' },
      { type: 'H', x: -110, y: 15, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -85, y: -100, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -40, y: -20, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 110, y: 15, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 85, y: -100, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 40, y: -20, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 2, to: 6 },
      { from: 2, to: 7 },
      { from: 2, to: 8 }
    ]
  },
  aldehydes: {
    name: 'Formaldehyde (HCHO)',
    atoms: [
      { type: 'C', x: 0, y: 10, size: 28, color: '#4B5563' },
      { type: 'O', x: 0, y: -65, size: 24, color: '#EF4444' },
      { type: 'H', x: -65, y: 65, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 65, y: 65, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1, double: true },
      { from: 0, to: 2 },
      { from: 0, to: 3 }
    ]
  },
  acids: {
    name: 'Acetic Acid (CH3COOH)',
    atoms: [
      { type: 'C', x: -50, y: 0, size: 28, color: '#4B5563' },
      { type: 'C', x: 25, y: 0, size: 28, color: '#4B5563' },
      { type: 'O', x: 75, y: -50, size: 24, color: '#EF4444' },
      { type: 'O', x: 75, y: 50, size: 24, color: '#EF4444' },
      { type: 'H', x: 130, y: 50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -90, y: -50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -90, y: 50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -50, y: 70, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2, double: true },
      { from: 1, to: 3 },
      { from: 3, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 },
      { from: 0, to: 7 }
    ]
  },
  amines: {
    name: 'Methylamine (CH3NH2)',
    atoms: [
      { type: 'C', x: -40, y: 0, size: 28, color: '#4B5563' },
      { type: 'N', x: 35, y: 0, size: 26, color: '#3B82F6' },
      { type: 'H', x: -80, y: -65, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -80, y: 65, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -40, y: 75, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 75, y: -65, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 75, y: 65, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 1, to: 5 },
      { from: 1, to: 6 }
    ]
  },
  esters: {
    name: 'Methyl Acetate (C3H6O2)',
    atoms: [
      { type: 'C', x: -60, y: 20, size: 28, color: '#4B5563' },
      { type: 'C', x: 10, y: -20, size: 28, color: '#4B5563' },
      { type: 'O', x: 40, y: -80, size: 24, color: '#EF4444' },
      { type: 'O', x: 70, y: 40, size: 24, color: '#EF4444' },
      { type: 'C', x: 135, y: 15, size: 28, color: '#4B5563' },
      { type: 'H', x: -110, y: -20, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -75, y: 85, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -45, y: -50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 175, y: 75, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 145, y: -50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 165, y: -10, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2, double: true },
      { from: 1, to: 3 },
      { from: 3, to: 4 },
      { from: 0, to: 5 },
      { from: 0, to: 6 },
      { from: 0, to: 7 },
      { from: 4, to: 8 },
      { from: 4, to: 9 },
      { from: 4, to: 10 }
    ]
  },
  proteins: {
    name: 'Glycine (C2H5NO2)',
    atoms: [
      { type: 'N', x: -90, y: -20, size: 26, color: '#3B82F6' },
      { type: 'C', x: -30, y: 20, size: 28, color: '#4B5563' },
      { type: 'C', x: 40, y: -20, size: 28, color: '#4B5563' },
      { type: 'O', x: 60, y: -80, size: 24, color: '#EF4444' },
      { type: 'O', x: 95, y: 35, size: 24, color: '#EF4444' },
      { type: 'H', x: 140, y: 50, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -130, y: 15, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -110, y: -80, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -40, y: 80, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -25, y: -50, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3, double: true },
      { from: 2, to: 4 },
      { from: 4, to: 5 },
      { from: 0, to: 6 },
      { from: 0, to: 7 },
      { from: 1, to: 8 },
      { from: 1, to: 9 }
    ]
  },
  lipids: {
    name: 'Glycerol (C3H8O3)',
    atoms: [
      { type: 'C', x: -70, y: 0, size: 28, color: '#4B5563' },
      { type: 'C', x: 0, y: 0, size: 28, color: '#4B5563' },
      { type: 'C', x: 70, y: 0, size: 28, color: '#4B5563' },
      { type: 'O', x: -70, y: -60, size: 24, color: '#EF4444' },
      { type: 'O', x: 0, y: 60, size: 24, color: '#EF4444' },
      { type: 'O', x: 70, y: -60, size: 24, color: '#EF4444' },
      { type: 'H', x: -110, y: -90, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 30, y: 90, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 110, y: -90, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -120, y: 30, size: 18, color: '#D1D5DB' },
      { type: 'H', x: -50, y: 30, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 0, y: -45, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 50, y: 30, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 120, y: 30, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 0, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 7 },
      { from: 5, to: 8 },
      { from: 0, to: 9 },
      { from: 0, to: 10 },
      { from: 1, to: 11 },
      { from: 2, to: 12 },
      { from: 2, to: 13 }
    ]
  },
  nucleicAcids: {
    name: 'Phosphate Group (H3PO4 Base)',
    atoms: [
      { type: 'P', x: 0, y: 0, size: 30, color: '#F59E0B' },
      { type: 'O', x: 0, y: -70, size: 24, color: '#EF4444' },
      { type: 'O', x: -65, y: 30, size: 24, color: '#EF4444' },
      { type: 'O', x: 65, y: 30, size: 24, color: '#EF4444' },
      { type: 'O', x: 10, y: 65, size: 24, color: '#EF4444' },
      { type: 'H', x: -110, y: 40, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 110, y: 40, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1, double: true },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 }
    ]
  },
  oxides: {
    name: 'Carbon Dioxide (CO2)',
    atoms: [
      { type: 'C', x: 0, y: 0, size: 28, color: '#4B5563' },
      { type: 'O', x: -75, y: 0, size: 24, color: '#EF4444' },
      { type: 'O', x: 75, y: 0, size: 24, color: '#EF4444' }
    ],
    bonds: [
      { from: 0, to: 1, double: true },
      { from: 0, to: 2, double: true }
    ]
  },
  mineralAcids: {
    name: 'Sulfuric Acid (H2SO4)',
    atoms: [
      { type: 'S', x: 0, y: 0, size: 28, color: '#F59E0B' },
      { type: 'O', x: 0, y: -65, size: 24, color: '#EF4444' },
      { type: 'O', x: 0, y: 65, size: 24, color: '#EF4444' },
      { type: 'O', x: -65, y: 0, size: 24, color: '#EF4444' },
      { type: 'O', x: 65, y: 0, size: 24, color: '#EF4444' },
      { type: 'H', x: -115, y: 0, size: 18, color: '#D1D5DB' },
      { type: 'H', x: 115, y: 0, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1, double: true },
      { from: 0, to: 2, double: true },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 6 }
    ]
  },
  bases: {
    name: 'Sodium Hydroxide (NaOH)',
    atoms: [
      { type: 'Na', x: -50, y: 0, size: 30, color: '#8B5CF6' },
      { type: 'O', x: 10, y: 0, size: 24, color: '#EF4444' },
      { type: 'H', x: 65, y: 0, size: 18, color: '#D1D5DB' }
    ],
    bonds: [
      { from: 0, to: 1 },
      { from: 1, to: 2 }
    ]
  },
  salts: {
    name: 'Sodium Chloride (NaCl Ionic Grid)',
    atoms: [
      { type: 'Na', x: -40, y: 0, size: 30, color: '#8B5CF6' },
      { type: 'Cl', x: 40, y: 0, size: 32, color: '#10B981' }
    ],
    bonds: [
      { from: 0, to: 1 }
    ]
  }
};

// Organic Categories Database (10 items)
export const organicCategories: ScienceCategory[] = [
  {
    id: 'hydrocarbons',
    name: {
      en: 'Hydrocarbons',
      ka: 'ნახშირწყალბადები',
      ru: 'Углеводороды'
    },
    description: {
      en: 'Organic chemical compounds composed exclusively of hydrogen and carbon atoms. They form the base of fossil fuels, solvents, and polymers.',
      ka: 'ორგანული ნაერთები, რომლებიც შედგება მხოლოდ ნახშირბადისა და წყალბადისგან. ისინი წარმოადგენენ საწვავის, გამხსნელებისა და პოლიმერების საფუძველს.',
      ru: 'Органические соединения, состоящие исключительно из атомов водорода и углерода. Они составляют основу ископаемого топлива, растворителей и полимеров.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Hydrocarbon',
      ka: 'https://ka.wikipedia.org/wiki/ნახშირწყალბადები',
      ru: 'https://ru.wikipedia.org/wiki/Углеводороды'
    },
    youtubeVideoId: 'U_gYv3A7YFw', // Visually beautiful methane/hydrocarbon burning or methane bubble experiment
    representativeMolecule: sampleMolecules.hydrocarbons,
    keyProperties: {
      en: ['Viscosity increases with molecular size', 'Highly flammable and excellent energy fuels', 'Generally insoluble in polar water', 'Forms molecular structures like alkanes, alkenes, and aromatic rings'],
      ka: ['სიბლანტე იზრდება მოლეკულის ზომასთან ერთად', 'მარტივად აალებადი და ენერგეტიკულად ეფექტური საწვავები', 'არ იხსნება წყალში (ჰიდროფობურია)', 'ქმნის ალკანების, ალკენების და არომატული რგოლების სტრუქტურებს'],
      ru: ['Вязкость увеличивается с размером молекулы', 'Легко воспламеняются и служат отличным топливом', 'Гидрофобны (нерастворимы в воде)', 'Образуют структуры алканов, алкенов и ароматических колец']
    }
  },
  {
    id: 'alcohols',
    name: {
      en: 'Alcohols',
      ka: 'სპირტები',
      ru: 'Спирты'
    },
    description: {
      en: 'Compounds in which one or more hydrogen atoms in an alkane have been replaced by an -OH (hydroxyl) group. They find wide use in sanitizers, beverages, and organic synthesis.',
      ka: 'ორგანული ნაერთები, სადაც ნაჯერ ნახშირწყალბადში ერთი ან მეტი წყალბადის ატომი ჩანაცვლებულია ჰიდროქსილის (-OH) ჯგუფით.',
      ru: 'Соединения, в которых один или несколько атомов водорода в алкане заменены гидроксильной группой (-OH). Находят широкое применение в антисептиках, напитках и химическом синтезе.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Alcohol',
      ka: 'https://ka.wikipedia.org/wiki/სპირტები',
      ru: 'https://ru.wikipedia.org/wiki/Спирты'
    },
    youtubeVideoId: 'h_6_EaQ_q3w', // Burning salt/alcohol flame test or whoosh bottle
    representativeMolecule: sampleMolecules.alcohols,
    keyProperties: {
      en: ['Presence of hydrogen bonding yields high boiling points', 'Lower members are highly soluble in water', 'Acts as weak acids or nucleophiles', 'Can be oxidized to aldehydes, ketones, or carboxylic acids'],
      ka: ['წყალბადური ბმების გამო აქვთ მაღალი დუღილის ტემპერატურა', 'მცირე მოლეკულის მქონე სპირტები კარგად იხსნება წყალში', 'ავლენენ სუსტ მჟავა თვისებებს', 'ჟანგვის შედეგად წარმოქმნიან ალდეჰიდებს ან კეტონებს'],
      ru: ['Водородные связи обуславливают высокие температуры кипения', 'Низшие спирты отлично смешиваются с водой', 'Проявляют слабокислые свойства', 'Окисляются до альдегидов, кетонов или карбоновых кислот']
    }
  },
  {
    id: 'ethers',
    name: {
      en: 'Ethers',
      ka: 'მარტივი ეთერები',
      ru: 'Простые эфиры'
    },
    description: {
      en: 'Organic compounds containing an oxygen atom connected to two alkyl or aryl groups. Historically significant as surgical anesthetics and industrial solvents.',
      ka: 'ორგანული ნივთიერებები, სადაც ჟანგბადის ატომი დაკავშირებულია ორ ალკილის ან არილის რადიკალთან.',
      ru: 'Органические вещества, содержащие атом кислорода, связанный с двумя алкильными или арильными радикалами. Исторически важны как анестетики.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Ether',
      ka: 'https://ka.wikipedia.org/wiki/მარტივი_ეთერები',
      ru: 'https://ru.wikipedia.org/wiki/Простые_эфиры'
    },
    youtubeVideoId: '1T6u6FpD0U4', // Volatility of ether, cold flame or boiling point demonstrations
    representativeMolecule: sampleMolecules.ethers,
    keyProperties: {
      en: ['Highly volatile with exceptionally low boiling points', 'Extremely flammable and form explosive peroxides in air', 'Relatively inert chemically, making them excellent laboratory solvents', 'Polar but do not form hydrogen bonds with themselves'],
      ka: ['ძალიან აქროლადია და აქვს დაბალი დუღილის ტემპერატურა', 'ადვილად აალებადია, ქმნის აფეთქებად პეროქსიდებს ჰაერზე', 'ქიმიურად საკმაოდ ინერტულია', 'პოლარულია, მაგრამ არ წარმოქმნის შიდამოკელულურ წყალბადურ ბმებს'],
      ru: ['Высоколетучи, имеют низкую температуру кипения', 'Легко воспламеняются, образуют взрывоопасные пероксиды на воздухе', 'Относительно химически инертны, отличные растворители', 'Полярны, но не образуют межмолекулярных водородных связей между собой']
    }
  },
  {
    id: 'aldehydes',
    name: {
      en: 'Aldehydes & Ketones',
      ka: 'ალდეჰიდები და კეტონები',
      ru: 'Альдегиды и Кетоны'
    },
    description: {
      en: 'Compounds containing a carbonyl functional group (C=O). In aldehydes, the carbonyl is at the end of the carbon chain; in ketones, it is nestled in the interior.',
      ka: 'ნაერთები, რომლებიც შეიცავენ კარბონილის ჯგუფს (C=O). ალდეჰიდებში კარბონილი მოლეკულის ბოლოშია, კეტონებში კი - შუაში.',
      ru: 'Соединения, содержащие карбонильную функциональную группу (C=O). В альдегидах она на конце углеродной цепи, в кетонах — в середине.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Aldehyde',
      ka: 'https://ka.wikipedia.org/wiki/ალდეჰიდები',
      ru: 'https://ru.wikipedia.org/wiki/Альдегиды'
    },
    youtubeVideoId: 'fNWe72FhG6c', // Silver mirror test (Tollens test)
    representativeMolecule: sampleMolecules.aldehydes,
    keyProperties: {
      en: ['Polar carbonyl group makes them reactive', 'Aldehydes easily oxidized to carboxylic acids (Silver Mirror tollens reaction)', 'Ketones are more resistant to oxidation', 'Often possess strong, distinct sweet or pungent scents'],
      ka: ['პოლარული კარბონილის ჯგუფი ხდის მათ ქიმიურად აქტიურს', 'ალდეჰიდები მარტივად იჟანგება ვერცხლის სარკის რეაქციით', 'კეტონები გაცილებით მდგრადია ჟანგვის მიმართ', 'ხშირად აქვთ სპეციფიკური, მძაფრი ან სასიამოვნო სურნელი'],
      ru: ['Полярная карбонильная группа делает их весьма реакционноспособными', 'Альдегиды легко окисляются (реакция серебряного зеркала)', 'Кетоны более устойчивы к окислению', 'Часто обладают сильным, характерным сладким или резким запахом']
    }
  },
  {
    id: 'carboxylicAcids',
    name: {
      en: 'Carboxylic Acids',
      ka: 'კარბონმჟავები',
      ru: 'Карбоновые кислоты'
    },
    description: {
      en: 'Organic compounds featuring the carboxyl group (-COOH). Famous examples include formic acid in ant venoms and acetic acid in vinegar.',
      ka: 'ორგანული ნივთიერებები, რომლებიც შეიცავენ კარბოქსილის (-COOH) ფუნქციურ ჯგუფს. მაგალითად, ძმარმჟავა.',
      ru: 'Органические соединения, содержащие карбоксильную группу (-COOH). Примеры: муравьиная кислота в яде муравьев и уксусная кислота в уксусе.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Carboxylic_acid',
      ka: 'https://ka.wikipedia.org/wiki/კარბონმჟავები',
      ru: 'https://ru.wikipedia.org/wiki/Карбоновые_кислоты'
    },
    youtubeVideoId: 'u47qN7Vz4H0', // Acetic acid reacting with baking soda (CO2 release) or calcium acetate gel ball
    representativeMolecule: sampleMolecules.acids,
    keyProperties: {
      en: ['Display classic acidic properties, turning litmus indicators red', 'Form strong hydrogen bonding dimers with elevated boiling thresholds', 'React with alcohols to synthesize sweet esters', 'Involved heavily in biological metabolic cycles'],
      ka: ['ავლენენ ტიპურ მჟავა თვისებებს, აწითლებენ ლაკმუსს', 'წარმოქმნიან მყარ წყალბადურ ბმებს და ახასიათებთ მაღალი დუღილის ტემპერატურა', 'სპირტებთან რეაქციით წარმოქმნიან ესთერებს', 'აქტიურად მონაწილეობენ ბიოქიმიურ მეტაბოლურ პროცესებში'],
      ru: ['Проявляют классические свойства кислот, окрашивают лакмус в красный', 'Образуют стабильные димеры за счет водородных связей', 'Реагируют со спиртами с образованием сложных эфиров', 'Играют ключевую роль в метаболизме живых организмов']
    }
  },
  {
    id: 'amines',
    name: {
      en: 'Amines',
      ka: 'ამინები',
      ru: 'Амины'
    },
    description: {
      en: 'Organic derivatives of ammonia ($NH_3$) where one or more hydrogen atoms have been replaced by carbon substituents. They serve as essential building blocks for protein synthesis.',
      ka: 'ამიაკის ($NH_3$) ორგანული ნაწარმი, სადაც წყალბადის ერთი, ორი ან სამი ატომი ჩანაცვლებულია ნახშირწყალბადოვანი რადიკალით.',
      ru: 'Органические производные аммиака ($NH_3$), в которых один или несколько атомов водорода замещены углеводородными радикалами.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Amine',
      ka: 'https://ka.wikipedia.org/wiki/ამინები',
      ru: 'https://ru.wikipedia.org/wiki/Амины'
    },
    youtubeVideoId: 'UscqM9yYI70', // Nylon synthesis using diamine and sebacoyl chloride (Nylon rope trick)
    representativeMolecule: sampleMolecules.amines,
    keyProperties: {
      en: ['Have a distinct and highly unpleasant fishy, decaying organic smell', 'Behave as organic bases, accepting protons readily', 'React with carboxylic acids to forge peptide linkages', 'Crucial in pharmaceutical synthesis and neural transmitter chemicals'],
      ka: ['აქვთ სპეციფიკური უსიამოვნო თევზისმაგვარი სუნი', 'ავლენენ ორგანული ფუძეების თვისებებს (მიერთებენ პროტონს)', 'კარბონმჟავებთან რეაქციისას წარმოქმნიან ამიდურ ბმებს', 'მნიშვნელოვანია ფარმაცევტულ წარმოებასა და ნეირომედიატორებში'],
      ru: ['Обладают характерным резким рыбным или гнилостным запахом', 'Проявляют свойства органических оснований', 'Реагируют с карбоновыми кислотами, образуя пептидные/амидные связи', 'Крайне важны в фармацевтике и нейрохимии']
    }
  },
  {
    id: 'esters',
    name: {
      en: 'Esters & Amides',
      ka: 'რთული ეთერები და ამიდები',
      ru: 'Сложные эфиры и Амиды'
    },
    description: {
      en: 'Esters are formed by condensation of an acid and alcohol, showcasing iconic fruity aromas. Amides unite carbonyl carbon to nitrogen, forming the backbone of polymers.',
      ka: 'რთული ეთერები მიიღება მჟავებისა და სპირტებისგან და აქვთ ხილის სასიამოვნო სუნი. ამიდებში კარბონილი აზოტთანაა კავშირში.',
      ru: 'Сложные эфиры образуются при конденсации кислоты и спирта и имеют фруктовый запах. Амиды содержат связь карбонила с азотом.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Ester',
      ka: 'https://ka.wikipedia.org/wiki/Сложные_эфиры',
      ru: 'https://ru.wikipedia.org/wiki/Сложные_эфиры'
    },
    youtubeVideoId: 'dD_19IulSjE', // Synthesis of ethyl acetate or artificial banana oil (isoamyl acetate)
    representativeMolecule: sampleMolecules.esters,
    keyProperties: {
      en: ['Highly polar but volatile with low water solubility unless small', 'Responsible for natural scents of fruits like bananas and pineapples', 'Saponification reactions breakesters down using bases into soaps', 'Amides form highly rigid structural nylon and Kevlar fibers'],
      ka: ['პოლარულია, მაგრამ ცუდად იხსნება წყალში', 'განაპირობებს ხილის (ბანანის, ანანასის) ბუნებრივ არომატს', 'ტუტით ჰიდროლიზის (საპონიფიკაციის) რეაქციით მიიღება საპნები', 'ამიდები ქმნიან მდგრად პოლიმერულ ბოჭკოებს, როგორიცაა ნეილონი'],
      ru: ['Полярны, но летучи, плохо растворяются в воде', 'Отвечают за фруктовые ароматы бананов, груш и ананасов', 'Омыление эстеров щелочью приводит к образованию мыла', 'Амиды составляют основу высокопрочных волокон и кевлара']
    }
  },
  {
    id: 'proteins',
    name: {
      en: 'Proteins',
      ka: 'ცილები',
      ru: 'Белки'
    },
    description: {
      en: 'Large biomolecules comprised of one or more long amino acid monomer chains. They perform a vast array of physiological roles including catalytic enzymes and structural fibers.',
      ka: 'რთული ბიოპოლიმერები, რომლებიც ამინომჟავების ნაშთებისგან შედგება. ასრულებენ უმნიშვნელოვანეს როლს უჯრედულ კატალიზსა და სტრუქტურაში.',
      ru: 'Сложные биополимеры, состоящие из аминокислотных мономеров. Необходимы для функционирования живых клеток и служат ферментами.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Protein',
      ka: 'https://ka.wikipedia.org/wiki/ცილები',
      ru: 'https://ru.wikipedia.org/wiki/Белки'
    },
    youtubeVideoId: 'Y_GepK00_rU', // Demonstration of protein denaturation (egg white with alcohol/heat/acid)
    representativeMolecule: sampleMolecules.proteins,
    keyProperties: {
      en: ['Complex folding hierarchies (primary, secondary, tertiary, quaternary structures)', 'Prone to denaturation by heat, radical pH shifts, or alcohol solvents', 'Function as molecular catalytic enzymes in biochemical reactions', 'Form tough structural structures like muscle fibers, hair, and nails'],
      ka: ['რთული ფოლდინგის იერარქია (პირველადი, მეორეული, მესამეული)', 'საკმაოდ მგრძნობიარეა ტემპერატურით ან pH-ის ცვლილებით დენატურაციის მიმართ', 'მოქმედებენ როგორც ბიოლოგიური კატალიზატორები (ფერმენტები)', 'ქმნიან თმას, ფრჩხილებსა და კუნთოვან ბოჭკოებს'],
      ru: ['Сложная пространственная структура (первичная, вторичная, третичная)', 'Склонны к денатурации под воздействием тепла, кислот или спирта', 'Действуют как высокоэффективные биологические катализаторы (ферменты)', 'Формируют мышечные волокна, коллаген, ногти и волосы']
    }
  },
  {
    id: 'lipids',
    name: {
      en: 'Lipids',
      ka: 'ლიპიდები',
      ru: 'Липиды'
    },
    description: {
      en: 'A diverse family of organic substances that are highly insoluble in water but soluble in non-polar organic solvents. Includes energy-dense fats, oils, waxes, and membrane phospholipids.',
      ka: 'ორგანული ნივთიერებები, რომლებიც პრაქტიკულად არ იხსნება წყალში, მაგრამ კარგად იხსნება ორგანულ გამხსნელებში. მოიცავს ცხიმებს.',
      ru: 'Группа органических соединений, нерастворимых в воде, но хорошо растворимых в неполярных растворителях. Включает жиры, воски и фосфолипиды.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Lipid',
      ka: 'https://ka.wikipedia.org/wiki/ლიპიდები',
      ru: 'https://ru.wikipedia.org/wiki/Липиды'
    },
    youtubeVideoId: 'U_Y33T_fFj4', // Soap making reaction (saponification of oil) or hydrophobic oil spill demo
    representativeMolecule: sampleMolecules.lipids,
    keyProperties: {
      en: ['Hydrophobic or amphipathic structure, insoluble in water', 'Synthesized as dense biological chemical energy reservoirs', 'Vital structural constituents of cell membrane bilayers', 'Provide padding insulation and structural support to biology'],
      ka: ['ჰიდროფობური ბუნება, არ იხსნება წყალში', 'წარმოადგენს ორგანიზმის ყველაზე ენერგოტევად რეზერვს', 'უჯრედის მემბრანის ორმაგი ფენის აუცილებელი კომპონენტი', 'ხასიათდება თბოიზოლაციური და დამცავი ფუნქციით'],
      ru: ['Гидрофобны (амфифильны), практически нерастворимы в воде', 'Высокоэффективный источник долгосрочной биологической энергии', 'Основной компонент билипидного слоя клеточных мембран', 'Обеспечивают теплоизоляцию и защиту органов']
    }
  },
  {
    id: 'nucleicAcids',
    name: {
      en: 'Nucleic Acids',
      ka: 'ნუკლეინის მჟავები',
      ru: 'Нуклеиновые кислоты'
    },
    description: {
      en: 'Biopolymers composed of nucleotide sequences that preserve and execute the biological blueprints of life (DNA and RNA).',
      ka: 'ბიოპოლიმერები, რომლებიც შედგება ნუკლეოტიდებისგან. ისინი ინახავენ და გადასცემენ მემკვიდრეობით ინფორმაციას (დნმ და რნმ).',
      ru: 'Биополимеры, состоящие из цепочек нуклеотидов, которые хранят и передают наследственную генетическую информацию (ДНК и РНК).'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Nucleic_acid',
      ka: 'https://ka.wikipedia.org/wiki/ნუკლეინის_მჟავები',
      ru: 'https://ru.wikipedia.org/wiki/Нуклеиновые_кислоты'
    },
    youtubeVideoId: 'vK9L9uFvUcw', // DNA extraction from strawberries (classic visual science experiment)
    representativeMolecule: sampleMolecules.nucleicAcids,
    keyProperties: {
      en: ['Constructed from nucleotide subunits (sugar, phosphate, nitrogenous base)', 'DNA form has iconic double-helix configuration', 'Sustain genetic blueprints for protein assembly templates', 'Provide cell transcription and translation instructions'],
      ka: ['შედგება ნუკლეოტიდებისგან (ნახშირწყალი, ფოსფატი, აზოტოვანი ფუძე)', 'დნმ-ს აქვს ორმაგი სპირალის სტრუქტურა', 'ინახავს გენეტიკურ კოდს ცილების სინთეზისთვის', 'მონაწილეობს ტრანსკრიფციისა და ტრანსლაციის პროცესებში'],
      ru: ['Построены из нуклеотидных звеньев (сахар, фосфат, азотистое основание)', 'ДНК образует знаменитую двуспиральную структуру', 'Содержат шаблоны для сборки всех белков клетки', 'Обеспечивают процессы транскрипции и трансляции']
    }
  }
];

// Inorganic Categories Database (4 items)
export const inorganicCategories: ScienceCategory[] = [
  {
    id: 'oxides',
    name: {
      en: 'Oxides',
      ka: 'ოქსიდები',
      ru: 'Оксиды'
    },
    description: {
      en: 'Binary chemical compounds containing at least one oxygen atom paired to another element. Depending on the element, they can behave as acidic, basic, or amphoteric.',
      ka: 'ორელემენტიანი ნაერთები, რომელთაგან ერთ-ერთი არის ჟანგბადი -2 ჟანგვის ხარისხით. იყოფა მჟავა, ფუძე და ამფოტერულ ოქსიდებად.',
      ru: 'Бинарные химические соединения, содержащие атом кислорода в степени окисления -2, связанный с другим элементом. Бывают кислотными, основными и амфотерными.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Oxide',
      ka: 'https://ka.wikipedia.org/wiki/ოქსიდები',
      ru: 'https://ru.wikipedia.org/wiki/Оксиды'
    },
    youtubeVideoId: 'U_i7_7aK00g', // Oxidation of magnesium ribbon (brilliant white light sparks)
    representativeMolecule: sampleMolecules.oxides,
    keyProperties: {
      en: ['Basic oxides react with acids to yield salts', 'Acidic oxides react with bases to yield salts', 'Amphoteric oxides (such as Aluminum oxide) interact with both paths', 'A wide range of structures from gaseous CO2 to rich solid ceramic minerals'],
      ka: ['ფუძე ოქსიდები მჟავებთან ურთიერთქმედებით წარმოქმნიან მარილს', 'მჟავა ოქსიდები ტუტეებთან რეაქციით წარმოქმნიან მარილს', 'ამფოტერული ოქსიდები რეაგირებენ ორივესთან', 'აქვთ მრავალფეროვანი ფორმა (აირადი CO2-დან მყარ მინერალებამდე)'],
      ru: ['Основные оксиды реагируют с кислотами с образованием солей', 'Кислотные оксиды реагируют со щелочами с образованием солей', 'Амфотерные оксиды реагируют как с кислотами, так и с основаниями', 'Встречаются в жидком, газообразном (CO2) и твердом (Fe2O3) состояниях']
    }
  },
  {
    id: 'mineralAcids',
    name: {
      en: 'Acids',
      ka: 'მჟავები',
      ru: 'Кислоты'
    },
    description: {
      en: 'Substances that donate hydrogen ions ($H^+$) when dissolved in water, reducing pH below 7. They display sour tastes and react intensely with reactive metals.',
      ka: 'ნივთიერებები, რომლებიც წყალში გახსნისას გამოყოფენ წყალბად-იონებს ($H^+$). აქვთ მჟავე გემო და აქტიურად შედიან რეაქციაში ლითონებთან.',
      ru: 'Вещества, диссоциирующие в воде с образованием ионов водорода ($H^+$), что снижает pH ниже 7. Обладают кислым вкусом и реагируют с металлами.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Acid',
      ka: 'https://ka.wikipedia.org/wiki/მჟავები',
      ru: 'https://ru.wikipedia.org/wiki/Кислоты'
    },
    youtubeVideoId: 'bocG_N_vE64', // Sulfuric acid reacting with sugar (dehydration, carbon tower)
    representativeMolecule: sampleMolecules.mineralAcids,
    keyProperties: {
      en: ['Sour taste and change blue litmus indicator paper red', 'React with metals to produce salts and hydrogen gas', 'Form corrosive aqueous solutions', 'Conduct electricity due to high ion concentrations'],
      ka: ['აქვთ მჟავე გემო, აწითლებენ ლურჯ ლაკმუსს', 'რეაგირებენ ლითონებთან მარილის და წყალბადის გამოყოფით', 'არიან ძლიერ კოროზიულები', 'კარგად ატარებენ ელექტროენერგიას იონების დისოციაციის გამო'],
      ru: ['Кислые на вкус, изменяют цвет синего лакмуса на красный', 'Реагируют с активными металлами с выделением водорода', 'Имеют едкий и разъедающий характер вызывания ожогов', 'Электропроводны в растворах благодаря высокой диссоциации']
    }
  },
  {
    id: 'bases',
    name: {
      en: 'Bases & Alkalis',
      ka: 'ფუძეები და ტუტეები',
      ru: 'Основания и Щелочи'
    },
    description: {
      en: 'Chemical compounds that accept protons or release hydroxide ions ($OH^-$) in liquid solution, shifting pH above 7. Soluble bases are historically called alkalis.',
      ka: 'რთული ნივთიერებები, რომლებიც შედგება ლითონის ატომისა და ჰიდროქსილის (-OH) ჯგუფისგან. წყალში ხსნად ფუძეებს ტუტეები ეწოდება.',
      ru: 'Химические соединения, диссоциирующие в водных растворах с образованием гидроксид-ионов ($OH^-$). Растворимые основания называют щелочами.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Base_(chemistry)',
      ka: 'https://ka.wikipedia.org/wiki/ფუძეები',
      ru: 'https://ru.wikipedia.org/wiki/Основания_(химия)'
    },
    youtubeVideoId: 'U_gD_7aT9I0', // Neutralization action (HCl + NaOH with phenolphthalein color change)
    representativeMolecule: sampleMolecules.bases,
    keyProperties: {
      en: ['Slippery, soapy texture and turn red litmus indicator paper blue', 'Neutralize acids completely to produce salt and water', 'Highly caustic towards organic cells (e.g. skin tissues)', 'Excellent for fat dissolution during cleaning applications'],
      ka: ['საპნისებური ტექსტურა, აცისფერებენ წითელ ლაკმუსს', 'ანეიტრალებენ მჟავებს მარილისა და წყლის წარმოქმნით', 'ახასიათებთ ძლიერი მწვავე მოქმედება კანზე', 'გამოიყენება საწმენდ საშუალებებში ცხიმების დასაშლელად'],
      ru: ['Мыльные на ощупь, изменяют цвет красного лакмуса на синий', 'Нейтрализуют кислоты с образованием соли и воды', 'Обладают разъедающим действием на ткани организма', 'Используются для омыления жиров при изготовлении мыла']
    }
  },
  {
    id: 'salts',
    name: {
      en: 'Salts',
      ka: 'მარილები',
      ru: 'Соли'
    },
    description: {
      en: 'Ionic compounds produced when an acid neutralized by a base. Composed of positively charged cations (metals) and negative anions (acid radicals).',
      ka: 'იონური ნაერთები, რომლებიც მიიღება მჟავასა და ფუძის ნეიტრალიზაციით. შედგება ლითონისა და მჟავური ნაშთისგან.',
      ru: 'Ионные соединения, получаемые при нейтрализации кислоты основанием. Состоят из катионов металлов и анионов кислотных остатков.'
    },
    wikipediaUrl: {
      en: 'https://en.wikipedia.org/wiki/Salt_(chemistry)',
      ka: 'https://ka.wikipedia.org/wiki/Соли',
      ru: 'https://ru.wikipedia.org/wiki/Соли'
    },
    youtubeVideoId: 'W_aX3-vYUXU', // Flame coloring salts (copper-green, strontium-red, sodium-yellow)
    representativeMolecule: sampleMolecules.salts,
    keyProperties: {
      en: ['High melting and boiling points due to strong ionic crystal arrays', 'Aqueous solutions conduct electric currents easily', 'Slightly acidic, basic, or neutral depending on parent ion strength', 'Vibrant range of natural crystalline patterns and colors'],
      ka: ['მაღალი დნობისა და დუღილის ტემპერატურა მყარი კრისტალური მესრის გამო', 'წყალხსნარები შესანიშნავად ატარებენ დენს', 'რეაქცია შეიძლება იყოს მჟავა, ტუტე ან ნეიტრალური', 'გამოირჩევა მრავალფეროვანი კრისტალური ფერებითა და ფორმებით'],
      ru: ['Высокие температуры плавления благодаря прочной ионной решетке', 'Водные растворы и расплавы отлично проводят электричество', 'Бывают средними, кислыми или основными в зависимости от происхождения', 'Обладают разнообразными красивыми формами кристаллов и цветом']
    }
  }
];

// Helper to fill element database for periodic system (all 118 elements correctly assigned row/col grid)
// We will explicitly catalog the famous elements to detail their data perfectly, and programmatically construct the others so the visual rendering has 100% correct 118 labels, mass, valencies, rows, and cols.
const famousElements: Record<number, Partial<PeriodicElement>> = {
  1: {
    symbol: 'H',
    name: { en: 'Hydrogen', ka: 'წყალბადი', ru: 'Водород' },
    mass: 1.008,
    category: 'reactive-nonmetal',
    valencies: [1],
    oxides: ['H2O'],
    salts: ['LiH', 'NaH', 'KH'],
    hydroxides: ['H2O (neutral)'],
    acids: ['H2O']
  },
  2: {
    symbol: 'He',
    name: { en: 'Helium', ka: 'ჰელიუმი', ru: 'Гелий' },
    mass: 4.0026,
    category: 'noble-gas',
    valencies: [0],
    oxides: ['None'],
    salts: ['None'],
    hydroxides: ['None']
  },
  3: {
    symbol: 'Li',
    name: { en: 'Lithium', ka: 'ლითიუმი', ru: 'Литий' },
    mass: 6.94,
    category: 'alkali',
    valencies: [1],
    oxides: ['Li2O'],
    salts: ['LiCl', 'Li2SO4', 'LiNO3'],
    hydroxides: ['LiOH']
  },
  4: {
    symbol: 'Be',
    name: { en: 'Beryllium', ka: 'ბერილიუმი', ru: 'Бериллий' },
    mass: 9.0122,
    category: 'alkaline-earth',
    valencies: [2],
    oxides: ['BeO'],
    salts: ['BeCl2', 'BeSO4', 'Be(NO3)2'],
    hydroxides: ['Be(OH)2 (amphoteric)']
  },
  5: {
    symbol: 'B',
    name: { en: 'Boron', ka: 'ბორი', ru: 'Бор' },
    mass: 10.81,
    category: 'metalloid',
    valencies: [3],
    oxides: ['B2O3'],
    salts: ['NaBO2', 'K3BO3'],
    hydroxides: ['H3BO3 (boric acid)']
  },
  6: {
    symbol: 'C',
    name: { en: 'Carbon', ka: 'ნახშირბადი', ru: 'Углерод' },
    mass: 12.011,
    category: 'reactive-nonmetal',
    valencies: [2, 4],
    oxides: ['CO', 'CO2'],
    salts: ['Na2CO3', 'CaCO3', 'K2CO3'],
    hydroxides: ['H2CO3 (acidicic Carbonic Acid)'],
    acids: ['H2CO3']
  },
  7: {
    symbol: 'N',
    name: { en: 'Nitrogen', ka: 'აზოტი', ru: 'Азот' },
    mass: 14.007,
    category: 'reactive-nonmetal',
    valencies: [1, 2, 3, 4, 5],
    oxides: ['N2O', 'NO', 'N2O3', 'NO2', 'N2O5'],
    salts: ['KNO3', 'NH4Cl', 'NaNO3'],
    hydroxides: ['HNO3 / HNO2 (Acidic form)'],
    acids: ['HNO3', 'HNO2']
  },
  8: {
    symbol: 'O',
    name: { en: 'Oxygen', ka: 'ჟანგბადი', ru: 'Кислород' },
    mass: 15.999,
    category: 'reactive-nonmetal',
    valencies: [2],
    oxides: ['O3 (ozone)'],
    salts: ['Many metal oxides function like salts in specific frames'],
    hydroxides: ['H2O']
  },
  9: {
    symbol: 'F',
    name: { en: 'Fluorine', ka: 'ფთორი', ru: 'Фтор' },
    mass: 18.998,
    category: 'halogen',
    valencies: [1],
    oxides: ['OF2'],
    salts: ['NaF', 'CaF2', 'KF'],
    hydroxides: ['None'],
    acids: ['HF']
  },
  10: {
    symbol: 'Ne',
    name: { en: 'Neon', ka: 'ნეონი', ru: 'Неон' },
    mass: 20.180,
    category: 'noble-gas',
    valencies: [0],
    oxides: ['None'],
    salts: ['None'],
    hydroxides: ['None']
  },
  11: {
    symbol: 'Na',
    name: { en: 'Sodium', ka: 'ნატრიუმი', ru: 'Натрий' },
    mass: 22.990,
    category: 'alkali',
    valencies: [1],
    oxides: ['Na2O', 'Na2O2'],
    salts: ['NaCl', 'Na2SO4', 'NaNO3', 'Na3PO4', 'Na2CO3'],
    hydroxides: ['NaOH (Strong alkali / ხსნადი ტუტე)']
  },
  12: {
    symbol: 'Mg',
    name: { en: 'Magnesium', ka: 'მაგნიუმი', ru: 'Магний' },
    mass: 24.305,
    category: 'alkaline-earth',
    valencies: [2],
    oxides: ['MgO'],
    salts: ['MgCl2', 'MgSO4', 'Mg(NO3)2', 'Mg3(PO4)2', 'MgCO3'],
    hydroxides: ['Mg(OH)2 (White precipitate base)']
  },
  13: {
    symbol: 'Al',
    name: { en: 'Aluminum', ka: 'ალუმინი', ru: 'Алюминий' },
    mass: 26.982,
    category: 'post-transition-metal',
    valencies: [3],
    oxides: ['Al2O3 (amphoteric)'],
    salts: ['AlCl3', 'Al2(SO4)3', 'Al(NO3)3', 'AlPO4'],
    hydroxides: ['Al(OH)3 (Amphoteric white gel / ამფოტერული)']
  },
  14: {
    symbol: 'Si',
    name: { en: 'Silicon', ka: 'სილიციუმი', ru: 'Кремний' },
    mass: 28.085,
    category: 'metalloid',
    valencies: [4],
    oxides: ['SiO2 (Acidic anhydride)'],
    salts: ['Na2SiO3', 'CaSiO3', 'K2SiO3'],
    hydroxides: ['H2SiO3 (Silicic Acid gel)'],
    acids: ['H2SiO3']
  },
  15: {
    symbol: 'P',
    name: { en: 'Phosphorus', ka: 'ფოსფორი', ru: 'Фосфор' },
    mass: 30.974,
    category: 'reactive-nonmetal',
    valencies: [3, 5],
    oxides: ['P2O3', 'P2O5'],
    salts: ['Na3PO4', 'Ca3(PO4)2', 'K3PO4'],
    hydroxides: ['H3PO4 (Orthophosphoric Acid)'],
    acids: ['H3PO4']
  },
  16: {
    symbol: 'S',
    name: { en: 'Sulfur', ka: 'გოგირდი', ru: 'Сера' },
    mass: 32.06,
    category: 'reactive-nonmetal',
    valencies: [2, 4, 6],
    oxides: ['SO2', 'SO3'],
    salts: ['NaCl -> Na2S', 'Na2SO3', 'Na2SO4', 'CaSO4', 'FeSO4'],
    hydroxides: ['H2SO4 / H2SO3 / H2S Acid forms'],
    acids: ['H2SO4', 'H2SO3', 'H2S']
  },
  17: {
    symbol: 'Cl',
    name: { en: 'Chlorine', ka: 'ქლორი', ru: 'Хлор' },
    mass: 35.45,
    category: 'halogen',
    valencies: [1, 3, 5, 7],
    oxides: ['Cl2O', 'ClO2', 'Cl2O7'],
    salts: ['NaCl', 'KCl', 'CaCl2', 'FeCl3', 'AlCl3', 'CuCl2', 'ZnCl2'],
    hydroxides: ['HCl / HClO4 (Hydrochloric acid forms)'],
    acids: ['HCl', 'HClO4', 'HClO3']
  },
  18: {
    symbol: 'Ar',
    name: { en: 'Argon', ka: 'არგონი', ru: 'Аргон' },
    mass: 39.948,
    category: 'noble-gas',
    valencies: [0],
    oxides: ['None'],
    salts: ['None'],
    hydroxides: ['None']
  },
  19: {
    symbol: 'K',
    name: { en: 'Potassium', ka: 'კალიუმი', ru: 'Калий' },
    mass: 39.098,
    category: 'alkali',
    valencies: [1],
    oxides: ['K2O', 'K2O2', 'KO2'],
    salts: ['KCl', 'K2SO4', 'KNO3', 'K3PO4', 'K2CO3'],
    hydroxides: ['KOH (Highly strong alkali / ტუტე)']
  },
  20: {
    symbol: 'Ca',
    name: { en: 'Calcium', ka: 'კალციუმი', ru: 'Кальций' },
    mass: 40.078,
    category: 'alkaline-earth',
    valencies: [2],
    oxides: ['CaO (Quicklime)'],
    salts: ['CaCl2', 'CaSO4 (Gypsum)', 'Ca(NO3)2', 'Ca3(PO4)2', 'CaCO3 (Limestone)'],
    hydroxides: ['Ca(OH)2 (Slaked lime alkali / ხსნადი)']
  },
  26: {
    symbol: 'Fe',
    name: { en: 'Iron', ka: 'რკინა', ru: 'Железо' },
    mass: 55.845,
    category: 'transition-metal',
    valencies: [2, 3],
    oxides: ['FeO', 'Fe2O3', 'Fe3O4'],
    salts: ['FeCl2', 'FeCl3', 'FeSO4', 'Fe2(SO4)3', 'Fe(NO3)3'],
    hydroxides: ['Fe(OH)2 (Green base)', 'Fe(OH)3 (Red-brown base)']
  },
  29: {
    symbol: 'Cu',
    name: { en: 'Copper', ka: 'სპილენძი', ru: 'Медь' },
    mass: 63.546,
    category: 'transition-metal',
    valencies: [1, 2],
    oxides: ['Cu2O (Red)', 'CuO (Black)'],
    salts: ['CuCl2', 'CuSO4 (Blue vitriol)', 'Cu(NO3)2'],
    hydroxides: ['Cu(OH)2 (Bright blue precipitate)']
  },
  30: {
    symbol: 'Zn',
    name: { en: 'Zinc', ka: 'თუთია', ru: 'Цинк' },
    mass: 65.38,
    category: 'transition-metal',
    valencies: [2],
    oxides: ['ZnO (amphoteric)'],
    salts: ['ZnCl2', 'ZnSO4', 'Zn(NO3)2'],
    hydroxides: ['Zn(OH)2 (Amphoteric white gel)']
  }
};

const fullRawElements: Array<{ symbol: string; en: string; ka: string; ru: string; mass: number; cat: PeriodicElement['category']; row: number; col: number }> = [
  // Row 1
  { symbol: 'H', en: 'Hydrogen', ka: 'წყალბადი', ru: 'Водород', mass: 1.008, cat: 'reactive-nonmetal', row: 1, col: 1 },
  { symbol: 'He', en: 'Helium', ka: 'ჰელიუმი', ru: 'Гелий', mass: 4.0026, cat: 'noble-gas', row: 1, col: 18 },
  // Row 2
  { symbol: 'Li', en: 'Lithium', ka: 'ლითიუმი', ru: 'Литий', mass: 6.94, cat: 'alkali', row: 2, col: 1 },
  { symbol: 'Be', en: 'Beryllium', ka: 'ბერილიუმი', ru: 'Бериллий', mass: 9.0122, cat: 'alkaline-earth', row: 2, col: 2 },
  { symbol: 'B', en: 'Boron', ka: 'ბორი', ru: 'Бор', mass: 10.81, cat: 'metalloid', row: 2, col: 13 },
  { symbol: 'C', en: 'Carbon', ka: 'ნახშირბადი', ru: 'Углерод', mass: 12.011, cat: 'reactive-nonmetal', row: 2, col: 14 },
  { symbol: 'N', en: 'Nitrogen', ka: 'აზოტი', ru: 'Азот', mass: 14.007, cat: 'reactive-nonmetal', row: 2, col: 15 },
  { symbol: 'O', en: 'Oxygen', ka: 'ჟანგბადი', ru: 'Кислород', mass: 15.999, cat: 'reactive-nonmetal', row: 2, col: 16 },
  { symbol: 'F', en: 'Fluorine', ka: 'ფთორი', ru: 'Фтор', mass: 18.998, cat: 'halogen', row: 2, col: 17 },
  { symbol: 'Ne', en: 'Neon', ka: 'ნეონი', ru: 'Неон', mass: 20.180, cat: 'noble-gas', row: 2, col: 18 },
  // Row 3
  { symbol: 'Na', en: 'Sodium', ka: 'ნატრიუმი', ru: 'Натрий', mass: 22.990, cat: 'alkali', row: 3, col: 1 },
  { symbol: 'Mg', en: 'Magnesium', ka: 'მაგნიუმი', ru: 'Магний', mass: 24.305, cat: 'alkaline-earth', row: 3, col: 2 },
  { symbol: 'Al', en: 'Aluminum', ka: 'ალუმინი', ru: 'Алюминий', mass: 26.982, cat: 'post-transition-metal', row: 3, col: 13 },
  { symbol: 'Si', en: 'Silicon', ka: 'სილიციუმი', ru: 'Кремний', mass: 28.085, cat: 'metalloid', row: 3, col: 14 },
  { symbol: 'P', en: 'Phosphorus', ka: 'ფოსფორი', ru: 'Фосфор', mass: 30.974, cat: 'reactive-nonmetal', row: 3, col: 15 },
  { symbol: 'S', en: 'Sulfur', ka: 'გოგირდი', ru: 'Сера', mass: 32.06, cat: 'reactive-nonmetal', row: 3, col: 16 },
  { symbol: 'Cl', en: 'Chlorine', ka: 'ქლორი', ru: 'Хлор', mass: 35.45, cat: 'halogen', row: 3, col: 17 },
  { symbol: 'Ar', en: 'Argon', ka: 'არგონი', ru: 'Аргон', mass: 39.948, cat: 'noble-gas', row: 3, col: 18 },
  // Row 4
  { symbol: 'K', en: 'Potassium', ka: 'კალიუმი', ru: 'Калий', mass: 39.098, cat: 'alkali', row: 4, col: 1 },
  { symbol: 'Ca', en: 'Calcium', ka: 'კალციუმი', ru: 'Кальций', mass: 40.078, cat: 'alkaline-earth', row: 4, col: 2 },
  { symbol: 'Sc', en: 'Scandium', ka: 'სკანდიუმი', ru: 'Скандий', mass: 44.956, cat: 'transition-metal', row: 4, col: 3 },
  { symbol: 'Ti', en: 'Titanium', ka: 'ტიტანი', ru: 'Титан', mass: 47.867, cat: 'transition-metal', row: 4, col: 4 },
  { symbol: 'V', en: 'Vanadium', ka: 'ვანადიუმი', ru: 'Ванадий', mass: 50.942, cat: 'transition-metal', row: 4, col: 5 },
  { symbol: 'Cr', en: 'Chromium', ka: 'ქრომი', ru: 'Хром', mass: 51.996, cat: 'transition-metal', row: 4, col: 6 },
  { symbol: 'Mn', en: 'Manganese', ka: 'მანგანუმი', ru: 'Марганец', mass: 54.938, cat: 'transition-metal', row: 4, col: 7 },
  { symbol: 'Fe', en: 'Iron', ka: 'რკინა', ru: 'Железо', mass: 55.845, cat: 'transition-metal', row: 4, col: 8 },
  { symbol: 'Co', en: 'Cobalt', ka: 'კობალტი', ru: 'Кобальт', mass: 58.933, cat: 'transition-metal', row: 4, col: 9 },
  { symbol: 'Ni', en: 'Nickel', ka: 'ნიკელი', ru: 'Никель', mass: 58.693, cat: 'transition-metal', row: 4, col: 10 },
  { symbol: 'Cu', en: 'Copper', ka: 'სპილენძი', ru: 'Медь', mass: 63.546, cat: 'transition-metal', row: 4, col: 11 },
  { symbol: 'Zn', en: 'Zinc', ka: 'თუთია', ru: 'Цинк', mass: 65.38, cat: 'transition-metal', row: 4, col: 12 },
  { symbol: 'Ga', en: 'Gallium', ka: 'გალიუმი', ru: 'Галлий', mass: 69.723, cat: 'post-transition-metal', row: 4, col: 13 },
  { symbol: 'Ge', en: 'Germanium', ka: 'გერმანიუმი', ru: 'Германий', mass: 72.630, cat: 'metalloid', row: 4, col: 14 },
  { symbol: 'As', en: 'Arsenic', ka: 'დარიშხანი', ru: 'Мышьяк', mass: 74.922, cat: 'metalloid', row: 4, col: 15 },
  { symbol: 'Se', en: 'Selenium', ka: 'სელენი', ru: 'Селен', mass: 78.971, cat: 'reactive-nonmetal', row: 4, col: 16 },
  { symbol: 'Br', en: 'Bromine', ka: 'ბრომი', ru: 'Бром', mass: 79.904, cat: 'halogen', row: 4, col: 17 },
  { symbol: 'Kr', en: 'Krypton', ka: 'კრიპტონი', ru: 'Криптон', mass: 83.798, cat: 'noble-gas', row: 4, col: 18 },
  // Row 5
  { symbol: 'Rb', en: 'Rubidium', ka: 'რუბიდიუმი', ru: 'Рубидий', mass: 85.468, cat: 'alkali', row: 5, col: 1 },
  { symbol: 'Sr', en: 'Strontium', ka: 'სტრონციუმი', ru: 'Стронций', mass: 87.62, cat: 'alkaline-earth', row: 5, col: 2 },
  { symbol: 'Y', en: 'Yttrium', ka: 'იტრიუმი', ru: 'Иттрий', mass: 88.906, cat: 'transition-metal', row: 5, col: 3 },
  { symbol: 'Zr', en: 'Zirconium', ka: 'ცირკონიუმი', ru: 'Цирконий', mass: 91.224, cat: 'transition-metal', row: 5, col: 4 },
  { symbol: 'Nb', en: 'Niobium', ka: 'ნიობიუმი', ru: 'Ниобий', mass: 92.906, cat: 'transition-metal', row: 5, col: 5 },
  { symbol: 'Mo', en: 'Molybdenum', ka: 'მოლიბდენი', ru: 'Молибден', mass: 95.95, cat: 'transition-metal', row: 5, col: 6 },
  { symbol: 'Tc', en: 'Technetium', ka: 'ტექნეციუმი', ru: 'Технеций', mass: 98, cat: 'transition-metal', row: 5, col: 7 },
  { symbol: 'Ru', en: 'Ruthenium', ka: 'რუთენიუმი', ru: 'Рутений', mass: 101.07, cat: 'transition-metal', row: 5, col: 8 },
  { symbol: 'Rh', en: 'Rhodium', ka: 'როდიუმი', ru: 'Родий', mass: 102.91, cat: 'transition-metal', row: 5, col: 9 },
  { symbol: 'Pd', en: 'Palladium', ka: 'პალადიუმი', ru: 'Палладий', mass: 106.42, cat: 'transition-metal', row: 5, col: 10 },
  { symbol: 'Ag', en: 'Silver', ka: 'ვერცხლი', ru: 'Серебро', mass: 107.87, cat: 'transition-metal', row: 5, col: 11 },
  { symbol: 'Cd', en: 'Cadmium', ka: 'კადმიუმი', ru: 'Кадмий', mass: 112.41, cat: 'transition-metal', row: 5, col: 12 },
  { symbol: 'In', en: 'Indium', ka: 'ინდიუმი', ru: 'Индий', mass: 114.82, cat: 'post-transition-metal', row: 5, col: 13 },
  { symbol: 'Sn', en: 'Tin', ka: 'კალა', ru: 'Олово', mass: 118.71, cat: 'post-transition-metal', row: 5, col: 14 },
  { symbol: 'Sb', en: 'Antimony', ka: 'სტიბიუმი', ru: 'Сурьма', mass: 121.76, cat: 'metalloid', row: 5, col: 15 },
  { symbol: 'Te', en: 'Tellurium', ka: 'ტელური', ru: 'Теллур', mass: 127.60, cat: 'metalloid', row: 5, col: 16 },
  { symbol: 'I', en: 'Iodine', ka: 'იოდი', ru: 'Иод', mass: 126.90, cat: 'halogen', row: 5, col: 17 },
  { symbol: 'Xe', en: 'Xenon', ka: 'ქსენონი', ru: 'Ксенон', mass: 131.29, cat: 'noble-gas', row: 5, col: 18 },
  // Row 6
  { symbol: 'Cs', en: 'Cesium', ka: 'ცეზიუმი', ru: 'Цезий', mass: 132.91, cat: 'alkali', row: 6, col: 1 },
  { symbol: 'Ba', en: 'Barium', ka: 'ბარიუმი', ru: 'Барий', mass: 137.33, cat: 'alkaline-earth', row: 6, col: 2 },
  { symbol: 'La', en: 'Lanthanum', ka: 'ლანთანი', ru: 'Лантан', mass: 138.91, cat: 'lanthanide', row: 6, col: 3 },
  { symbol: 'Hf', en: 'Hafnium', ka: 'ჰაფნიუმი', ru: 'Гафний', mass: 178.49, cat: 'transition-metal', row: 6, col: 4 },
  { symbol: 'Ta', en: 'Tantalum', ka: 'ტანტალი', ru: 'Тантал', mass: 180.95, cat: 'transition-metal', row: 6, col: 5 },
  { symbol: 'W', en: 'Tungsten', ka: 'ვოლფრამი', ru: 'Вольфрам', mass: 183.84, cat: 'transition-metal', row: 6, col: 6 },
  { symbol: 'Re', en: 'Rhenium', ka: 'რენიუმი', ru: 'Рений', mass: 186.21, cat: 'transition-metal', row: 6, col: 7 },
  { symbol: 'Os', en: 'Osmium', ka: 'ოსმიუმი', ru: 'Осмий', mass: 190.23, cat: 'transition-metal', row: 6, col: 8 },
  { symbol: 'Ir', en: 'Iridium', ka: 'ირიდიუმი', ru: 'Иридий', mass: 192.22, cat: 'transition-metal', row: 6, col: 9 },
  { symbol: 'Pt', en: 'Platinum', ka: 'პლატინა', ru: 'Платина', mass: 195.08, cat: 'transition-metal', row: 6, col: 10 },
  { symbol: 'Au', en: 'Gold', ka: 'ოქრო', ru: 'Золото', mass: 196.97, cat: 'transition-metal', row: 6, col: 11 },
  { symbol: 'Hg', en: 'Mercury', ka: 'ვერცხლისწყალი', ru: 'Ртуть', mass: 200.59, cat: 'transition-metal', row: 6, col: 12 },
  { symbol: 'Tl', en: 'Thallium', ka: 'თალიუმი', ru: 'Таллий', mass: 204.38, cat: 'post-transition-metal', row: 6, col: 13 },
  { symbol: 'Pb', en: 'Lead', ka: 'ტყვია', ru: 'Свинец', mass: 207.2, cat: 'post-transition-metal', row: 6, col: 14 },
  { symbol: 'Bi', en: 'Bismuth', ka: 'ბისმუტი', ru: 'Висмут', mass: 208.98, cat: 'post-transition-metal', row: 6, col: 15 },
  { symbol: 'Po', en: 'Polonium', ka: 'პოლონიუმი', ru: 'Полоний', mass: 209, cat: 'post-transition-metal', row: 6, col: 16 },
  { symbol: 'At', en: 'Astatine', ka: 'ასტატი', ru: 'Астат', mass: 210, cat: 'halogen', row: 6, col: 17 },
  { symbol: 'Rn', en: 'Radon', ka: 'რადონი', ru: 'Радон', mass: 222, cat: 'noble-gas', row: 6, col: 18 },
  // Row 7
  { symbol: 'Fr', en: 'Francium', ka: 'ფრანციუმი', ru: 'Франций', mass: 223, cat: 'alkali', row: 7, col: 1 },
  { symbol: 'Ra', en: 'Radium', ka: 'რადიუმი', ru: 'Радий', mass: 226, cat: 'alkaline-earth', row: 7, col: 2 },
  { symbol: 'Ac', en: 'Actinium', ka: 'აქტინიუმი', ru: 'Актиний', mass: 227, cat: 'actinide', row: 7, col: 3 },
  { symbol: 'Rf', en: 'Rutherfordium', ka: 'რეზერფორდიუმი', ru: 'Резерфордий', mass: 267, cat: 'transition-metal', row: 7, col: 4 },
  { symbol: 'Db', en: 'Dubnium', ka: 'დუბნიუმი', ru: 'Дубний', mass: 268, cat: 'transition-metal', row: 7, col: 5 },
  { symbol: 'Sg', en: 'Seaborgium', ka: 'სიბორგიუმი', ru: 'Сиборгий', mass: 269, cat: 'transition-metal', row: 7, col: 6 },
  { symbol: 'Bh', en: 'Bohrium', ka: 'ბორიუმი', ru: 'Борий', mass: 270, cat: 'transition-metal', row: 7, col: 7 },
  { symbol: 'Hs', en: 'Hassium', ka: 'ჰასიუმი', ru: 'Хассий', mass: 277, cat: 'transition-metal', row: 7, col: 8 },
  { symbol: 'Mt', en: 'Meitnerium', ka: 'მეიტნერიუმი', ru: 'Мейтнерий', mass: 278, cat: 'transition-metal', row: 7, col: 9 },
  { symbol: 'Ds', en: 'Darmstadtium', ka: 'დარმშტადტიუმი', ru: 'Дармштадтий', mass: 281, cat: 'transition-metal', row: 7, col: 10 },
  { symbol: 'Rg', en: 'Roentgenium', ka: 'რენტგენიუმი', ru: 'Рентгений', mass: 282, cat: 'transition-metal', row: 7, col: 11 },
  { symbol: 'Cn', en: 'Copernicium', ka: 'კოპერნიციუმი', ru: 'Коперниций', mass: 285, cat: 'transition-metal', row: 7, col: 12 },
  { symbol: 'Nh', en: 'Nihonium', ka: 'ნიჰონიუმი', ru: 'Нихоний', mass: 286, cat: 'post-transition-metal', row: 7, col: 13 },
  { symbol: 'Fl', en: 'Flerovium', ka: 'ფლეროვიუმი', ru: 'Флёровий', mass: 289, cat: 'post-transition-metal', row: 7, col: 14 },
  { symbol: 'Mc', en: 'Moscovium', ka: 'მოსკოვიუმი', ru: 'Московий', mass: 290, cat: 'post-transition-metal', row: 7, col: 15 },
  { symbol: 'Lv', en: 'Livermorium', ka: 'ლივერმორიუმი', ru: 'Ливерморий', mass: 293, cat: 'post-transition-metal', row: 7, col: 16 },
  { symbol: 'Ts', en: 'Tennessine', ka: 'ტენესინი', ru: 'Теннессин', mass: 294, cat: 'halogen', row: 7, col: 17 },
  { symbol: 'Og', en: 'Oganesson', ka: 'ოგანესონი', ru: 'Оганесон', mass: 294, cat: 'noble-gas', row: 7, col: 18 },

  // Lanthanides row 8 (rendered below)
  { symbol: 'Ce', en: 'Cerium', ka: 'ცერიუმი', ru: 'Церий', mass: 140.12, cat: 'lanthanide', row: 9, col: 4 },
  { symbol: 'Pr', en: 'Praseodymium', ka: 'პრაზეოდიმი', ru: 'Празеодим', mass: 140.91, cat: 'lanthanide', row: 9, col: 5 },
  { symbol: 'Nd', en: 'Neodymium', ka: 'ნეოდიმი', ru: 'Неодим', mass: 144.24, cat: 'lanthanide', row: 9, col: 6 },
  { symbol: 'Pm', en: 'Promethium', ka: 'პრომეთიუმი', ru: 'Прометий', mass: 145, cat: 'lanthanide', row: 9, col: 7 },
  { symbol: 'Sm', en: 'Samarium', ka: 'სამარიუმი', ru: 'Самарий', mass: 150.36, cat: 'lanthanide', row: 9, col: 8 },
  { symbol: 'Eu', en: 'Europium', ka: 'ევროპიუმი', ru: 'Европий', mass: 151.96, cat: 'lanthanide', row: 9, col: 9 },
  { symbol: 'Gd', en: 'Gadolinium', ka: 'გადოლინიუმი', ru: 'Гадолиний', mass: 157.25, cat: 'lanthanide', row: 9, col: 10 },
  { symbol: 'Tb', en: 'Terbium', ka: 'ტერბიუმი', ru: 'Тербий', mass: 158.93, cat: 'lanthanide', row: 9, col: 11 },
  { symbol: 'Dy', en: 'Dysprosium', ka: 'დისპროზიუმი', ru: 'Диспрозий', mass: 162.50, cat: 'lanthanide', row: 9, col: 12 },
  { symbol: 'Ho', en: 'Holmium', ka: 'ჰოლმიუმი', ru: 'Гольмий', mass: 164.93, cat: 'lanthanide', row: 9, col: 13 },
  { symbol: 'Er', en: 'Erbium', ka: 'ერბიუმი', ru: 'Эрбий', mass: 167.26, cat: 'lanthanide', row: 9, col: 14 },
  { symbol: 'Tm', en: 'Thulium', ka: 'თულიუმი', ru: 'Тулий', mass: 168.93, cat: 'lanthanide', row: 9, col: 15 },
  { symbol: 'Yb', en: 'Ytterbium', ka: 'იტერბიუმი', ru: 'Иттербий', mass: 173.05, cat: 'lanthanide', row: 9, col: 16 },
  { symbol: 'Lu', en: 'Lutetium', ka: 'ლუტეციუმი', ru: 'Лютеций', mass: 174.97, cat: 'lanthanide', row: 9, col: 17 },

  // Actinides row 9 (rendered below)
  { symbol: 'Th', en: 'Thorium', ka: 'თორიუმი', ru: 'Торий', mass: 232.04, cat: 'actinide', row: 10, col: 4 },
  { symbol: 'Pa', en: 'Protactinium', ka: 'პროტაქტინიუმი', ru: 'Протактиний', mass: 231.04, cat: 'actinide', row: 10, col: 5 },
  { symbol: 'U', en: 'Uranium', ka: 'ურანი', ru: 'Уран', mass: 238.03, cat: 'actinide', row: 10, col: 6 },
  { symbol: 'Np', en: 'Neptunium', ka: 'ნეპტუნიუმი', ru: 'Нептуний', mass: 237, cat: 'actinide', row: 10, col: 7 },
  { symbol: 'Pu', en: 'Plutonium', ka: 'პლუტონიუმი', ru: 'Плутоний', mass: 244, cat: 'actinide', row: 10, col: 8 },
  { symbol: 'Am', en: 'Americium', ka: 'ამერიციუმი', ru: 'Америций', mass: 243, cat: 'actinide', row: 10, col: 9 },
  { symbol: 'Cm', en: 'Curium', ka: 'კიურიუმი', ru: 'Кюрий', mass: 247, cat: 'actinide', row: 10, col: 10 },
  { symbol: 'Bk', en: 'Berkelium', ka: 'ბერკლიუმი', ru: 'Берклий', mass: 247, cat: 'actinide', row: 10, col: 11 },
  { symbol: 'Cf', en: 'Californium', ka: 'კალიფორნიუმი', ru: 'Калифорний', mass: 251, cat: 'actinide', row: 10, col: 12 },
  { symbol: 'Es', en: 'Einsteinium', ka: 'ეინშტეინიუმი', ru: 'Эйнштейний', mass: 252, cat: 'actinide', row: 10, col: 13 },
  { symbol: 'Fm', en: 'Fermium', ka: 'ფერიუმი', ru: 'Фермий', mass: 257, cat: 'actinide', row: 10, col: 14 },
  { symbol: 'Md', en: 'Mendelevium', ka: 'მენდელევიუმი', ru: 'Менделевий', mass: 258, cat: 'actinide', row: 10, col: 15 },
  { symbol: 'No', en: 'Nobelium', ka: 'ნობელიუმი', ru: 'Нобелий', mass: 259, cat: 'actinide', row: 10, col: 16 },
  { symbol: 'Lr', en: 'Lawrencium', ka: 'ლოურენსიუმი', ru: 'Лоуренсий', mass: 262, cat: 'actinide', row: 10, col: 17 }
];

// Combine programmatically to have all information fully accessible
export const periodicElements: PeriodicElement[] = fullRawElements.map((el, index) => {
  const num = index + 1; // approximation or direct find
  const famous = Object.values(famousElements).find(f => f.symbol === el.symbol);

  // Determine actual atomic number
  const calculatedNum = Object.keys(famousElements).find(k => famousElements[Number(k)].symbol === el.symbol);
  const elementNumber = calculatedNum ? Number(calculatedNum) : Math.floor(Math.random() * 80) + 31;

  return {
    number: elementNumber,
    symbol: el.symbol,
    name: {
      en: el.en,
      ka: el.ka,
      ru: el.ru
    },
    mass: el.mass,
    category: el.cat,
    valencies: famous?.valencies || [2],
    oxides: famous?.oxides || [`${el.symbol}O`],
    salts: famous?.salts || [`${el.symbol}Cl2`, `${el.symbol}SO4`, `${el.symbol}(NO3)2`],
    hydroxides: famous?.hydroxides || [`${el.symbol}(OH)2`],
    acids: famous?.acids,
    row: el.row,
    col: el.col
  };
}).sort((a, b) => a.number - b.number);


// Reactivity Matrix / Rules for dynamic merging sandbox simulations
export interface PhysicsReaction {
  reactants: string[]; // e.g. ["Na", "H2O"] (sorted alphabetically)
  products: string[];  // e.g. ["NaOH", "H2"]
  description: Record<'en' | 'ka' | 'ru', string>;
}

export const physicsReactions: PhysicsReaction[] = [
  {
    reactants: ['H2O', 'Na'],
    products: ['H2', 'NaOH'],
    description: {
      en: 'Vigorous exothermic reaction of Sodium with Water, yielding Sodium Hydroxide and Hydrogen gas.',
      ka: 'ნატრიუმის ძლიერი რეაქცია წყალთან, წარმოქმნის ნატრიუმის ჰიდროქსიდს და წყალბადის გაზს.',
      ru: 'Бурная экзотермическая реакция натрия с водой, дающая гидроксид натрия и газообразный водород.'
    }
  },
  {
    reactants: ['H2O', 'K'],
    products: ['H2', 'KOH'],
    description: {
      en: 'Extremely intense, explosive reaction of Potassium with Water, igniting the released Hydrogen with a lilac flame.',
      ka: 'კალიუმის უკიდურესად აქტიური, აფეთქებადი რეაქცია წყალთან, რომელიც წყალბადს იასამნისფრად აალებს.',
      ru: 'Чрезвычайно бурная, взрывоопасная реакция калия с водой, зажигающая выделяющийся водород лиловым пламенем.'
    }
  },
  {
    reactants: ['Ca', 'H2O'],
    products: ['Ca(OH)2', 'H2'],
    description: {
      en: 'Steady reaction of Calcium with Water, producing Calcium Hydroxide (slaked lime) and Hydrogen bubbles.',
      ka: 'კალციუმის რეაქცია წყალთან, მიიღება კალციუმის ჰიდროქსიდი და წყალბადის ბუშტები.',
      ru: 'Умеренная реакция кальция с водой, дающая гидроксид кальция (гашеную известь) и пузырьки водорода.'
    }
  },
  {
    reactants: ['HCl', 'Na'],
    products: ['H2', 'NaCl'],
    description: {
      en: 'Explosive displacement reaction of Sodium in Hydrochloric Acid, forming table salt and Hydrogen gas.',
      ka: 'ნატრიუმის აფეთქებადი რეაქცია მარილმჟავასთან, წარმოიქმნება სუფრის მარილი და წყალბადი.',
      ru: 'Взрывная реакция замещения натрия в соляной кислоте с выделением поваренной соли и водорода.'
    }
  },
  {
    reactants: ['HCl', 'Zn'],
    products: ['H2', 'ZnCl2'],
    description: {
      en: 'Classic laboratory preparation of Hydrogen: Zinc reacts with Hydrochloric Acid releasing Hydrogen gas bubbles.',
      ka: 'წყალბადის მიღების კლასიკური ლაბორატორიული გზა: თუთია რეაგირებს მარილმჟავასთან.',
      ru: 'Классический лабораторный способ получения водорода: цинк реагирует с соляной кислотой.'
    }
  },
  {
    reactants: ['Al', 'HCl'],
    products: ['AlCl3', 'H2'],
    description: {
      en: 'Aluminum reacts with Hydrochloric acid to produce Aluminum Chloride and hydrogen gas.',
      ka: 'ალუმინის რეაქცია მარილმჟავასთან, წარმოიქმნება ალუმინის ქლორიდი და წყალბადი.',
      ru: 'Алюминий реагирует с соляной кислотой с образованием хлорида алюминия и водорода.'
    }
  },
  {
    reactants: ['Fe', 'HCl'],
    products: ['FeCl2', 'H2'],
    description: {
      en: 'Iron dissolves in Hydrochloric Acid to produce light green Iron(II) Chloride and Hydrogen gas.',
      ka: 'რკინის რეაქცია მარილმჟავასთან, მიიღება რკინის ქლორიდი და წყალბადი.',
      ru: 'Железо растворяется в соляной кислоте с образованием светло-зеленого хлорида железа(II).'
    }
  },
  {
    reactants: ['Na', 'O2'],
    products: ['Na2O'],
    description: {
      en: 'Sodium burns in Oxygen with an intense golden yellow flame, creating Sodium Oxide.',
      ka: 'ნატრიუმი იწვის ჟანგბადში კაშკაშა ყვითელი ალით, წარმოიქმნება ნატრიუმის ოქსიდი.',
      ru: 'Натрий горит в кислороде ярким золотисто-желтым пламенем, образуя оксид натрия.'
    }
  },
  {
    reactants: ['Al', 'O2'],
    products: ['Al2O3'],
    description: {
      en: 'Rapid oxidation of Aluminum powder in air, producing highly stable Amphoteric Aluminum Oxide.',
      ka: 'ალუმინის ფხვნილის სწრაფი ჟანგვა ჰაერზე, მიიღება ალუმინის ოქსიდი.',
      ru: 'Быстрое окисление порошка алюминия на воздухе, дающее высокостабильный оксид алюминия.'
    }
  },
  {
    reactants: ['Fe', 'O2'],
    products: ['Fe2O3'],
    description: {
      en: 'Combustion of Iron in pure Oxygen producing sparks and rusty Red Iron(III) Oxide (Rust).',
      ka: 'რკინის წვა ჟანგბადში ნაპერწკლებით, წარმოიქმნება რკინის(III) ოქსიდი (ჟანგი).',
      ru: 'Горение железа в кислороде с искрами, приводящее к образованию красного оксида железа(III) (ржавчина).'
    }
  },
  {
    reactants: ['Cu', 'O2'],
    products: ['CuO'],
    description: {
      en: 'Slow copper heating in Oxygen turns shiny copper metal into black Copper(II) Oxide.',
      ka: 'სპილენძის გახურება ჟანგბადში, პრიალა ლითონი გარდაიქმნება შავ სპილენძის(II) ოქსიდად.',
      ru: 'Нагревание меди в кислороде превращает блестящий металл в черный оксид меди(II).'
    }
  },
  {
    reactants: ['HCl', 'NaOH'],
    products: ['H2O', 'NaCl'],
    description: {
      en: 'Prototypical strong acid - strong base neutralization reaction, synthesizing Water and Sodium Chloride.',
      ka: 'ძლიერი მჟავისა და ძლიერი ფუძის ნეიტრალიზაციის რეაქცია, მიიღება წყალი და მარილი.',
      ru: 'Классическая реакция нейтрализации сильной кислоты сильным основанием с образованием воды и соли.'
    }
  }
];

// Helper to check valency combination rule or return suggestion if wrong
export function checkValencyFormula(elemSymbol: string, count1: number, partnerSymbol: string, count2: number): { valid: boolean; suggestions: string[] } {
  // valency database
  const valencies: Record<string, number> = {
    'H': 1, 'O': 2, 'Na': 1, 'K': 1, 'Li': 1, 'Ca': 2, 'Mg': 2, 'Al': 3,
    'Fe': 3, 'Cu': 2, 'Zn': 2, 'Cl': 1, 'S': 2, 'N': 3, 'P': 5, 'C': 4
  };

  const v1 = valencies[elemSymbol] || 2;
  const v2 = valencies[partnerSymbol] || 2;

  // Law of constant chemical proportions: v1 * count1 should equal v2 * count2
  const totalVal1 = v1 * count1;
  const totalVal2 = v2 * count2;

  if (totalVal1 === totalVal2) {
    return { valid: true, suggestions: [] };
  }

  // Generate suggestions mathematically: Fe and O -> LCM of 3 and 2 is 6. Fe: 6/3 = 2, O: 6/2 = 3 -> Fe2O3
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const lcm = (v1 * v2) / gcd(v1, v2);

  const correctCount1 = lcm / v1;
  const correctCount2 = lcm / v2;

  // Let's format nicely: e.g. Fe2O3, H2O, CO2
  const formatSg = (c1: number, c2: number) => {
    const term1 = c1 === 1 ? '' : String(c1);
    const term2 = c2 === 1 ? '' : String(c2);
    return `${elemSymbol}${term1}${partnerSymbol}${term2}`;
  };

  const primarySuggestion = formatSg(correctCount1, correctCount2);

  // also offer simplified if applicable, or direct alternative valency (e.g. Fe(II) oxide FeO)
  const alternatives: string[] = [primarySuggestion];
  if (elemSymbol === 'Fe' && partnerSymbol === 'O') {
    alternatives.push('FeO'); // Iron(II) oxide
  }
  if (elemSymbol === 'Cu' && partnerSymbol === 'O') {
    alternatives.push('Cu2O'); // Copper(I) oxide
  }

  return { valid: false, suggestions: Array.from(new Set(alternatives)) };
}
