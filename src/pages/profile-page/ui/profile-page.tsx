// src/pages/profile-page/ui/profile-page.tsx
import { Link } from 'react-router-dom';
import {
  useGetFavoritesQuery,
  useGetHistoryQuery,
  useGetPlanByIdQuery,
} from '@/entities/plan';
import {
  ToggleFavoriteButton,
} from '@/features/user-preferences';
import { useAuth } from '@/entities/session';
import { ROUTES } from '@/shared/lib/routes';
import '@/pages/profile-page/ui/profile-page.css';

const FavoritePlanCard = ({ planId }: { planId: number }) => {
  const { data: plan } = useGetPlanByIdQuery(planId);

  if (!plan) return null;

  return (
    <div className="plan-wrapper">
      <div className="mini-plan-card">
        <div className="mini-plan-card__header">
          <span className="mini-plan-card__year">{plan.admission_year}</span>
          <ToggleFavoriteButton planId={plan.id} />
        </div>
        <h3 className="mini-plan-card__title">
          {plan.profile ?? `План #${plan.id}`}
        </h3>
        <p className="mini-plan-card__meta">
          {plan.qualification && <span>{plan.qualification}</span>}
          {plan.items.length > 0 && <span> · {plan.items.length} дисц.</span>}
        </p>
        <Link to={ROUTES.PLAN.replace(':id', String(plan.id))} className="mini-plan-card__link">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const { user } = useAuth();
  const { data: favorites, isLoading: favLoading } = useGetFavoritesQuery();
  const { data: history, isLoading: histLoading } = useGetHistoryQuery({});

  return (
    <section className="profile-page">
      <div className="profile-header">
        <h1>Профиль</h1>
        {user && (
          <div className="user-info">
            <p className="user-name">{user.full_name || 'Пользователь'}</p>
            <p className="user-email">{user.email}</p>
            <p className="user-role">{user.role}</p>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Избранное ({favorites?.length ?? 0})</h2>
        {favLoading && <p className="empty-state">Загрузка...</p>}
        {!favLoading && (!favorites || favorites.length === 0) ? (
          <p className="empty-state">Нет избранных планов</p>
        ) : (
          <div className="plans-grid">
            {favorites?.map((fav) => (
              <FavoritePlanCard key={fav.id} planId={fav.id} />
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>История просмотров</h2>
        </div>
        {histLoading && <p className="empty-state">Загрузка...</p>}
        {!histLoading && (!history || history.length === 0) ? (
          <p className="empty-state">История пуста</p>
        ) : (
          <div className="plans-grid">
            {history?.map((item) => (
              <div key={item.id} className="plan-wrapper">
                <div className="mini-plan-card">
                  <div className="mini-plan-card__header">
                    <span className="mini-plan-card__date">
                      {new Date(item.viewed_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <h3 className="mini-plan-card__title">
                    {item.plan
                      ? (item.plan.profile ?? `План #${item.plan_id}`)
                      : `План #${item.plan_id}`}
                  </h3>
                  {item.plan?.specialty && (
                    <p className="mini-plan-card__meta">
                      {item.plan.specialty.code} {item.plan.specialty.name}
                    </p>
                  )}
                  <Link
                    to={ROUTES.PLAN.replace(':id', String(item.plan_id))}
                    className="mini-plan-card__link"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
