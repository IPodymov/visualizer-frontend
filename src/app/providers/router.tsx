import { type ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { LoginPage } from '@/pages/login-page';
import { HomePage } from '@/pages/home-page';
import { RegisterPage } from '@/pages/register-page';
import { PlanDetailsPage } from '@/pages/plan-details-page/ui/plan-details-page';
import { ProfilePage } from '@/pages/profile-page';
import { ComparePage } from '@/pages/compare-page';
import { ROUTES } from '@/shared/lib/routes';
import { Header } from '@/widgets/header';

const GuestOnly = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <p className="page-state">Проверяем сессию...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route
              path={ROUTES.LOGIN}
              element={
                <GuestOnly>
                  <LoginPage />
                </GuestOnly>
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                <GuestOnly>
                  <RegisterPage />
                </GuestOnly>
              }
            />
            <Route path={ROUTES.PLAN} element={<PlanDetailsPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.COMPARE} element={<ComparePage />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
