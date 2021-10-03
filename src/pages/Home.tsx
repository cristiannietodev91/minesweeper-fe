import React, { useState, useEffect, FormEvent } from "react";
import { selectPlayer, setLoggedUser } from "app/reducers/gameSlice";
import { useLoginUserMutation } from "app/services/games";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import style from "./Home.module.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  let history = useHistory();

  const [loginUser, ] = useLoginUserMutation();

  const handleLoginUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(email)
      .unwrap()
      .then((result) => {
        dispatch(setLoggedUser(result));
      });
  };

  useEffect(() => {
    if (player) {
      history.push("/play");
    }
  }, [history, player]);

  return (
    <div className={style.container}>
      <form onSubmit={handleLoginUser}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
          placeholder="Type email"
          required
        ></input>
        <button type="submit" className={style.button}>
          Play
        </button>
      </form>
    </div>
  );
};

export default Home;
