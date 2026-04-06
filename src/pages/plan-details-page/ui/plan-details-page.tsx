import { useParams, Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import {
  useGetPlanByIdQuery,
  useGetSpecialtyByIdQuery,
  useAddToHistoryMutation,
} from "@/entities/plan";
import { ToggleFavoriteButton } from "@/features/user-preferences";
import { useAuth } from "@/entities/session";
import { PlanMap } from "@/widgets/plan-map";
import { PlanTable } from "@/widgets/plan-table";
import { ROUTES } from "@/shared/lib/routes";
import "@/pages/plan-details-page/ui/plan-details-page.css";

const ComputingLandscape = lazy(async () => {
  const mod = await import("@/widgets/computing-landscape");
  return { default: mod.ComputingLandscape };
});

export const PlanDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const planId = Number(id);
  const { isAuthenticated } = useAuth();
  const [addToHistory] = useAddToHistoryMutation();

  const {
    data: plan,
    isLoading,
    error,
  } = useGetPlanByIdQuery(planId, {
    skip: isNaN(planId),
  });

  const { data: specialty } = useGetSpecialtyByIdQuery(
    plan?.specialty_id ?? -1,
    {
      skip: !plan,
    },
  );

  useEffect(() => {
    if (plan && isAuthenticated) {
      void addToHistory(plan.id);
    }
  }, [plan, isAuthenticated, addToHistory]);

  if (isLoading) {
    return <div className="page-state">Загрузка плана...</div>;
  }

  if (error || !plan) {
    return (
      <div className="error-text">
        <p>Не удалось найти учебный план.</p>
        <Link to={ROUTES.HOME} className="button-link">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <section className="plan-details-page">
      <div className="page-header">
        <Link to={ROUTES.HOME} className="back-link">
          ← К списку планов
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1>
            {specialty
              ? `${specialty.code} ${specialty.name}`
              : `Специальность #${plan.specialty_id}`}
          </h1>
          <ToggleFavoriteButton planId={plan.id} />
        </div>

        <div className="header-meta">
          <div className="meta-item">
            <span className="meta-label">Год набора</span>
            <span className="meta-value">{plan.admission_year}</span>
          </div>
          {plan.qualification && (
            <div className="meta-item">
              <span className="meta-label">Квалификация</span>
              <span className="meta-value">{plan.qualification}</span>
            </div>
          )}
          {plan.study_form && (
            <div className="meta-item">
              <span className="meta-label">Форма обучения</span>
              <span className="meta-value">
                {plan.study_form === "full_time"
                  ? "Очная"
                  : plan.study_form === "part_time"
                    ? "Заочная"
                    : "Дистанционная"}
              </span>
            </div>
          )}
          {plan.study_duration && (
            <div className="meta-item">
              <span className="meta-label">Срок обучения</span>
              <span className="meta-value">{plan.study_duration}</span>
            </div>
          )}
          <div className="meta-item">
            <span className="meta-label">Дисциплин</span>
            <span className="meta-value">{plan.items.length}</span>
          </div>
        </div>
      </div>

      <div className="plan-visualization">
        <Suspense
          fallback={<div className="page-state">Загрузка графика...</div>}
        >
          <ComputingLandscape plan={plan} />
        </Suspense>
        <PlanMap plan={plan} />
        <PlanTable plan={plan} />
      </div>
    </section>
  );
};
