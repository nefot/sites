import communityImage from '../../assets/LandingCards/images/ico3.png';
import filesImage from '../../assets/LandingCards/images/ico1.png';
import supportImage from '../../assets/LandingCards/images/ico4.png';
import base from '../../assets/LandingCards/images/ico2.png'

export const data_landing_cards = [
    {
        title: "База знаний",
        description: "Протоколы и рекомендации",
        imageUrl: base,
        url: "/base",
    },
    {
        title: "Специалистам",
        description: "Инструменты для врачей",
        imageUrl: communityImage,
        url: "/professions",
    },
    {
        title: "НПБ",
        description: "Нормативные документы",
        imageUrl: supportImage,
        url: "/news",
    },
    {
        title: "Документы",
        description: "Формы и бланки",
        imageUrl: filesImage,
        url: "/contacts",
    }
];
