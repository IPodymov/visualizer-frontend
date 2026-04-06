import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/routes';
import './cta-section.css';

export const CtaSection = () => {
  return (
    <section className="cta">
      <div className="cta__container">
        <div className="cta__box">
          <div className="cta__bg-circle cta__bg-circle--top" />
          <div className="cta__bg-circle cta__bg-circle--bottom" />

          <div className="cta__content">
            <h2 className="cta__title">Готовы выбрать своё будущее?</h2>
            <p className="cta__desc">
              Исследуйте учебные планы ведущих университетов и найдите программу, которая подходит именно вам.
            </p>
            <Link to={ROUTES.PLANS} className="cta__button">
              Начать просмотр
              <svg className="cta__button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
