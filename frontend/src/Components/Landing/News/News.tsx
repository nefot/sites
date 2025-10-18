import './News.scss';
import {NewsCardSubscription} from "./NewsCardSubscription.tsx";
import Button from "../../Button/Button.tsx";
import {DataNews} from "../../datas/dataNews.ts";
import {Tag} from "../../TagButton/TagButton";
import type {NewsItem} from "./NewsItem.tsx";
import type {NewsCard} from "./NewsCard.tsx";


export function NewsCard({data = DataNews, type = "Default"}: NewsCard) {
    function handleClick(text: string) {
        console.log('Button clicked', text);
    }

    if (type === "Default") {
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

                                <div className="news-card-text">
                                    <img src={item.imageUrl} alt=""/>
                                    <div className="news-card_tags">
                                        {item.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                                    </div>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <NewsCardSubscription date={dateTuple}>{item.author}</NewsCardSubscription>

                                </div>
                                <Button className="width-100" onClick={() => handleClick('Cost')}
                                        active={false}>Читать</Button>
                            </div>

                        );
                    })}
                </div>
            </>
        );
    } else if (type === "horizontal") {
        return (
            <>

                <div className="news-cards" style={{flexDirection: 'column'}}>
                    {data.map((item: NewsItem, idx: number) => {

                        const dateTuple: [number, number, number] =
                            Array.isArray(item.date) && item.date.length === 3
                                ? [item.date[0], item.date[1], item.date[2]]
                                : [1, 1, 2025];

                        return (
                        //     width: 476px;
                        // /* max-height: 250px; */
                        // height: -webkit-fill-available;
                        // border-radius: 12px;
                        // object-fit: cover;

                            <div className="news-card card block" style={{width: '100% '}} key={item.title + idx}>

                                <div className="news-card-text "
                                     style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <img src={item.imageUrl} style={{
                                        width: '476px',
                                        minWidth: '376px',
                                        // maxHeight: '250px',
                                        height: '-webkit-fill-available',
                                        borderRadius: '12px',
                                        objectFit: 'cover',
                                    }} alt=""/>
                                    <div className="uoshf" style={
                                        {
                                            display: "flex",
                                            padding: "0 20px",
                                            flexDirection: "column",
                                            gap: "12px",
                                            justifyContent: "space-around",
                                            height: "-webkit-fill-available",
                                        }
                                    }>

                                        <div className="news-card_tags">
                                            {item.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                                        </div>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                        <NewsCardSubscription date={dateTuple}>{item.author}</NewsCardSubscription>
                                        <Button className="width-100" onClick={() => handleClick('Cost')}
                                                active={false}>Читать</Button>

                                    </div>

                                </div>

                            </div>

                        );
                    })}
                </div>
            </>
        )
    }

}
