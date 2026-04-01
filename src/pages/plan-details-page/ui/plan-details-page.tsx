import { useParams, Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useGetPlanByIdQuery, useGetSpecialtyByIdQuery } from "@/entities/plan";
import {
  addToHistory,
  ToggleFavoriteButton,
} from "@/features/user-preferences";
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
  const dispatch = useDispatch();

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
    if (plan && specialty) {
      dispatch(
        addToHistory({
          ...plan,
          specialtyName: `${specialty.code} ${specialty.name}`,
        }),
      );
    }
  }, [plan, specialty, dispatch]);

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
          <ToggleFavoriteButton plan={plan} specialtyName={specialty?.name} />
        </div>

        <div className="header-meta">
          <div className="meta-item">
            <span className="meta-label">Год набора</span>
            <span className="meta-value">{plan.admission_year}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Дисциплин</span>
            <span className="meta-value">{plan.items.length}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">ID Плана</span>
            <span className="meta-value">#{plan.id}</span>
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
