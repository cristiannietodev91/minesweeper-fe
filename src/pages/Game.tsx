import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBoard,
  uncoveredField,
  flagField,
  logOut,
  selectPlayer,
  setBoard,
  selectGameStatus,
  setGame,
  selectGame,
  selectRemainingMines,
  selectWinGame,
} from "app/reducers/gameSlice";
import Board from "components/ui/Board/Board";
import styles from "./Game.module.css";
import person from "./person.png";
import {
  useCreateGameMutation,
  useStartGameMutation,
} from "app/services/games";
import { GameStatus } from "types";

const Game = () => {
  const board = useSelector(selectBoard);
  const player = useSelector(selectPlayer);
  const gameStatus = useSelector(selectGameStatus);
  const game = useSelector(selectGame);
  const remainingMines = useSelector(selectRemainingMines);
  const winGame = useSelector(selectWinGame);

  const dispatch = useDispatch();

  const [createGame] = useCreateGameMutation();
  const [startGame] = useStartGameMutation();

  const handleClick = (
    x: number,
    y: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (gameStatus !== GameStatus.Over) {
      if (e.type === "click") {
        if (gameStatus === GameStatus.Initiating && game) {
          startGame({
            idgame: game,
            x,
            y,
          })
            .unwrap()
            .then((game) => {
              dispatch(
                setGame({ idgame: game.idgame, gameStatus: GameStatus.Playing })
              );
              dispatch(setBoard(game.board));
              dispatch(uncoveredField({ x, y }));
            });
        } else {
          dispatch(uncoveredField({ x, y }));
        }
      } else if (e.type === "contextmenu") {
        dispatch(flagField({ x, y }));
      }
    }
  };

  const handeLogginOut = () => {
    dispatch(logOut());
  };

  const handleStartGame = () => {
    if (player) {
      createGame({
        idplayer: player.idplayer,
        rows: 10,
        columns: 10,
      })
        .unwrap()
        .then((game) => {
          dispatch(
            setGame({ idgame: game.idgame, gameStatus: GameStatus.Initiating })
          );
          dispatch(setBoard(game.board));
        });
    }
  };

  return (
    <>
      <div className={styles.boardContainer}>
        {gameStatus === GameStatus.Over && (
          <div className={styles.msgContainer}>
            {" "}
            <span>You lost! &#128534;</span>
          </div>
        )}
        {gameStatus === GameStatus.Playing && (
          <div className={styles.msgContainer}>
            Remaining mines {remainingMines}
          </div>
        )}
        {winGame && gameStatus === GameStatus.Playing && (
          <div className={styles.msgContainer}>
            {" "}
            <span>You Win! &#129311;</span>
          </div>
        )}
        <Board board={board} handleClick={handleClick}></Board>
      </div>
      <div className={styles.sidetray}>
        <div className={styles.infoPlayer}>
          <div className={styles.imgContainer}>
            <img src={person} alt="player" className={styles.img} />
          </div>
          <div>{player?.email}</div>
        </div>
        <button
          onClick={() => handleStartGame()}
          className={styles.playButton}
          disabled={
            gameStatus !== GameStatus.NoGameLoad &&
            gameStatus !== GameStatus.Over &&
            !winGame
          }
        >
          {gameStatus === GameStatus.Over ? "Start again" : "Start game"}
        </button>
        <button onClick={() => handleStartGame()} className={styles.playButton}>
          Restart game
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
