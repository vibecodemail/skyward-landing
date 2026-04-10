import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gem, Layers, CircleDot, LayoutGrid, Image, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "Глянцевые потолки",
    desc: "Создают эффект зеркала, отражая интерьер и визуально расширяя пространство.",
    features: ["Отражающий эффект", "20+ цветов", "Влагостойкость"],
  },
  {
    icon: CircleDot,
    title: "Матовые потолки",
    desc: "Классический вид, идеально подходящий для любого интерьера — от минимализма до классики.",
    features: ["Без бликов", "Ровная поверхность", "Универсальность"],
  },
  {
    icon: Layers,
    title: "С трековой системой",
    desc: "Позволяет свободно изменять направление света и создавать нужное настроение в помещении.",
    features: ["Магнитная система", "Любая конфигурация", "Безопасное напряжение"],
  },
  {
    icon: LayoutGrid,
    title: "Многоуровневые конструкции",
    desc: "Сложные дизайнерские решения с комбинацией уровней, подсветки и материалов.",
    features: ["Зонирование", "LED-подсветка", "Дизайн-проект"],
  },
  {
    icon: Image,
    title: "Со световыми линиями",
    desc: "Ультрасовременный оригинальный дизайн, который одновременно будет и функциональным и эстетичным.",
    features: ["Необычная атмосфера", "Зонирование", "Разные сценарии освещения"],
  },
  {
    icon: Lightbulb,
    title: "Освещение и подсветка",
    desc: "Установка точечных светильников, LED-лент и парящих контуров для идеального света.",
    features: ["Точечные светильники", "LED-ленты", "Парящие линии"],
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Наши услуги
          </h2>
          <p className="mt-3 text-muted-foreground">
            Широкий выбор натяжных потолков для любого помещения и бюджета
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-6 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
