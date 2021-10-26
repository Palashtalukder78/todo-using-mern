import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Header from './components/Shared/Header/Header';
import UpdateUser from './components/UpdateUser/UpdateUser';
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/users/:id">
            <UpdateUser></UpdateUser>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
