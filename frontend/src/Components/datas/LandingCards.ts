import communityImage from '../../assets/LandingCards/images/ico3.png';
import filesImage from '../../assets/LandingCards/images/ico1.png';
import supportImage from '../../assets/LandingCards/images/ico4.png';
import base from '../../assets/LandingCards/images/ico2.png'

export const data_landing_cards = [
    {
        title: "База ",
        description: "Тут описание текущего элемента и что он означает",
        imageUrl: base,
        url: "/base",
    },    {
        title: "Специалистам",
        description: "Тут описание текущего элемента и что он означает",
        imageUrl: communityImage,
        url: "/professions",
    }, {
        title: "НПБ",
        description: "Тут описание текущего элемента и что он означает",
        imageUrl: supportImage,
        url: "/news",
    },{
        title: "База",
        description: "Тут описание текущего элемента и что он означает",
        imageUrl: filesImage,
        url: "/contacts",
    }
]