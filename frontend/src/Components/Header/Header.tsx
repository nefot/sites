import {Link, useLocation} from 'react-router-dom';
import './Header.scss';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const navLinks = [
    {label: 'Главная', href: '/', active: false},
    {label: 'Новости', href: '/news', active: false},
    {label: 'База', href: '/base', active: false},
    {label: 'События', href: '/events', active: false},
];

interface HeaderProps {
    is_light?: boolean;
}

export default function Header({is_light = true}: HeaderProps) {
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    return (
        <header className={`header${is_light ? ' header--light' : ''}`}>
            <div className="header__visibiliytyt-helper">
                {/* Buttons left: Login / Register */}
                <div className="header__auth-buttons">
                    {auth.user ? (
                        <>
                            <span className="header__user">{auth.user.username}</span>
                            <button className="header__auth-btn" onClick={handleLogout}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="header__auth-btn">Войти</Link>
                            <Link to="/register" className="header__auth-btn --primary">Регистрация</Link>
                        </>
                    )}
                </div>
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
