import './App.css';
import Header from './Components/Header';
import { useState } from 'react';
import { ways , difference} from './Components/data.ts';

import { WayToTeach } from './Components/WayToTeach';
import Button from './Components/Button/Button.tsx';

function App() {
  const [content, setContent] = useState('Нажми на меня');



  // let content = 'Нажми на меня';
  // console.log('App rendered');

  function handleClick(text: string) {
    console.log('Button clicked', text);
    setContent(text);
    // content = 'Спасибо что нажал';
  }


  return (
    <>
      <Header></Header>
      <main>
        <section>
          <h3>Какой то важный текст</h3>
          <ul>
            <WayToTeach {...ways[1]} />
            <WayToTeach {...ways[2]} />
            <WayToTeach {...ways[3]} />
            <WayToTeach {...ways[4]} />
            <WayToTeach {...ways[5]} />
            <WayToTeach {...ways[6]} />
          </ul>
        </section>
        <section>
          <h3>Чем мы отличаемся от других </h3>
          <Button onClick={() => handleClick('Approach')} active={false}>Подход</Button>
          <Button onClick={() => handleClick('Teachers')} active={true}>Преподаватели</Button>
          <Button onClick={() => handleClick('Reviews')} active={false}>Отзывы</Button>
          <Button onClick={() => handleClick('Cost')} active={false}>Стоимость</Button>
          <p>{difference[content]}</p>

        </section>
      </main>
    </>
  );
}

export default App;
