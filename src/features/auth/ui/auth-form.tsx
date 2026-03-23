import { useState, type FormEvent } from 'react'
import './auth-form.css'
import { Link } from 'react-router-dom'

type AuthFormValues = {
  email: string
  password: string
  fullName?: string
}

type AuthFormProps = {
  mode: 'login' | 'register'
  title: string
  submitLabel: string
  isLoading?: boolean
  onSubmit: (values: AuthFormValues) => Promise<void>
}

export const AuthForm = ({
  mode,
  title,
  submitLabel,
  isLoading = false,
  onSubmit,
}: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await onSubmit({ email, password, fullName })
    } catch (submitError) {
      const fallback = 'Не удалось выполнить запрос. Попробуйте снова.'
      if (submitError instanceof Error && submitError.message) {
        setError(submitError.message)
        return
      }

      setError(fallback)
    }
  }

  return (
    <section className="auth-card">
      <h1>{title}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <label>
            Имя
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Иван Петров"
              minLength={2}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="******"
            minLength={6}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : submitLabel}
        </button>
      </form>
    </section>
  )
}

