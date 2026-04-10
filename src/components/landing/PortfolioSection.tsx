import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";

import p1 from "@/assets/portfolio-1.png";
import p2 from "@/assets/portfolio-2.png";
import p3 from "@/assets/portfolio-3.png";
import p4 from "@/assets/portfolio-4.png";
import p5 from "@/assets/portfolio-5.png";
import p6 from "@/assets/portfolio-6.png";
import p7 from "@/assets/portfolio-7.png";
import p8 from "@/assets/portfolio-8.png";
import p9 from "@/assets/portfolio-9.png";
import p10 from "@/assets/portfolio-10.png";

const categories = ["Все", "Глянцевые", "Матовые", "С трековой системой", "Со световыми линиями"];

const projects = [
  /*{ id: "p1", img: p1, title: "Гостиная 20 м²", category: "Матовые", desc: "Матовый натяжной потолок с LED-подсветкой" },*/
  { id: "p2", img: p2, title: "Кухня-студия", category: "Матовые", desc: "Матовый потолок со встроенными точечными светильниками" },
  { id: "p3", img: p3, title: "Спальня 30 м²", category: "Глянцевые", desc: "Глянцевый потолок с зеркальным эффектом" },
  { id: "p4-matte", img: p4, title: "Офис 30 м²", category: "Матовые", desc: "Матовый потолок для офисного помещения" },
  { id: "p4-lines", img: p4, title: "Офис 30 м²", category: "Со световыми линиями", desc: "Матовый потолок со световыми линиями" },
  { id: "p5", img: p5, title: "Ванная комната", category: "Глянцевые", desc: "Влагостойкий глянцевый потолок" },
  /*{ id: "p6-kids", img: p6, title: "Детская комната", category: "Матовые", desc: "Экологичный матовый потолок в детской" },*/
  { id: "p6", img: p6, title: "Прихожая", category: "Со световыми линиями", desc: "Потолок со световыми линиями" },
  /*{ id: "p2-track", img: p2, title: "Кухня 20 м²", category: "С трековой системой", desc: "Современный потолок с трековой системой освещения" },*/
  { id: "p7", img: p7, title: "Зал 60 м²", category: "С трековой системой", desc: "Глянцевый потолок с регулируемой трековой системой" },
  /*{ id: "p8-gloss", img: p8, title: "Гостиная 50 м²", category: "Глянцевые", desc: "Глянцевый потолок с визуальным увеличением пространства" },*/
  { id: "p8-track", img: p8, title: "Гостиная 50 м²", category: "С трековой системой", desc: "Глянцевый потолок с визуальным увеличением пространства" },
  { id: "p9", img: p9, title: "Коридор", category: "Матовые", desc: "Классический матовый потолок со световыми линиями" },
  { id: "p9-lines", img: p9, title: "Коридор", category: "Со световыми линиями", desc: "Классический матовый потолок со световыми линиями" },
  { id: "p10", img: p10, title: "Студия 35 м²", category: "Со световыми линиями", desc: "Потолок со световыми линиями" },
  { id: "p10-matte", img: p10, title: "Студия 35 м²", category: "Матовые", desc: "Матовый потолок со световыми линиями" }
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState("Все");
  const [modalId, setModalId] = useState<string | null>(null);
  const modalProject = modalId ? projects.find((p) => p.id === modalId) : null;

  const uniqueByTitle = (items: typeof projects) => {
    const seen = new Set<string>();
    return items.filter((p) => {
      if (seen.has(p.title)) return false;
      seen.add(p.title);
      return true;
    });
  };

  const filtered =
    filter === "Все"
      ? uniqueByTitle(projects)
      : projects.filter((p) => p.category === filter);

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
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer rounded-xl overflow-hidden card-elevated"
                onClick={() => setModalId(project.id)}
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
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setModalId(null)}
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
                  src={modalProject.img}
                  alt={modalProject.title}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => setModalId(null)}
                  className="absolute top-4 right-4 bg-foreground/50 text-primary-foreground rounded-full p-2 hover:bg-foreground/70 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground">{modalProject.title}</h3>
                <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {modalProject.category}
                </span>
                <p className="mt-3 text-muted-foreground">{modalProject.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
