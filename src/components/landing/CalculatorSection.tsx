import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calculator, Check } from "lucide-react";

const ceilingTypes = [
  { value: "glossy", label: "Глянцевый", price: 45 },
  { value: "matte", label: "Матовый", price: 35 },
  { value: "satin", label: "Сатиновый", price: 40 },
];

const extras = [
  { id: "chandelier", label: "Установка люстры", price: 50 },
  { id: "pipes", label: "Обход труб", price: 30 },
  { id: "multilevel", label: "Многоуровневая конструкция", price: 80 },
];

const CalculatorSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [type, setType] = useState("matte");
  const [area, setArea] = useState(20);
  const [corners, setCorners] = useState(4);
  const [lights, setLights] = useState(4);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (id: string) =>
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );

  const total = useMemo(() => {
    const typePrice = ceilingTypes.find((t) => t.value === type)!.price;
    const base = typePrice * area;
    const cornerCost = corners * 150;
    const lightCost = lights * 350;
    const extraCost = extras
      .filter((e) => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
    return base + cornerCost + lightCost + extraCost;
  }, [type, area, corners, lights, selectedExtras]);

  return (
    <section id="calculator" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Калькулятор стоимости
          </h2>
          <p className="mt-3 text-muted-foreground">
            Рассчитайте примерную стоимость вашего потолка за несколько секунд
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6 md:p-8"
        >
          {/* Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Тип потолка</label>
            <div className="grid grid-cols-3 gap-3">
              {ceilingTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`py-2 px-1.5 md:py-3 md:px-4 rounded-lg text-[10px] md:text-sm font-medium transition-all border ${
                    type === t.value
                      ? "gradient-primary text-primary-foreground border-transparent"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {t.label}
                  <div className="text-[9px] md:text-xs mt-0.5 opacity-80">{t.price} BYN/м²</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          {[
            { label: "Площадь помещения", value: area, set: setArea, min: 5, max: 100, unit: "м²" },
            { label: "Количество углов", value: corners, set: setCorners, min: 4, max: 20, unit: "" },
            { label: "Количество светильников", value: lights, set: setLights, min: 0, max: 20, unit: "шт" },
          ].map((s) => (
            <div key={s.label} className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-foreground">{s.label}</span>
                <span className="text-primary font-bold">
                  {s.value} {s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{s.min}</span>
                <span>{s.max}</span>
              </div>
            </div>
          ))}

          {/* Extras */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-3">Дополнительные опции</label>
            <div className="space-y-3">
              {extras.map((e) => (
                <label
                  key={e.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedExtras.includes(e.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                      selectedExtras.includes(e.id)
                        ? "gradient-primary"
                        : "border-2 border-border"
                    }`}
                  >
                    {selectedExtras.includes(e.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(e.id)}
                    onChange={() => toggleExtra(e.id)}
                    className="sr-only"
                  />
                  <span className="text-sm text-foreground flex-1">{e.label}</span>
                  <span className="text-sm text-muted-foreground">+{e.price} BYN</span>
                </label>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Примерная стоимость</div>
                <div className="text-3xl font-heading font-bold text-foreground">
                  {total.toLocaleString("ru-RU")} BYN
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              Оставить заявку
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
