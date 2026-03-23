import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../entities/session'
import { ROUTES } from '../../../../shared/lib/routes'
import { AuthForm } from '../../ui/auth-form'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AuthForm
      mode="register"
      title="Регистрация"
      submitLabel="Создать аккаунт"
      isLoading={isLoading}
      onSubmit={async ({ email, password, fullName }) => {
        setIsLoading(true)
        try {
          await signUp({
            email,
            password,
            fullName: fullName ?? '',
          })
          navigate(ROUTES.HOME)
        } finally {
          setIsLoading(false)
        }
      }}
    />
  )
}

