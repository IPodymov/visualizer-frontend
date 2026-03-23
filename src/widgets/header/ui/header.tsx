import {NavLink} from 'react-router-dom'
import {useAuth} from '../../../entities/session'
import {ROUTES} from '../../../shared/lib/routes'
import './header.css'

export const Header = () => {
    const {user, isAuthenticated, signOut} = useAuth()

    return (
        <header className="header">
            <NavLink to={ROUTES.HOME} className="brand-link">
                Visualizer
            </NavLink>

            <nav className="nav-links">
                <NavLink to={ROUTES.HOME}>Главная</NavLink>

                {!isAuthenticated && <NavLink to={ROUTES.LOGIN}>Вход</NavLink>}
                {!isAuthenticated && <NavLink to={ROUTES.REGISTER}>Регистрация</NavLink>}

                {isAuthenticated && (
                    <button type="button" className="ghost-button" onClick={() => void signOut()}>
                        Выйти
                    </button>
                )}
            </nav>

            <div className="user-chip">{user ? user.email : 'Гость'}</div>
        </header>
    )
}

