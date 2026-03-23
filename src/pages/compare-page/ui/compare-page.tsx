import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPlanByIdQuery } from '../../../entities/plan/api/plan-api';
import { ComputingLandscape } from '../../../widgets/computing-landscape';
import { ROUTES } from '../../../shared/lib/routes';
import './compare-page.css';

export const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planIds =
    searchParams
      .get('plans')
      ?.split(',')
      .map(Number)
      .filter((id) => !isNaN(id)) || [];

  if (planIds.length === 0) {
    return (
      <div className="compare-empty">
        <h2>Нет выбранных планов для сравнения</h2>
        <button onClick={() => navigate(ROUTES.HOME)} className="back-btn">
          Вернуться к выбору
        </button>
      </div>
    );
  }

  return (
    <section className="compare-page">
      <div className="compare-header">
        <h1>Сравнение учебных планов</h1>
        <button onClick={() => navigate(ROUTES.HOME)} className="back-btn">
          ← Вернуться назад
        </button>
      </div>

      <div className="compare-grid">
        {planIds.map((id) => (
          <PlanColumn key={id} planId={id} />
        ))}
      </div>
    </section>
  );
};

const PlanColumn = ({ planId }: { planId: number }) => {
  const { data: plan, isLoading, error } = useGetPlanByIdQuery(planId);

  if (isLoading) return <div className="plan-column loading">Загрузка...</div>;
  if (error || !plan) return <div className="plan-column error">Ошибка загрузки</div>;

  return (
    <div className="plan-column">
      <div className="column-header">
        <h3>{plan.specialty_id ? `Специальность #${plan.specialty_id}` : `План #${plan.id}`}</h3>
        <div className="plan-meta">
          <span className="meta-badge">{plan.admission_year}</span>
          <span className="meta-badge">{plan.items.length} дисциплин</span>
        </div>
      </div>

      <div className="landscape-wrapper-compare">
        <ComputingLandscape plan={plan} />
      </div>
    </div>
  );
};
