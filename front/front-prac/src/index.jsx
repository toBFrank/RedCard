/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, useSearchParams} from "solid-app-router";

import './index.css';
import App from './App';


//:w
//const [searchParams, setSearchParams] = useSearchParams();
render(() => ( <Router>
      <App />
    </Router>), document.getElementById('root'));
