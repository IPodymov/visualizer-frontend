import { FeatureCard } from "./feature-card";

const steps = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Выберите университет или программу",
    description:
      "Найдите интересующий вас вуз или направление подготовки с помощью удобного поиска и фильтров.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
    ),
    title: "Просмотрите структуру обучения",
    description:
      "Изучите полный учебный план: предметы по семестрам, часы, типы занятий и формы контроля.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    title: "Сравните разные планы",
    description:
      "Выберите до трёх учебных планов и сравните их структуру, нагрузку и дисциплины бок о бок.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Три простых шага для выбора идеальной образовательной программы
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FeatureCard
              key={index}
              step={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
