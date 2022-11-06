import { render } from "solid-js/web";
import { createSignal, onMount, For } from "solid-js";
import {useSearchParams, useParams} from "solid-app-router";
import QaSwitcher from "./qaSwitcher";

//const [searchParams, setSearchParams] = useSearchParams();

function MyComponent(props) {
		const [cards, setCards] = createSignal([]);
		const params = useParams();
  onMount(async () => {
		  const res = await fetch(`http://localhost:8000/flashlist/`+params.id);
    setCards(await res.json());
		  console.log(cards())
		  console.log(params.id)
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
