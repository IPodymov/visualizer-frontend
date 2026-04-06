import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/routes';

export const CtaSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="relative bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Готовы выбрать своё будущее?
            </h2>
            <p className="text-lg text-violet-100 mb-8 max-w-xl mx-auto">
              Исследуйте учебные планы ведущих университетов и найдите программу, которая подходит именно вам.
            </p>
            <Link
              to={ROUTES.PLANS}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:-translate-y-0.5"
            >
              Начать просмотр
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
