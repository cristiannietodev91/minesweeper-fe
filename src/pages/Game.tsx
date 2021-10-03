import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBoard, uncoveredField, flagField, logOut } from "app/reducers/gameSlice";
import Board from "components/ui/Board/Board";

const Game = () => {
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();

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

  const handeLogginOut = ()=>{
    dispatch(logOut());
  }

  return (
    <div>
      <Board board={board} handleClick={handleClick}></Board>
      <button onClick={() => handeLogginOut()}>Log out</button>
    </div>
  );
};

export default Game;
