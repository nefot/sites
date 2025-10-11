import './App.css'
import Header from "./Components/Header"

import {ways} from "./Components/data.ts";

import {WayToTeach} from "./Components/WayToTeach"
import Button from "./Components/Button/Button.tsx";

function App() {

    return (
        <>
            <Header></Header>
            <main>
                <section>
                    <h3>Какой то важный текст</h3>
                    <ul>
                        <WayToTeach {...ways[1]}/>
                        <WayToTeach {...ways[2]}/>
                        <WayToTeach {...ways[3]}/>
                        <WayToTeach {...ways[4]}/>
                        <WayToTeach {...ways[5]}/>
                    </ul>
                </section>
                <section>
                    <h3>Чем мы отличаемся от других </h3>
                    <Button text="dwdwdwd"> </Button>
                </section>
            </main>
        </>
    )
}

export default App
