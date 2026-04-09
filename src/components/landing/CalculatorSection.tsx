import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calculator, Check } from "lucide-react";

const ceilingTypes = [
  { value: "glossy", label: "Глянцевый", price: 45 },
  { value: "matte", label: "Матовый", price: 35 },
  { value: "track", label: "С трековой системой", price: 65 },
];

const extras = [
  { id: "chandelier", label: "Установка люстры", price: 50 },
  { id: "pipes", label: "Обход труб", price: 30 },
  { id: "track-system", label: "Монтаж трековой системы", price: 120 },
];

const CalculatorSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [type, setType] = useState("matte");
  const [area, setArea] = useState("");
  const [lights, setLights] = useState("");
  const [total, setTotal] = useState<number | null>(null);

  const calculateCost = () => {
    const areaNum = parseFloat(area) || 0;
    const lightsNum = parseInt(lights) || 0;
    
    const typePrice = ceilingTypes.find((t) => t.value === type)!.price;
    const base = typePrice * areaNum;
    const lightCost = lightsNum * 350;
    
    setTotal(base + lightCost);
  };

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
          {/* Ceiling Type Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Тип потолка</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {ceilingTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} — {t.price} BYN/м²
                </option>
              ))}
            </select>
          </div>

          {/* Area Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Площадь помещения (м²)</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              min="0"
              step="0.1"
              placeholder="Введите площадь"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Lights Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-2">Количество светильников</label>
            <input
              type="number"
              value={lights}
              onChange={(e) => setLights(e.target.value)}
              min="0"
              step="1"
              placeholder="Введите количество"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateCost}
            className="w-full gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-6"
          >
            Рассчитать
          </button>

          {/* Result */}
          {total !== null && (
            <div className="border-t border-border pt-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calculator className="w-6 h-6 text-primary" />
                <div className="text-sm text-muted-foreground">Примерная стоимость</div>
              </div>
              <div className="text-4xl font-heading font-bold text-foreground">
                {total.toLocaleString("ru-RU")} BYN
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
