const footerLink = [
    {name: "Специалистам", href: "/"},
    {name: "Организациям", href: "/"},
    {name: "Нормативно правовая база", href: "/"},
    {name: "Новости", href: "/"},
    {name: "Анонсы", href: "/"},
    {name: "Специалистам", href: "/"},
    {name: "Организациям", href: "/"},
    {name: "Нормативно правовая база", href: "/"},
    {name: "Новости", href: "/"},
    {name: "Анонсы", href: "/"},
    {name: "Специалистам", href: "/"},
    {name: "Организациям", href: "/"},
    {name: "Нормативно правовая база", href: "/"},
    {name: "Новости", href: "/"},
    {name: "Анонсы", href: "/"}
]


export default function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-container">
                    <h1>MedArchive</h1>
                        {footerLink[0]["name"]}
                        {footerLink[1]["name"]}
                        {footerLink[2]["name"]}
                        {footerLink[3]["name"]}
                        {footerLink[4]["name"]}
                    <div className="footer-section">
                        {footerLink[0]["name"]}
                        {footerLink[1]["name"]}
                        {footerLink[2]["name"]}
                        {footerLink[3]["name"]}
                        {footerLink[4]["name"]}
                    </div>
                    <div className="footer-section">
                        {footerLink[0]["name"]}
                        {footerLink[1]["name"]}
                        {footerLink[2]["name"]}
                        {footerLink[3]["name"]}
                        {footerLink[4]["name"]}
                    </div>
                    <div className="footer-section">
                        {footerLink[0]["name"]}
                        {footerLink[1]["name"]}
                        {footerLink[2]["name"]}
                        {footerLink[3]["name"]}
                        {footerLink[4]["name"]}`
                    </div>


                </div>
            </div>
        </>
    );
}