import React from "react";
import { useSelector } from "react-redux";
import { selectPlayer } from "app/reducers/gameSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Game from "pages/Game";
import style from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={style.container}>
        <Switch>
          <PrivateRoute path="/play">
            <Game></Game>
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

type Props = {
  children: JSX.Element;
  path: string | string[];
};

const PrivateRoute = ({ children, ...rest }: Props) => {
  const player = useSelector(selectPlayer);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        player ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
