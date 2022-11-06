import { render } from "solid-js/web";
import { createSignal, onMount, For } from "solid-js";
import QaSwitcher from "./qaSwitcher";

function MyComponent(props) {
		const [cards, setCards] = createSignal([]);
  onMount(async () => {
		  const res = await fetch(`http://localhost:8000/flashlist/1`);
    setCards(await res.json());
		  console.log(cards())
  });
  
		return <>
  <h1>Flashcards</h1>
				<For each={cards()}>{(card, i) =>
				<ul>
						<QaSwitcher in={card} />
				</ul>
						}
				</For>
				</>
  ;
}

export default MyComponent;
