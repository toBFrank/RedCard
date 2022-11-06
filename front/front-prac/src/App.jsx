import { lazy, onMount } from "solid-js";
import { Routes, Route, Link, useSearchParams} from "solid-app-router"
import Home from "./Home";
const MyComponent = lazy(() => import("./MyComponent"));
//const [searchParams, setSearchParams] = useSearchParams();

function App() {
  //const [selected, setSelected] = createSignal("Prop test");


  return (
   <>
   <header>
 <h1>HackED Site</h1>
     <nav>
			 <Link href="/mine">My Component</Link>
    </nav>
      <hr class="dashed"></hr>
      </header>
       
          <Routes>
				  <Route path="/mine/:id" element={<MyComponent />} />
      <Route path="/" element={<Home/>} />
    </Routes>
   
    </>
  );
}

export default App;

