import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

const navLinks = [
  { label: 'Главная', href: '/', active: false },
  { label: 'Новости', href: '/news', active: false },
  { label: 'База', href: '/base', active: false },
  { label: 'События', href: '/events', active: false },
];

interface HeaderProps {
  is_light?: boolean;
}

export default function Header({ is_light = true }: HeaderProps) {
  const location = useLocation();

  return (
    <header className={`header${is_light ? ' header--light' : ''}`}>
      <div className="header__visibiliytyt-helper">
        <div className="header__logo-container">
          <h2 className="header__logo">MedArchive</h2>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li className="header__nav-item" key={link.label}>
                <Link
                  className={`header__nav-link btn${location.pathname === link.href ? ' --active' : ''}`}
                  to={link.href}
                  role="button"
                  tabIndex={0}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
