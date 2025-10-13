import { useState } from 'react';
import "./NewsTitle.scss";

const suggestions = [
  'Новости медицины',
  'Анонсы мероприятий',
  'Нормативно правовая база',
  'Организациям',
  'Специалистам',
  'Здоровье',
  'Образование',
  'Технологии',
];

export function NewsTitle() {
  return (
    <>
      <div className="news-title">
        <h2 className="text-2xl font-bold mb-4">Новости</h2>
        <Search />
      </div>

    </>
  );
}

export function Search() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);

  const filtered = query.length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActive(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(false);
    alert(`Поиск: ${query}`);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    setActive(false);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск новостей..."
        value={query}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setActive(false), 100)}
        onFocus={() => query && setActive(true)}
      />
      <button type="submit" className="search-btn" aria-label="Найти">
        <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.9999 5.54717C13.9999 8.6108 11.5163 11.0944 8.4527 11.0944C5.38908 11.0944 2.90552 8.6108 2.90552 5.54717C2.90552 2.48354 5.38908 -1.52588e-05 8.4527 -1.52588e-05C11.5163 -1.52588e-05 13.9999 2.48354 13.9999 5.54717ZM4.33669 5.54717C4.33669 7.82038 6.17949 9.66318 8.4527 9.66318C10.7259 9.66318 12.5687 7.82038 12.5687 5.54717C12.5687 3.27396 10.7259 1.43116 8.4527 1.43116C6.17949 1.43116 4.33669 3.27396 4.33669 5.54717Z"
            fill="#D9D9D9" />
          <line x1="5.21749" y1="9.13947" x2="0.726912" y2="13.8942" stroke="#D9D9D9" stroke-width="2" />
        </svg>

      </button>
      {active && filtered.length > 0 && (
        <ul className="search-suggestions">
          {filtered.map((s, i) => (
            <li key={i} onMouseDown={() => handleSuggestionClick(s)}>{s}</li>
          ))}
        </ul>
      )}
    </form>
  );
}