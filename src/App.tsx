import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Board from "components/ui/Board/Board";
import { selectBoard, uncoveredField, flagField } from "app/reducers/gameSlice";

function App() {
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

  return (
    <div className="App">
      <Board board={board} handleClick={handleClick}></Board>
    </div>
  );
}

export default App;
