import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/entities/session";
import {
  PlanCard,
  useGetPlansQuery,
  useGetSpecialtiesQuery,
  useGetFacultiesQuery,
  type Specialty,
} from "@/entities/plan";
import { ToggleFavoriteButton } from "@/features/user-preferences";
import { ROUTES } from "@/shared/lib/routes";
import "@/pages/plans-page/ui/plans-page.css";

export const PlansPage = () => {
  const { isAuthenticated } = useAuth();
  const {
    data: plans,
    isLoading: plansLoading,
    error: plansError,
  } = useGetPlansQuery({});
  const { data: specialties } = useGetSpecialtiesQuery({});
  const { data: faculties } = useGetFacultiesQuery({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedPlanIds, setSelectedPlanIds] = useState<Set<number>>(
    new Set(),
  );
  const [visibleCount, setVisibleCount] = useState(12);

  const specialtyMap = useMemo(() => {
    if (!specialties) return new Map<number, Specialty>();
    return new Map(specialties.map((s) => [s.id, s]));
  }, [specialties]);

  const specialtyNameMap = useMemo(() => {
    if (!specialties) return new Map<number, string>();
    return new Map(specialties.map((s) => [s.id, `${s.code} ${s.name}`]));
  }, [specialties]);

  const uniqueYears = useMemo(() => {
    if (!plans) return [];
    const years = new Set(plans.map((p) => p.admission_year));
    return Array.from(years).sort((a, b) => b - a);
  }, [plans]);

  const filteredPlans = useMemo(() => {
    if (!plans) return [];
    return plans.filter((plan) => {
      const specialty = specialtyMap.get(plan.specialty_id);
      const specialtyName = specialtyNameMap.get(plan.specialty_id) || "";
      const matchesSearch = specialtyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesYear =
        selectedYear === "all" || plan.admission_year === Number(selectedYear);
      const matchesFaculty =
        selectedFaculty === "all" ||
        (specialty && specialty.faculty_id === Number(selectedFaculty));
      const matchesLevel =
        selectedLevel === "all" ||
        (specialty && specialty.level === selectedLevel);
      return matchesSearch && matchesYear && matchesFaculty && matchesLevel;
    });
  }, [
    plans,
    searchQuery,
    selectedYear,
    selectedFaculty,
    selectedLevel,
    specialtyMap,
    specialtyNameMap,
  ]);

  const uniqueLevels = useMemo(() => {
    if (!specialties) return [];
    const levels = new Set(specialties.map((s) => s.level).filter(Boolean));
    return Array.from(levels);
  }, [specialties]);

  const togglePlanSelection = (id: number) => {
    const newSet = new Set(selectedPlanIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      if (newSet.size >= 3) {
        alert("Можно выбрать не более 3 планов для сравнения");
        return;
      }
      newSet.add(id);
    }
    setSelectedPlanIds(newSet);
  };

  return (
    <section className="plans-page">
      <div className="plans-page__header">
        <div>
          <h1 className="plans-page__title">Учебные планы</h1>
          <p className="plans-page__subtitle">
            Найдите и сравните образовательные программы
          </p>
        </div>
        {!isAuthenticated && (
          <div className="plans-page__auth-hint">
            <Link to={ROUTES.LOGIN} className="plans-page__auth-link">
              Войдите
            </Link>
            , чтобы сохранять в избранное
          </div>
        )}
      </div>

      {/* Search and filters */}
      <div className="filters-bar">
        <div className="filters-bar__search">
          <svg
            className="filters-bar__search-icon"
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
          <input
            type="text"
            placeholder="Поиск университета или программы..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filters-bar__input"
          />
        </div>

        <div className="filters-bar__selects">
          {faculties && faculties.length > 0 && (
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="filters-bar__select"
            >
              <option value="all">Все факультеты</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.short_name || f.name}
                </option>
              ))}
            </select>
          )}

          {uniqueLevels.length > 0 && (
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filters-bar__select"
            >
              <option value="all">Все уровни</option>
              {uniqueLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filters-bar__select"
          >
            <option value="all">Все годы</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state with skeletons */}
      {plansLoading && (
        <div className="plans-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-card__image skeleton-pulse" />
              <div className="skeleton-card__content">
                <div
                  className="skeleton-card__line skeleton-pulse"
                  style={{ width: "80%" }}
                />
                <div
                  className="skeleton-card__line skeleton-pulse"
                  style={{ width: "50%" }}
                />
                <div className="skeleton-card__line skeleton-card__line--short skeleton-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {plansError && (
        <div className="plans-empty-state plans-empty-state--error">
          <svg
            className="plans-empty-state__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3>Не удалось загрузить учебные планы</h3>
          <p>Попробуйте обновить страницу</p>
        </div>
      )}

      {/* Empty state */}
      {!plansLoading && !plansError && filteredPlans.length === 0 && (
        <div className="plans-empty-state">
          <svg
            className="plans-empty-state__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3>Ничего не найдено</h3>
          <p>
            {plans && plans.length === 0
              ? "Учебных планов пока нет."
              : "Попробуйте изменить параметры поиска или фильтры."}
          </p>
        </div>
      )}

      {/* Plans grid */}
      {filteredPlans.length > 0 && (
        <>
          <div className="plans-results-count">
            Найдено: {filteredPlans.length}
          </div>
          <div className="plans-grid">
            {filteredPlans.slice(0, visibleCount).map((plan) => {
              const isSelected = selectedPlanIds.has(plan.id);
              return (
                <div
                  key={plan.id}
                  className={`plan-card-compare-wrapper ${isSelected ? "selected" : ""}`}
                >
                  <div
                    className="plan-compare-checkbox"
                    title="Добавить к сравнению"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => togglePlanSelection(plan.id)}
                    />
                  </div>
                  <PlanCard
                    plan={plan}
                    specialtyName={specialtyNameMap.get(plan.specialty_id)}
                    actionSlot={
                      <ToggleFavoriteButton
                        plan={plan}
                        specialtyName={specialtyNameMap.get(plan.specialty_id)}
                      />
                    }
                  />
                </div>
              );
            })}
          </div>

          {visibleCount < filteredPlans.length && (
            <div className="load-more-container">
              <button
                className="load-more-button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
              >
                Показать еще ({filteredPlans.length - visibleCount})
              </button>
            </div>
          )}
        </>
      )}

      {/* Compare FAB */}
      {selectedPlanIds.size > 0 && (
        <div className="compare-fab">
          <div className="fab-info">
            <span>Выбрано: {selectedPlanIds.size}</span>
            <button onClick={() => setSelectedPlanIds(new Set())}>✕</button>
          </div>
          <Link
            to={`${ROUTES.COMPARE}?plans=${Array.from(selectedPlanIds).join(",")}`}
            className="fab-action"
          >
            Сравнить планы →
          </Link>
        </div>
      )}
    </section>
  );
};
