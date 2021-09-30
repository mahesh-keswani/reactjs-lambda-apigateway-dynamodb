import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <div>
      <BrowserRouter>
        <ul>
          <li className="eachBlock">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li className="eachBlock">
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </li>
          <li className="eachBlock">
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
          </li>
        </ul>

        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
