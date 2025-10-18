import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header.tsx';
import Footer from './Components/Footer/Footer.tsx';
import LandingWindow from './Components/Landing/LandingWindow/LandingWindow.tsx';
import LandingCards from './Components/Landing/Landing_cards/LandingCard.tsx';
import Difference from './Components/sections/difference.tsx';
import NewsSection from './Components/News/NewsSection/NewsSection';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header is_light={false}/>
                            <LandingWindow/>
                            <main>
                                <LandingCards/>
                                {/*<Section/>*/}
                                <Difference/>
                            </main>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/news"
                    element={
                        <>
                            <Header is_light={true}/>
                            <NewsSection/>
                            <Footer/>
                        </>
                    }
                />



                <Route path='/base'
                       element={
                           <>
                               <Header is_light={true}/>
                               {/*<NewsSection/>*/}
                               <Footer/>
                           </>
                       }/>


                <Route path='/events'
                       element={
                           <>
                               <Header is_light={true}/>
                               {/*<NewsSection/>*/}
                               <Footer/>
                           </>
                       }/>


            </Routes>

        </BrowserRouter>
    );
}

export default App;
