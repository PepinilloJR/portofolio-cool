import logo from './logo.svg';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import { FrontPage } from './pages/frontpage';


function App() {
  return ( <>
      
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<FrontPage></FrontPage>}>
          </Route>
        </Routes>
      </Router>
    </div>
  </>);
}

export default App;
