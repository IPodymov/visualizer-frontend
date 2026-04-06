import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";
import "./hero-section.css";

export const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__bg-blob--primary" />
        <div className="hero__bg-blob--secondary" />
      </div>

      <div className="hero__container">
        <div className="hero__badge entrance-fade">
          <span className="hero__badge-dot" />
          Бесплатный инструмент для абитуриентов
        </div>

        <h1 className="hero__title entrance-slide-up">
          Визуализируйте учебные планы
          <br />
          <span className="hero__title-accent">университетов за секунды</span>
        </h1>

        <p className="hero__subtitle entrance-slide-up delay-200">
          Сравнивайте программы, предметы и структуру обучения перед
          поступлением. Принимайте взвешенные решения о своём образовании.
        </p>

        <div className="hero__actions entrance-slide-up delay-400">
          <Link to={ROUTES.PLANS} className="hero__cta-primary">
            Посмотреть учебные планы
            <svg
              className="hero__cta-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <button onClick={scrollToHowItWorks} className="hero__cta-secondary">
            Как это работает
            <svg
              className="hero__cta-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div className="hero__preview entrance-slide-up delay-600">
          <div className="hero__preview-window">
            <div className="hero__preview-dots">
              <div className="hero__preview-dot hero__preview-dot--red" />
              <div className="hero__preview-dot hero__preview-dot--yellow" />
              <div className="hero__preview-dot hero__preview-dot--green" />
              <div className="hero__preview-url" />
            </div>
            <div className="hero__preview-grid">
              {[1, 2, 3].map((i) => {
                const hue = (i * 137) % 360;
                return (
                  <div key={i} className="hero__preview-card">
                    <div
                      className="hero__preview-card-img"
                      style={{
                        background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 40}, 80%, 40%))`,
                      }}
                    />
                    <div className="hero__preview-card-body">
                      <div className="hero__preview-line hero__preview-line--title" />
                      <div className="hero__preview-line hero__preview-line--sub" />
                      <div className="hero__preview-line hero__preview-line--action" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hero__preview-glow" />
        </div>
      </div>
    </section>
  );
};
