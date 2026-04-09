import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(100),
  phone: z.string().trim().min(10, "Введите корректный номер").max(20),
  email: z.string().trim().email("Некорректный email").max(255),
  service: z.string().min(1, "Выберите услугу"),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof contactSchema>;

const STORAGE_KEY = "ceiling_contact_form";

const contactInfo = [
  { icon: Phone, label: "+375 (29) 123-45-67", href: "tel:+375291234567" },
  { icon: Mail, label: "info@potolki-pro.by", href: "mailto:info@potolki-pro.by" },
  { icon: MapPin, label: "г. Минск, ул. Аэродромная, д. 15", href: "#" },
  { icon: Clock, label: "Пн–Сб: 9:00–20:00", href: "#" },
];

const serviceOptions = [
  "Глянцевый потолок",
  "Матовый потолок",
  "Потолок с трековой системой",
  "Освещение и подсветка",
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState<Partial<FormData>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", result.data);
    setStatus("success");
    localStorage.removeItem(STORAGE_KEY);
    setTimeout(() => {
      setForm({});
      setStatus("idle");
    }, 3000);
  };

  return (
    <section id="contacts" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Свяжитесь с нами</h2>
          <p className="mt-3 text-muted-foreground">Оставьте заявку и мы перезвоним вам в течение 15 минут</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground group-hover:text-primary transition-colors">{c.label}</span>
              </a>
            ))}

            {/* Static map placeholder */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border aspect-[4/3] bg-muted flex items-center justify-center relative">
              <MapPin className="w-10 h-10 text-primary" />
              <span className="absolute bottom-3 text-xs text-muted-foreground">г. Минск, ул. Аэродромная, д. 15</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-5">
              {[
                { name: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                { name: "phone", label: "Телефон", type: "tel", placeholder: "+375 (__) ___-__-__" },
                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.name] || ""}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                      errors[field.name] ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Тип услуги</label>
                <select
                  value={form.service || ""}
                  onChange={(e) => update("service", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                    errors.service ? "border-destructive" : "border-border"
                  }`}
                >
                  <option value="">Выберите услугу</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Сообщение</label>
                <textarea
                  rows={3}
                  placeholder="Опишите ваш проект (необязательно)"
                  value={form.message || ""}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full gradient-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === "success" && <CheckCircle className="w-5 h-5" />}
                {status === "idle" && <Send className="w-5 h-5" />}
                {status === "error" && <AlertCircle className="w-5 h-5" />}
                {status === "idle" && "Отправить заявку"}
                {status === "loading" && "Отправка..."}
                {status === "success" && "Заявка отправлена!"}
                {status === "error" && "Ошибка, попробуйте снова"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
