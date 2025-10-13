import './Footer.scss';

const footerLink = [
  { name: 'Специалистам', href: '/' },
  { name: 'Организациям', href: '/' },
  { name: 'Нормативно правовая база', href: '/' },
  { name: 'Новости', href: '/' },
  { name: 'Анонсы', href: '/' },
  { name: 'Специалистам', href: '/' },
  { name: 'Организациям', href: '/' },
  { name: 'Нормативно правовая база', href: '/' },
  { name: 'Новости', href: '/' },
  { name: 'Анонсы', href: '/' },
  { name: 'Специалистам', href: '/' },
  { name: 'Организациям', href: '/' },
  { name: 'Нормативно правовая база', href: '/' },
  { name: 'Новости', href: '/' },
  { name: 'Анонсы', href: '/' },
];

const sectionCount = 3;
const sections: Array<typeof footerLink> = Array.from({ length: sectionCount }, () => []);
footerLink.forEach((item, idx) => {
  sections[idx % sectionCount].push(item);
});

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <h1>MedArchive</h1>
        {sections.map((section, i) => (
          <div className="footer-section" key={i}>
            {section.map((link, j) => (
              <a key={j} href={link.href}>{link.name}</a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}