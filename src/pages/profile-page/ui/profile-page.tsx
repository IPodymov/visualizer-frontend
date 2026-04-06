// src/pages/profile-page/ui/profile-page.tsx
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFavorites,
  selectHistory,
  clearHistory,
  ToggleFavoriteButton,
} from '@/features/user-preferences';
import { PlanCard } from '@/entities/plan';
import { useAuth } from '@/entities/session';
import '@/pages/profile-page/ui/profile-page.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const favorites = useSelector(selectFavorites);
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();

  return (
    <section className="profile-page">
      <div className="profile-header">
        <h1>Профиль</h1>
        {user && (
          <div className="user-info">
            <p className="user-name">{user.full_name || 'Пользователь'}</p>
            <p className="user-email">{user.email}</p>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Избранное ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <p className="empty-state">Нет избранных планов</p>
        ) : (
          <div className="plans-grid">
            {favorites.map((plan) => (
              <div key={plan.id} className="plan-wrapper">
                <PlanCard
                  plan={plan}
                  specialtyName={plan.specialtyName}
                  actionSlot={
                    <ToggleFavoriteButton plan={plan} specialtyName={plan.specialtyName} />
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>История просмотров</h2>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={() => dispatch(clearHistory())}>
              Очистить
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="empty-state">История пуста</p>
        ) : (
          <div className="plans-grid">
            {history.map((plan) => (
              <div key={plan.id} className="plan-wrapper">
                <PlanCard
                  plan={plan}
                  specialtyName={plan.specialtyName}
                  actionSlot={
                    <ToggleFavoriteButton plan={plan} specialtyName={plan.specialtyName} />
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
