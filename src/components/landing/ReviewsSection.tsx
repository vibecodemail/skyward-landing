import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Анна Петрова", rating: 5, text: "Отличная работа! Потолок установили за 3 часа, всё чисто и аккуратно. Очень довольна результатом, рекомендую всем!", avatar: "АП" },
  { name: "Дмитрий Козлов", rating: 5, text: "Заказывал многоуровневый потолок с подсветкой в зал. Результат превзошёл все ожидания. Мастера — настоящие профессионалы.", avatar: "ДК" },
  { name: "Елена Смирнова", rating: 5, text: "Уже второй раз обращаемся. Сделали потолки в двух комнатах и на кухне. Качество на высоте, цены адекватные.", avatar: "ЕС" },
  { name: "Михаил Волков", rating: 4, text: "Хороший сервис и качественные материалы. Монтажники приехали вовремя, всё сделали быстро. Потолок выглядит идеально.", avatar: "МВ" },
  { name: "Ольга Новикова", rating: 5, text: "Потолок с фотопечатью в детской — просто сказка! Ребёнок в восторге. Спасибо за профессионализм и внимание к деталям.", avatar: "ОН" },
];

const ReviewsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section id="reviews" className="section-padding section-alt" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Отзывы клиентов</h2>
          <p className="mt-3 text-muted-foreground">Что говорят о нас наши клиенты</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="card-elevated p-8 md:p-10 text-center relative"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto text-xl font-bold text-primary-foreground">
            {reviews[current].avatar}
          </div>

          <h3 className="mt-4 text-lg font-heading font-semibold text-foreground">{reviews[current].name}</h3>

          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < reviews[current].rating ? "text-gold fill-gold" : "text-muted"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg mx-auto">
            «{reviews[current].text}»
          </p>

          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
