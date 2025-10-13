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


export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <h1>MedArchive</h1>
          <div className="footer-section">
            <div className=""><a>{footerLink[0]['name']}</a></div>
            <div className=""><a>{footerLink[1]['name']}</a></div>
            <div className=""><a>{footerLink[2]['name']}</a></div>
            <div className=""><a>{footerLink[3]['name']}</a></div>
            <div className=""><a>{footerLink[4]['name']}</a></div>
          </div>
          <div className="footer-section">
            <a>{footerLink[0]['name']}</a>
            <a>{footerLink[1]['name']}</a>
            <a>{footerLink[2]['name']}</a>
            <a>{footerLink[3]['name']}</a>
            <a>{footerLink[4]['name']}</a>
          </div>
          <div className="footer-section">
            <a>{footerLink[0]['name']}</a>
            <a>{footerLink[1]['name']}</a>
            <a>{footerLink[2]['name']}</a>
            <a>{footerLink[3]['name']}</a>
            <a>{footerLink[4]['name']}</a>
          </div>


        </div>
      </div>
    </>
  );
}