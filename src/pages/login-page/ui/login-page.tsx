import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth/login'
import { ROUTES } from '@/shared/lib/routes'
import '@/pages/login-page/ui/login-page.css'

export const LoginPage = () => {
  return (
    <section className="auth-page">
      <LoginForm />
      <p className="hint-text">
        Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрируйтесь</Link>
      </p>
    </section>
  )
}

