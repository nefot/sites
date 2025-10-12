
import Button from "../Button/Button.tsx";
import { NewsCard } from "../News/News.tsx";
import {difference} from "../datas/data.ts";
import {useState} from "react";
import {DataActions} from "../datas/dataActions.ts";

export function Difference(){
    const [content, setContent] = useState('Нажми на меня');

    function handleClick(text: string) {
        console.log('Button clicked', text);
        setContent(text);
    }
    return (
        <section>
            {/*<h3>Чем мы отличаемся от других </h3>*/}


            {/*<Button onClick={() => handleClick('Approach')} active={content === 'Approach'}>Подход</Button>*/}
            {/*<Button onClick={() => handleClick('Teachers')}*/}
            {/*        active={content === 'Teachers'}>Преподаватели</Button>*/}
            {/*<Button onClick={() => handleClick('Reviews')} active={content === 'Reviews'}>Отзывы</Button>*/}
            {/*<Button onClick={() => handleClick('Cost')} active={content === 'Cost'}>Стоимость</Button>*/}

            {/*{!content && <p>Нажми на кнопку чтобы узнать больше</p>}*/}
            {/*{content && <p>{difference[content]}</p>}*/}
            <NewsCard className="Новости"/>
            <NewsCard className="События" data={DataActions}/>

        </section>
    )
}