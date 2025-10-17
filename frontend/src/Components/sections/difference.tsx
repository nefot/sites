import {NewsCard} from "../Landing/News/News.tsx";
import {NewsCardHeader} from "../News/NewsSection/news-card-header.tsx";

export function Difference() {
    return (
        <section>
            {/*<h3>Чем мы отличаемся от других </h3>*/}
            {NewsCardHeader("Новости")}
            <NewsCard/>
            {NewsCardHeader("События")}
            <NewsCard/>
        </section>
    )
}

export default Difference;
