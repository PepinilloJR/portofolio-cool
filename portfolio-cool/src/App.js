import logo from './logo.svg';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import { FrontPage } from './pages/frontpage';
import { FtpPage } from './pages/ftpPage';

function App() {
  return ( <>
      
    <div id='~' className="App">
      <Router>
        <Routes>
          <Route path='/' element={<FrontPage></FrontPage>}>
          </Route>
          <Route path='/ftp' element={<FtpPage></FtpPage>}></Route>
        </Routes>
      </Router>
    </div>
  </>);
}

export default App;
