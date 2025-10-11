import logo from '/vite.svg'



const now = new Date();
export default function Header() {
    return (
        <header>
            <img src={logo} alt=""/>
            <h3>e22ee</h3>
            <span>Время сейчас: {now.getMilliseconds()}</span>

            <ul>


            </ul>
        </header>
    )
}