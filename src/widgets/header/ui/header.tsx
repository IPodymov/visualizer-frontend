import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../entities/session';
import { ROUTES } from '../../../shared/lib/routes';
import './header.css';

export const Header = () => {
  const { user, isAuthenticated, signOut } = useAuth();
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
