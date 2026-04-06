import { type ReactElement, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "@/entities/session";
import { ROUTES } from "@/shared/lib/routes";
import { Header } from "@/widgets/header";

const LandingPage = lazy(() =>
  import("@/pages/landing-page").then((m) => ({ default: m.LandingPage })),
);
const PlansPage = lazy(() =>
  import("@/pages/plans-page").then((m) => ({ default: m.PlansPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/login-page").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("@/pages/register-page").then((m) => ({ default: m.RegisterPage })),
);
const PlanDetailsPage = lazy(() =>
  import("@/pages/plan-details-page/ui/plan-details-page").then((m) => ({
    default: m.PlanDetailsPage,
  })),
);
const ProfilePage = lazy(() =>
  import("@/pages/profile-page").then((m) => ({ default: m.ProfilePage })),
);
const ComparePage = lazy(() =>
  import("@/pages/compare-page").then((m) => ({ default: m.ComparePage })),
);

const PageLoader = () => (
  <div
    className="page-state"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <p>Загрузка...</p>
  </div>
);

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

const AppLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === ROUTES.HOME;

  return (
    <div className="app-shell">
      <Header />
      <main className={isLanding ? "" : "page-content"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route path={ROUTES.PLANS} element={<PlansPage />} />
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
        </Suspense>
      </main>
    </div>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};
