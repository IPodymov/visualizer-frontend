import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../entities/session'
import { ROUTES } from '../../../../shared/lib/routes'
import { AuthForm } from '../../ui/auth-form'

export const LoginForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AuthForm
      mode="login"
      title="Вход"
      submitLabel="Войти"
      isLoading={isLoading}
      onSubmit={async ({ email, password }) => {
        setIsLoading(true)
        try {
          await signIn({ email, password })
          navigate(ROUTES.HOME)
        } finally {
          setIsLoading(false)
        }
      }}
    />
  )
}

