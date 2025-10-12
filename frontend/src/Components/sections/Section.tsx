import {WayToTeach} from "../WayToTeach.tsx";
import {ways} from "../datas/data.ts";

export function Section(){

    return (
        <section>
            <h3>Какой то важный текст</h3>
            <ul>
                {ways.map(way => <WayToTeach key={way.title} {...way} />)}
            </ul>
        </section>
    )
}