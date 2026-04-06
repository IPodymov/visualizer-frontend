import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { ROUTES } from '@/shared/lib/routes';
import { useTheme } from '@/shared/lib/use-theme';
import '@/widgets/header/ui/header.css';

export const Header = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <Link to={ROUTES.HOME} className="brand-link">
        Academic Visualizer
      </Link>

      <nav className="nav-links">
        <Link to={ROUTES.PLANS} className="nav-link">
          Учебные планы
        </Link>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
          title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>

        {isAuthenticated ? (
          <div className="user-dropdown-container" ref={dropdownRef}>
            <button
              className="user-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="user-avatar-placeholder">{user?.email?.[0].toUpperCase() || 'U'}</div>
              <span className="user-name">{user?.full_name || user?.email}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to={ROUTES.PROFILE}
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Профиль
                </Link>
                <button
                  className="dropdown-item logout-btn"
                  onClick={() => {
                    setDropdownOpen(false);
                    void signOut();
                  }}>
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to={ROUTES.LOGIN} className="auth-button">
            Войти
          </Link>
        )}
      </nav>
    </header>
  );
};
