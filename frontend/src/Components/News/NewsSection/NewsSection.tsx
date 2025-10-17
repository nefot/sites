import {NewsTitle} from './NewsTitle.tsx';
import LastNews from "../LastNews.tsx";
import {NewsCard} from "../../Landing/News/News.tsx";
import {DataNews} from "../../datas/dataNews.ts";
import {lastNewsData} from "../../datas/LastNewsData.tsx";

export function NewsSection() {
    return (
        <>
            <NewsTitle/>
            <LastNews data={lastNewsData}/>
            <NewsCard data={DataNews}/>
        </>
    );
}


export default NewsSection;
