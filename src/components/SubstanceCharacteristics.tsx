import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, Activity, Beaker, ShieldAlert, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translationData';

interface SubstanceCharacteristicsProps {
  currentLang: Language;
}

interface ReactionSchema {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  equation: string;
  description: Record<Language, string>;
}

export default function SubstanceCharacteristics({ currentLang }: SubstanceCharacteristicsProps) {
  const [activeTab, setActiveTab] = useState<'oxides' | 'acids' | 'salts' | 'bases'>('oxides');

  const t = translations[currentLang];

  // Map keys used for localization in Georgian and Russian
  const tabNames: Record<string, Record<Language, string>> = {
    oxides: { en: 'Oxides', ka: 'ოქსიდები', ru: 'Оксиды' },
    acids: { en: 'Acids', ka: 'მჟავები', ru: 'Кислоты' },
    salts: { en: 'Salts', ka: 'მარილები', ru: 'Соли' },
    bases: { en: 'Bases', ka: 'ფუძეები', ru: 'Основания' }
  };

  // Reactions detailed database for visual schemas
  const reactionDatabase: Record<'oxides' | 'acids' | 'salts' | 'bases', ReactionSchema[]> = {
    oxides: [
      {
        id: 'ox-1',
        title: { en: 'Acidic oxide + Water ➔ Acid', ka: 'მჟავა ოქსიდი + წყალი ➔ მჟავა', ru: 'Кислотный оксид + Вода ➔ Кислота' },
        subtitle: { en: 'Typical for nonmetal oxides', ka: 'დამახასიათებელია არალითონთა ოქსიდებისთვის', ru: 'Характерно для оксидов неметаллов' },
        equation: 'CO2 + H2O ➔ H2CO3',
        description: {
          en: 'Carbon dioxide gas dissolves in water to synthesize carbonic acid, shifting pH slightly.',
          ka: 'ნახშირორჟანგი იხსნება წყალში და წარმოქმნის სუსტ ნახშირმჟავას.',
          ru: 'Углекислый газ растворяется в воде, образуя угольную кислоту и меняя уровень pH.'
        }
      },
      {
        id: 'ox-2',
        title: { en: 'Acidic oxide + Base ➔ Salt + Water', ka: 'მჟავა ოქსიდი + ფუძე ➔ მარილი + წყალი', ru: 'Кислотный оксид + Основание ➔ Соль + Вода' },
        subtitle: { en: 'Neutralization synthesis', ka: 'ნეიტრალიზაციის რეაქცია', ru: 'Реакция нейтрализации' },
        equation: 'CO2 + Ca(OH)2 ➔ CaCO3 + H2O',
        description: {
          en: 'Carbon dioxide gas bubbles in slaked lime to create a milky precipitate of limestone.',
          ka: 'ნახშირორჟანგის გატარება კალციუმის ჰიდროქსიდში წარმოქმნის კირქვის თეთრ ნალექს.',
          ru: 'Углекислый газ реагирует с известковой водой, осаждая белый карбонат кальция.'
        }
      },
      {
        id: 'ox-3',
        title: { en: 'Basic oxide + Water ➔ Base', ka: 'ფუძე ოქსიდი + წყალი ➔ ტუტე / ფუძე', ru: 'Основный оксид + Вода ➔ Основание' },
        subtitle: { en: 'Slaking CaO', ka: 'კირის ჩაქრობა', ru: 'Гашение извести' },
        equation: 'CaO + H2O ➔ Ca(OH)2',
        description: {
          en: 'Quicklime reacts violently with water, generating heat to produce slaked lime.',
          ka: 'გამომწვარი კირი (კალციუმის ოქსიდი) რეაგირებს წყალთან და წარმოქმნის ჩამქრალ კირს.',
          ru: 'Негашеная известь бурно реагирует с водой с выделением тепла, образуя гашеную известь.'
        }
      },
      {
        id: 'ox-4',
        title: { en: 'Amphoteric oxide + Acid ➔ Salt + Water', ka: 'ამფოტერული ოქსიდი + მჟავა ➔ მარილი + წყალი', ru: 'Амфотерный оксид + Кислота ➔ Соль + Вода' },
        subtitle: { en: 'Dual chemical path (Acid reaction)', ka: 'ორმაგი ქიმიური ბუნება (მჟავას რეაქცია)', ru: 'Двойственная природа (Реакция с кислотой)' },
        equation: 'Al2O3 + 6HCl ➔ 2AlCl3 + 3H2O',
        description: {
          en: 'Amphoteric aluminum oxide dissolves in hydrochloric acid to yield aluminum salt.',
          ka: 'ალუმინის ორმაგი ბუნების ოქსიდი იხსნება მარილმჟავაში და წარმოქმნის ალუმინის ქლორიდს.',
          ru: 'Амфотерный оксид алюминия растворяется в соляной кислоте с образованием соли.'
        }
      },
      {
        id: 'ox-5',
        title: { en: 'Amphoteric oxide + Alkali ➔ Aluminate + Water', ka: 'ამფოტერული ოქსიდი + ტუტე ➔ ალუმინატი + წყალი', ru: 'Амфотерный оксид + Щелочь ➔ Алюминат + Вода' },
        subtitle: { en: 'Dual chemical path (Alkali reaction)', ka: 'ორმაგი ბუნება (ტუტეს რეაქცია)', ru: 'Двойственная природа (Реакция со щелочью)' },
        equation: 'Al2O3 + 2NaOH ➔ 2NaAlO2 + H2O',
        description: {
          en: 'Aluminum oxide dissolves in strong concentrated sodium base to yield coordination salts.',
          ka: 'ალუმინის ოქსიდი შედის რეაქციაში ნატრიუმის ტუტესთან და წარმოქმნის ნატრიუმის ალუმინატს.',
          ru: 'Оксид алюминия сплавляется со щелочью, образуя комплекс соли алюмината.'
        }
      }
    ],
    acids: [
      {
        id: 'ac-1',
        title: { en: 'Active Metal + Acid ➔ Salt + Hydrogen', ka: 'აქტიური ლითონი + მჟავა ➔ მარილი + წყალბადი', ru: 'Активный металл + Кислота ➔ Соль + Водород' },
        subtitle: { en: 'Hydrogen displacement synthesis', ka: 'წყალბადის ჩანაცვლების რეაქცია', ru: 'Реакция замещения водорода' },
        equation: 'Zn + 2HCl ➔ ZnCl2 + H2',
        description: {
          en: 'Zinc metals dissolve in hydrochloric acid to release rapid continuous hydrogen gas bubbles.',
          ka: 'თუთია რეაგირებს გამოყოფილ მარილმჟავასთან და გამოყოფს წყალბადის გაზს.',
          ru: 'Цинк растворяется в соляной кислоте с выделением газообразных пузырьков водорода.'
        }
      },
      {
        id: 'ac-2',
        title: { en: 'Metal Oxide + Acid ➔ Salt + Water', ka: 'ლითონის ოქსიდი + მჟავა ➔ მარილი + წყალი', ru: 'Оксид металла + Кислота ➔ Соль + Вода' },
        subtitle: { en: 'Dissolution of basic rust scale', ka: 'ჟანგის მოცილების რეაქცია', ru: 'Растворение ржавчины и оксидов' },
        equation: 'CuO + H2SO4 ➔ CuSO4 + H2O',
        description: {
          en: 'Black copper oxide dissolves in warm sulfuric acid to synthesize a brilliant sapphire blue copper sulfate.',
          ka: 'სპილენძის შავი ოქსიდი ცხელ გოგირდმჟავაში გახსნისას წარმოქმნის ლურჯ შაბს.',
          ru: 'Черный оксид меди растворяется в теплой серной кислоте, давая синий раствор медного купороса.'
        }
      },
      {
        id: 'ac-3',
        title: { en: 'Acid + Base ➔ Salt + Water', ka: 'მჟავა + ფუძე ➔ მარილი + წყალი', ru: 'Кислота + Основание ➔ Соль + Вода' },
        subtitle: { en: 'Standard neutralization', ka: 'ნეიტრალიზაციის რეაქცია', ru: 'Классическая нейтрализация' },
        equation: 'HCl + NaOH ➔ NaCl + H2O',
        description: {
          en: 'Highly corrosive hydrochloric acid reacts with caustic soda to yield neutral water and standard table salt.',
          ka: 'მწვავე მარილმჟავა რეაგირებს ნატრიუმის ტუტესთან და წარმოქმნის ნეიტრალურ მარილს.',
          ru: 'Соляная кислота смешивается с каустической содой с образованием обычной соли и воды.'
        }
      }
    ],
    salts: [
      {
        id: 'sa-1',
        title: { en: 'Salt Decomposition ➔ Ions', ka: 'მარილის ელექტროლიტური დისოციაცია', ru: 'Диссоциация соли в воде' },
        subtitle: { en: 'Solubility ion release', ka: 'იონებად დაშლა წყალხსნარში', ru: 'Распад на ионы в растворе' },
        equation: 'NaCl + Aqueous ➔ Na⁺ + Cl⁻',
        description: {
          en: 'Strong ionic minerals separate completely in water into free moving conductive cations and anions.',
          ka: 'მარილი წყალში გახსნისას სრულად დისოცირდება თავისუფალ მუხტის მქონე იონებად.',
          ru: 'Кристаллы соли распадаются при растворении на подвижные заряженные катионы и анионы.'
        }
      },
      {
        id: 'sa-2',
        title: { en: 'Electrolysis: Salt ➔ Metal + Gas', ka: 'ელექტროლიზი: მარილი ➔ ლითონი + გაზი', ru: 'Электролиз расплава: Соль ➔ Металл + Газ' },
        subtitle: { en: 'Cathode and anode splits', ka: 'კათოდური და ანოდური დაშლა', ru: 'Разделение на катоде и аноде' },
        equation: '2NaCl (molten) ➔ 2Na + Cl2',
        description: {
          en: 'Applying electrical currents to molten sodium chloride extracts pure sodium metals and chlorine gas.',
          ka: 'ნატრიუმის ქლორიდის ნადნობის ელექტროლიზით მიიღება სუფთა მეტალი ნატრიუმი და ქლორი.',
          ru: 'Прохождение электрического тока через расплав соли выделяет чистый натрий и хлор.'
        }
      },
      {
        id: 'sa-3',
        title: { en: 'Salt + Alkali ➔ New Salt + Base precipitate', ka: 'მარილი + ტუტე ➔ ახალი მარილი + უხსნადი ფუძე', ru: 'Соль + Щелочь ➔ Новая соль + Основание' },
        subtitle: { en: 'Hydroxide precipitation', ka: 'ნალექის წარმოქმნის რეაქცია', ru: 'Выпадение гидроксида в осадок' },
        equation: 'CuSO4 + 2NaOH ➔ Na2SO4 + Cu(OH)2↓',
        description: {
          en: 'Adding alkali base to copper sulfate immediately brings down a thick gelatinous bright blue Copper(II) Hydroxide precipitate.',
          ka: 'შაბისა და ნატრიუმის ტუტის ურთიერთქმედებით წარმოიქმნება სპილენძის ჰიდროქსიდის ლურჯი ნალექი.',
          ru: 'Добавление щелочи к раствору купороса осаждает желеобразный голубой осадок гидроксида меди.'
        }
      }
    ],
    bases: [
      {
        id: 'ba-1',
        title: { en: 'Base + Acid ➔ Salt + Water', ka: 'ფუძე + მჟავა ➔ მარილი + წყალი', ru: 'Основание + Кислота ➔ Соль + Вода' },
        subtitle: { en: 'Neutralization energy releases', ka: 'ნეიტრალიზაცია სითბოს გამოყოფით', ru: 'Выделение тепла при нейтрализации' },
        equation: 'KOH + HNO3 ➔ KNO3 + H2O',
        description: {
          en: 'Caustic potash base chemical neutralizes nitric acid to build potassium nitrate fertilizers.',
          ka: 'კალიუმის ჰიდროქსიდი რეაგირებს აზოტმჟავასთან და წარმოქმნის კალიუმის სელიტრას.',
          ru: 'Калиевая щелочь нейтрализует азотную кислоту, давая воду и нитрат калия (селитру).'
        }
      },
      {
        id: 'ba-2',
        title: { en: 'Base + Acidic Oxide ➔ Salt + Water', ka: 'ტუტე + მჟავა ოქსიდი ➔ მარილი + წყალი', ru: 'Щелочь + Кислотный оксид ➔ Соль + Вода' },
        subtitle: { en: 'Capture of carbon gas', ka: 'ნახშირორჟანგის შთანთქმა', ru: 'Улавливание углекислого газа' },
        equation: '2NaOH + CO2 ➔ Na2CO3 + H2O',
        description: {
          en: 'Sodium hydroxide solutions capture acidic carbon gases to synthesize sodium carbonate mineral salt.',
          ka: 'ნატრიუმის ტუტე შთანთქავს ნახშირორჟანგს და გარდაიქმნება სოდად (ნატრიუმის კარბონატად).',
          ru: 'Едкий натр реагирует с углекислым газом с образованием карбоната натрия (соды).'
        }
      }
    ]
  };

  // Helper characters replacement
  const formatSubscript = (text: string) => {
    return text.replace(/([A-Za-z]+)(\d+)/g, (_, char, num) => {
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-4">
      {/* Tab select bar */}
      <div className="flex justify-center border-b border-apple-gray-200 pb-2">
        <div className="flex gap-1 bg-apple-gray-100 p-1 rounded-full border border-apple-gray-200">
          {Object.keys(tabNames).map((tabKey) => (
            <button
              key={tabKey}
              id={`characteristics-tab-${tabKey}`}
              onClick={() => setActiveTab(tabKey as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === tabKey
                  ? 'bg-white text-apple-blue shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tabNames[tabKey][currentLang]}
            </button>
          ))}
        </div>
      </div>

      {/* Visual reactions stack cards display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {reactionDatabase[activeTab].map((item, idx) => (
            <motion.div
              key={item.id}
              id={`reaction-schema-card-${item.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="group p-5 md:p-6 rounded-3xl bg-white border border-apple-gray-100 shadow-sm hover:shadow-lg hover:border-apple-gray-200 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-apple-blue uppercase tracking-wider flex items-center gap-1">
                    <Activity size={12} />
                    Mechanism Schema
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                  {item.title[currentLang]}
                </h4>
                <p className="text-[10px] text-gray-400 font-mono italic">
                  {item.subtitle[currentLang]}
                </p>
                <div className="h-px bg-apple-gray-50 my-2" />
                <p className="text-xs text-gray-500 leading-normal">
                  {item.description[currentLang]}
                </p>
              </div>

              {/* Dynamic monospaced equation blocks with arrow slide transition effects */}
              <div className="rounded-2xl p-4 bg-apple-gray-50 border border-apple-gray-100 flex items-center justify-center font-mono text-base font-bold text-gray-800 tracking-wider">
                <span className="flex items-center gap-2">
                  {formatSubscript(item.equation).split('➔').map((side, sIdx) => {
                    return (
                      <React.Fragment key={sIdx}>
                        <span>{side.trim()}</span>
                        {sIdx === 0 && (
                          <motion.span
                            className="text-apple-blue font-bold px-1"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                          >
                            ➔
                          </motion.span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
