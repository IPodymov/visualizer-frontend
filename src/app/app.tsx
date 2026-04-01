import { Provider } from 'react-redux'
import { AuthProvider } from '@/entities/session'
import { AppRouter } from '@/app/providers/router'
import { store } from '@/app/store'

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  )
}
