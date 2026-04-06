import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";

export const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          Бесплатный инструмент для абитуриентов
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 mb-6 leading-tight animate-fade-in-up">
          Визуализируйте учебные планы
          <br />
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            университетов за секунды
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Сравнивайте программы, предметы и структуру обучения перед
          поступлением. Принимайте взвешенные решения о своём образовании.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Link
            to={ROUTES.PLANS}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            Посмотреть учебные планы
            <svg
              className="ml-2 w-5 h-5"
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
          <button
            onClick={scrollToHowItWorks}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 text-gray-700 dark:text-gray-300 font-semibold text-lg transition-all duration-200 hover:bg-violet-50 dark:hover:bg-violet-900/20"
          >
            Как это работает
            <svg
              className="ml-2 w-5 h-5"
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

        {/* Mock UI Preview */}
        <div className="mt-16 md:mt-20 relative animate-fade-in-up animation-delay-600">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 h-6 bg-gray-100 dark:bg-slate-700 rounded-md" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => {
                const hue = (i * 137) % 360;
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div
                      className="h-20 md:h-28"
                      style={{
                        background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 40}, 80%, 40%))`,
                      }}
                    />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-slate-600 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded w-1/2" />
                      <div className="h-8 bg-violet-100 dark:bg-violet-900/30 rounded-md mt-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-transparent to-blue-500/20 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
};
