import './App.scss';
import { Difference } from './Components/sections/difference.tsx';
import LandingCards from './Components/Landing/Landing_cards/LandingCard.tsx';
import Header from './Components/Header/Header.tsx';
import LandingWindow from './Components/Landing/LandingWindow/LandingWindow.tsx';
import Footer from './Components/Footer/Footer.tsx';
import NewsSection from './Components/News/NewsSection/NewsSection';


// страница лендинга
// function App() {
//     return (
//         <>
//
//             <Header is_light={false}></Header>
//
//             <LandingWindow/>
//             <main>
//                 <LandingCards/>
//                 {/*<Section/>*/}
//                 <Difference/>
//             </main>
//             <Footer/>
//         </>
//     );
// }
//
function App() {

  return (
    <>
      <Header is_light={true}></Header>
      <NewsSection/>
      <Footer />

    </>
  );

}

export default App;
