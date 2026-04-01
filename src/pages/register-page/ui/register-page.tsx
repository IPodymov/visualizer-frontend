import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/register'
import { ROUTES } from '@/shared/lib/routes'
import '@/pages/register-page/ui/register-page.css'

export const RegisterPage = () => {
  return (
    <section className="auth-page">
      <RegisterForm />
      <p className="hint-text">
        Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
      </p>
    </section>
  )
}

