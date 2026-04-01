import { lazy, Suspense, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetPlanByIdQuery,
  useGetSpecialtiesQuery,
} from "@/entities/plan/api/plan-api";
import type { AcademicPlan } from "@/entities/plan/model/types";
import { ROUTES } from "@/shared/lib/routes";
import "@/pages/compare-page/ui/compare-page.css";

const UnifiedLandscapeChart = lazy(async () => {
  const mod = await import("@/pages/compare-page/ui/unified-landscape-chart");
  return { default: mod.UnifiedLandscapeChart };
});

export const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedPlanIds =
    searchParams
      .get("plans")
      ?.split(",")
      .map(Number)
      .filter((id) => !isNaN(id)) || [];
  const planIds = requestedPlanIds.slice(0, 3);

  const queryOne = useGetPlanByIdQuery(planIds[0] ?? -1, {
    skip: planIds.length < 1,
  });
  const queryTwo = useGetPlanByIdQuery(planIds[1] ?? -1, {
    skip: planIds.length < 2,
  });
  const queryThree = useGetPlanByIdQuery(planIds[2] ?? -1, {
    skip: planIds.length < 3,
  });
  const { data: specialties } = useGetSpecialtiesQuery({ limit: 500 });

  const activeQueries = [queryOne, queryTwo, queryThree].slice(0, planIds.length);

  const isLoading = activeQueries.some((query) => query.isLoading || query.isFetching);
  const hasError = activeQueries.some((query) => Boolean(query.error));

  const plans = useMemo(() => {
    return [queryOne.data, queryTwo.data, queryThree.data].filter(
      (plan): plan is AcademicPlan => Boolean(plan),
    );
  }, [queryOne.data, queryTwo.data, queryThree.data]);

  const specialtyMap = useMemo(() => {
    if (!specialties) return new Map<number, string>();
    return new Map(specialties.map((s) => [s.id, `${s.code} ${s.name}`]));
  }, [specialties]);

  const planTitles = useMemo(() => {
    return new Map(
      plans.map((plan) => [
        plan.id,
        specialtyMap.get(plan.specialty_id) ?? `План #${plan.id}`,
      ]),
    );
  }, [plans, specialtyMap]);

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

  if (isLoading) {
    return <div className="page-state">Загрузка выбранных планов...</div>;
  }

  if (hasError || plans.length === 0) {
    return (
      <div className="compare-empty">
        <h2>Не удалось загрузить планы для сравнения</h2>
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

      {requestedPlanIds.length > 3 && (
        <p className="compare-note">
          Для визуального сравнения используется максимум 3 плана.
        </p>
      )}

      <div className="compare-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-column">
            <div className="column-header">
              <h3>{planTitles.get(plan.id) ?? `План #${plan.id}`}</h3>
              <div className="plan-meta">
                <span className="meta-badge">Год: {plan.admission_year}</span>
                <span className="meta-badge">Дисциплин: {plan.items.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="compare-chart-card">
        <h2>Объединенный ландшафт (один график)</h2>
        <Suspense fallback={<div className="page-state">Загрузка графика...</div>}>
          <UnifiedLandscapeChart plans={plans} planTitles={planTitles} />
        </Suspense>
      </div>
    </section>
  );
};
