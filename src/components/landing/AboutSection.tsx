import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Shield, Users, Sparkles, Award } from "lucide-react";
import masterPhoto from "@/assets/master-photo.png";

const values = [
  { icon: Shield, title: "Качество материалов", desc: "Используем только сертифицированные полотна европейских производителей" },
  { icon: Users, title: "Опытные монтажники", desc: "Каждый мастер имеет стаж более 3 лет и проходит обучение" },
  { icon: Sparkles, title: "Чистый монтаж", desc: "Работаем аккуратно, убираем за собой — ваш дом останется чистым" },
  { icon: Award, title: "Гарантия 10 лет", desc: "Предоставляем расширенную гарантию на все виды работ и материалы" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={masterPhoto}
                alt="Руководитель компании ArtPotolki"
                className="w-full h-full object-cover"
                loading="lazy"
                width={512}
                height={640}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-bottom-6 lg:left-1/2 gradient-primary text-primary-foreground rounded-xl px-6 py-3 shadow-lg">
              <div className="text-2xl font-bold font-heading">10+</div>
              <div className="text-sm opacity-90">лет опыта</div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Профессионализм и опыт
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Мы — команда профессионалов, которая уже более 10 лет создаёт идеальные потолки
              в домах и офисах. За это время мы выполнили более 1000 проектов и заслужили
              доверие сотен клиентов. Наша миссия — сделать ваш дом красивым и уютным.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{v.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
