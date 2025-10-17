import './News.scss';
import {NewsCardSubscription} from "./NewsCardSubscription.tsx";
import Button from "../../Button/Button.tsx";
import {DataNews} from "../../datas/dataNews.ts";
import { Tag } from "../../TagButton/TagButton";

type NewsItem = {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    author: string;
    date?: number[]; // корректируем тип здесь как number[]
};



export function NewsCard({ data = DataNews}: {  data?: NewsItem[]}) {
    function handleClick(text: string) {
        console.log('Button clicked', text);
    }

    return (
        <>

            <div className="news-cards ">
                {data.map((item: NewsItem, idx: number) => {

                    const dateTuple: [number, number, number] =
                        Array.isArray(item.date) && item.date.length === 3
                            ? [item.date[0], item.date[1], item.date[2]]
                            : [1, 1, 2025];

                    return (
                        <div className="news-card card block" key={item.title + idx}>
                            <img src={item.imageUrl} alt=""/>
                            <div className="news-card_tags">
                                {item.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                            </div>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <NewsCardSubscription date={dateTuple}>{item.author}</NewsCardSubscription>
                            <Button className="width-100" onClick={() => handleClick('Cost')} active={false}>Читать</Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
