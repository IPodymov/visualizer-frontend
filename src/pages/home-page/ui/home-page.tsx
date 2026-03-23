import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../entities/session';
import { PlanCard, useGetPlansQuery, useGetSpecialtiesQuery } from '../../../entities/plan';
import { ROUTES } from '../../../shared/lib/routes';
import './home-page.css';

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { data: plans, isLoading: plansLoading, error: plansError } = useGetPlansQuery({});
  const { data: specialties } = useGetSpecialtiesQuery({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedPlanIds, setSelectedPlanIds] = useState<Set<number>>(new Set());
  const [visibleCount, setVisibleCount] = useState(8);

  const specialtyMap = useMemo(() => {
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
      const specialtyName = specialtyMap.get(plan.specialty_id) || '';
      const matchesSearch = specialtyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === 'all' || plan.admission_year === Number(selectedYear);
      return matchesSearch && matchesYear;
    });
  }, [plans, searchQuery, selectedYear, specialtyMap]);

  const togglePlanSelection = (id: number) => {
    const newSet = new Set(selectedPlanIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      if (newSet.size >= 3) {
        alert('Можно выбрать не более 3 планов для сравнения');
        return;
      }
      newSet.add(id);
    }
    setSelectedPlanIds(newSet);
  };

  return (
    <section className="home-page">
      <h1>Academic Plan Visualizer</h1>
      <p className="lead">Визуализация и анализ учебных планов ВУЗов.</p>

      {isAuthenticated ? (
        <div className="card welcome-card">
          <h2>Добро пожаловать, {user?.full_name || user?.email}</h2>
        </div>
      ) : (
        <div className="card welcome-card">
          <h2>Начните работу</h2>
          <p>Чтобы сохранить избранные учебные планы, войдите или зарегистрируйтесь.</p>
          <div className="actions-row">
            <Link className="button-link" to={ROUTES.LOGIN}>
              Войти
            </Link>
            <Link className="button-link" to={ROUTES.REGISTER}>
              Регистрация
            </Link>
          </div>
        </div>
      )}

      <h2 className="section-title">Учебные планы</h2>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Поиск по специальности..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="year-select"
        >
          <option value="all">Все годы</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {plansLoading && <p className="page-state">Загрузка учебных планов...</p>}

      {plansError && (
        <p className="error-text">
          Не удалось загрузить учебные планы. Попробуйте обновить страницу.
        </p>
      )}

      {!plansLoading && !plansError && filteredPlans.length === 0 && (
        <p className="page-state">
          {plans && plans.length === 0 ? 'Учебных планов пока нет.' : 'По вашему запросу ничего не найдено.'}
        </p>
      )}

      {filteredPlans.length > 0 && (
        <>
          <div className="plans-grid">
            {filteredPlans.slice(0, visibleCount).map((plan) => {
              const isSelected = selectedPlanIds.has(plan.id);
              return (
                <div key={plan.id} className={`plan-card-compare-wrapper ${isSelected ? 'selected' : ''}`} onClick={() => {
                    // Prevent navigation if clicking the checkbox/overlay area
                    // But here we wrap loosely
                }}>
                  <label className="compare-checkbox-label">
                      <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => togglePlanSelection(plan.id)}
                      />
                      <span>Сравнить</span>
                  </label>
                  <PlanCard plan={plan} specialtyName={specialtyMap.get(plan.specialty_id)} />
                </div>
            )})}
          </div>
          
          {visibleCount < filteredPlans.length && (
            <div className="load-more-container">
              <button 
                className="load-more-button"
                onClick={() => setVisibleCount(prev => prev + 8)}
              >
                Показать еще ({filteredPlans.length - visibleCount})
              </button>
            </div>
          )}
        </>
      )}

      {selectedPlanIds.size > 0 && (
          <div className="compare-fab">
            <div className="fab-info">
                <span>Выбрано: {selectedPlanIds.size}</span>
                <button onClick={() => setSelectedPlanIds(new Set())}>✕</button>
            </div>
            <Link 
                to={`${ROUTES.COMPARE}?plans=${Array.from(selectedPlanIds).join(',')}`} 
                className="fab-action"
            >
                Сравнить планы →
            </Link>
          </div>
      )}
    </section>
  );
};
