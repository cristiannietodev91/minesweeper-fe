import React from "react";
import { SquareProps } from "types";
import Square from "../Square/Square";
import styles from "./Board.module.css";

interface BoardProps {
  board: SquareProps[][];
  handleClick: (
    x: number,
    y: number,
    event: React.MouseEvent<HTMLElement>
  ) => void;
}

const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div>
      {board.map((row, indexX) => {
        return (
          <div className={styles.row} key={indexX}>
            {row.map((square, indexY) => (
              <Square
                hasMine={square.hasMine}
                status={square.status}
                handleClick={(e) => handleClick(indexX, indexY, e)}
                key={indexY}
              ></Square>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
