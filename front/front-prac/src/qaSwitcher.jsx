import { render } from "solid-js/web";
import { createSignal, createEffect ,onMount, Show } from "solid-js";


function QaSwitcher(props) {
		//const [card, setCard] = createSignal([]);
		let firstRun=true;
 		onMount(async ()=>{
	console.log(props.card)
})
const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)
	const [clicked, setClick] = createSignal(false);
	const toggle = () => setClick(!clicked())
  const [dooted, setDoot] = createSignal(false);
  const doot = () => setDoot(!dooted())
		createEffect(()=>{
				dooted();
				console.log("Dooted", props.ctr())
				if(!firstRun){
				fetch('http://localhost:8000/doot', {
  method: 'POST',
  credentials: "same-origin",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
						body: JSON.stringify({'qID':props.ctr()+1, str: 'Updooted',"UserID": getCookieValue('UserID')})
})}else{
		firstRun=false;
}
		})
return (<>
				 	<Show
		when={clicked()}
		fallback={<li onClick={toggle}>Q: {props.in["question"]}</li>}>
		<li onClick={toggle}>A: {props.in["answer"]}</li>
</Show> <Show
      when={dooted()}
						  fallback={<button style="background-color: orange" onClick={doot}>Updoot!</button>}
    >
      <button onClick={doot}>Downdoot</button>
    </Show>

		</>)
  ;
}

export default QaSwitcher;
