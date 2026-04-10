import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroBg from "@/assets/hero-ceiling.png";

const stats = [
  { value: 1000, suffix: "+", label: "выполненных проектов" },
  { value: 10, suffix: "", label: "лет на рынке" },
  { value: 98, suffix: "%", label: "довольных клиентов" },
];

const StatItem = ({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) => {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
        {count}{suffix}
      </div>
      <div className="text-sm text-primary-foreground/70 mt-1">{label}</div>
    </div>
  );
};

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Современный натяжной потолок"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight"
          >
            Современные натяжные потолки для вашего комфорта
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto"
          >
            10 лет на рынке. Сегодня звонок завтра потолок.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo("#calculator")}
              className="gradient-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollTo("#portfolio")}
              className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Смотреть примеры работ
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} started={isVisible} />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary-foreground/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
