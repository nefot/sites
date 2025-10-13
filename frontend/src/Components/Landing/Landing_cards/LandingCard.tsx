import { data_landing_cards } from '../../datas/LandingCards.ts';
import './LandingCards.scss';
import Button from "../../Button/Button.tsx";
// import Button from '../UI/Button'; // Раскомментируйте, если есть компонент Button


type LandingCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}



export default function LandingCards() {
    return (
        <div className="landing-cards-list">
            {data_landing_cards.map((card: LandingCardProps) => (
                <div className="landing-card card block" key={card.title}>
                    <div className="landing-cards-list-h" style={{ height: '111px' }}>
                    <img src={card.imageUrl} alt={card.title} /></div>
                    <div className="element-card align-left-column fit-content">
                        <h2>{card.title}</h2>
                        <p className="cards-subscribtions">{card.description}</p><br/>
                         <Button>Перейти</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
// export default function LandingCards() {
//     return (
//
//
//         <>
//             {data_landing_cards.map((card: LandingCardProps, index) => <p key={card.title}></p>)}
//
//         </>
//
//     )
// }


// <div className="landing-card card block">
//     <img src={communityImage} alt=""/>
//
//     <div className="element-card align-left-column fit-content ">
//         <h2>База </h2>
//         <p className="cards-subscribtions">Тут описание текущего элемента и что он означает </p><br/>
//         <Button>Перейти</Button>
//
//     </div>
//
// </div>