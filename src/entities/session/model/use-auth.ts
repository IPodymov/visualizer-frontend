import { useContext } from 'react'
import { AuthContext } from '@/entities/session/model/context'

export const useAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return auth
}

