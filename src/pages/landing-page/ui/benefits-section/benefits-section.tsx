import './benefits-section.css';

const benefits = [
  {
    icon: (
      <svg className="benefit-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Экономия времени',
    description: 'Не нужно искать информацию на разных сайтах — всё в одном месте.',
  },
  {
    icon: (
      <svg className="benefit-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Наглядная структура обучения',
    description: 'Интерактивные графики и таблицы помогут быстро оценить программу.',
  },
  {
    icon: (
      <svg className="benefit-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Удобное сравнение программ',
    description: 'Сравнивайте до трёх учебных планов одновременно с детальной аналитикой.',
  },
  {
    icon: (
      <svg className="benefit-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Помощь в выборе направления',
    description: 'Понимайте, что вас ждёт на каждом этапе обучения ещё до подачи документов.',
  },
];

export const BenefitsSection = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <div className="benefits__heading">
          <h2 className="benefits__title">Почему выбирают нас</h2>
          <p className="benefits__subtitle">
            Инструмент, который помогает принимать правильные решения об образовании
          </p>
        </div>

        <div className="benefits__grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-card__icon-wrap">
                {benefit.icon}
              </div>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
