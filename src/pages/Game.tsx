import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBoard,
  uncoveredField,
  flagField,
  logOut,
  selectPlayer,
  setNewBoard,
} from "app/reducers/gameSlice";
import Board from "components/ui/Board/Board";
import styles from "./Game.module.css";
import person from "./person.png";
import { useCreateGameMutation } from "app/services/games";

const Game = () => {
  const board = useSelector(selectBoard);
  const player = useSelector(selectPlayer);

  const dispatch = useDispatch();

  const [createGame] = useCreateGameMutation();

  const handleClick = (
    x: number,
    y: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (e.type === "click") {
      dispatch(uncoveredField({ x, y }));
    } else if (e.type === "contextmenu") {
      dispatch(flagField({ x, y }));
    }
  };

  const handeLogginOut = () => {
    dispatch(logOut());
  };

  const handleStartGame = () => {
    if (player) {
      createGame({
        idplayer: player.idplayer,
        rows: 5,
        columns: 5,
      })
        .unwrap()
        .then((game) => {
          dispatch(setNewBoard(game.board));
        });
    }
  };

  return (
    <>
      <div className={styles.boardContainer}>
        <Board board={board} handleClick={handleClick}></Board>
      </div>
      <div className={styles.sidetray}>
        <div className={styles.infoPlayer}>
          <div className={styles.imgContainer}>
            <img src={person} alt="player" className={styles.img} />
          </div>
          <div>{player?.email}</div>
        </div>
        <button onClick={() => handleStartGame()} className={styles.playButton}>
          Start game
        </button>

        <button
          onClick={() => handeLogginOut()}
          className={styles.logOutButton}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Game;
