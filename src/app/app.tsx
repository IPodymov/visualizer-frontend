import { Provider } from 'react-redux'
import { AuthProvider } from '../entities/session'
import { AppRouter } from './providers/router'
import { store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  )
}
