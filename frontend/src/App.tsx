import './App.scss';
import {Difference} from "./Components/sections/difference.tsx";
import LandingCards from "./Components/Landing_cards/LandingCard.tsx";
import Header from "./Components/Header/Header.tsx";
import LandingWindow from "./Components/LandingWindow/LandingWindow.tsx";
import Footer from "./Components/Footer/Footer.tsx";





function App() {
    return (
        <>

            <Header is_light={false}></Header>

            <LandingWindow/>
            <main>
                <LandingCards/>
                {/*<Section/>*/}
                <Difference/>
            </main>
            <Footer/>
        </>
    );
}

export default App;
