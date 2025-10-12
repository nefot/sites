import { useState } from 'react';
import './Header.scss';

const navLinks = [
    { label: 'Новости', href: '#' ,active:false },
    { label: 'База', href: '#',active:false  },
    { label: 'События', href: '#' ,active:false },
];

interface HeaderProps {
    is_light?: boolean;
}

export default function Header({ is_light = true }: HeaderProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <header className={`header${is_light ? ' header--light' : ''}`}>
            <div className="header__visibiliytyt-helper">
                <div className="header__logo-container">
                    <h2 className="header__logo">MedArchive</h2>
                </div>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        {navLinks.map((link, idx) => (
                            <li className="header__nav-item" key={link.label}>
                                <button
                                    className={`header__nav-link${activeIndex === idx ? ' --active' : ''} ${link.active? ' --active' : ''}`}
                                    // href={link.href}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
