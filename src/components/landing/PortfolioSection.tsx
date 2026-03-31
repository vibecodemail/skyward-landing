import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";

import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const categories = ["Все", "Глянцевые", "Матовые", "Сатиновые", "Многоуровневые", "Фотопечать"];

const projects = [
  { img: p1, title: "Гостиная 45 м²", category: "Глянцевые", desc: "Глянцевый натяжной потолок с LED-подсветкой" },
  { img: p2, title: "Кухня-студия", category: "Матовые", desc: "Матовый потолок со встроенными точечными светильниками" },
  { img: p3, title: "Зал 60 м²", category: "Сатиновые", desc: "Сатиновый потолок с мягким перламутровым свечением" },
  { img: p4, title: "Коридор", category: "Многоуровневые", desc: "Двухуровневая конструкция с парящим контуром" },
  { img: p5, title: "Детская комната", category: "Фотопечать", desc: "Потолок с принтом неба и облаков" },
  { img: p6, title: "Офис", category: "Матовые", desc: "Матовый потолок для офисного помещения" },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState("Все");
  const [modal, setModal] = useState<number | null>(null);

  const filtered = filter === "Все" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Наши работы</h2>
          <p className="mt-3 text-muted-foreground">Посмотрите примеры наших проектов</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer rounded-xl overflow-hidden card-elevated"
                onClick={() => setModal(projects.indexOf(project))}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={960}
                    height={640}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={projects[modal].img}
                  alt={projects[modal].title}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => setModal(null)}
                  className="absolute top-4 right-4 bg-foreground/50 text-primary-foreground rounded-full p-2 hover:bg-foreground/70 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground">{projects[modal].title}</h3>
                <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {projects[modal].category}
                </span>
                <p className="mt-3 text-muted-foreground">{projects[modal].desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
