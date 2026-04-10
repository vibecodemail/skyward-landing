import { Phone, Mail, MapPin } from "lucide-react";
import smileLogo from "@/assets/smile.png";

const quickLinks = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & desc */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl font-heading font-bold">
              Art<span className="opacity-70">Potolki</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
              Профессиональная установка натяжных потолков в Минске и РБ. Качество, скорость, гарантия.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" /> +375 (33) 360-78-06
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" /> info@ArtPotolki.by
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" /> г. Минск, ул. Матусевича, 8
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex gap-3">
              {[
                { label: "VK", href: "https://vk.com/club74222778" },
                { label: "TG", href: "https://t.me/Art999993" }
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-semibold hover:bg-primary-foreground/20 transition-colors"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} ArtPotolki. Все права защищены.
        </div>
        <div className="mt-4 flex justify-center">
          <img
            src={smileLogo}
            alt="Amazon smile"
            className="h-auto w-full max-w-xs"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
