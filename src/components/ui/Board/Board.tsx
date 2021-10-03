import React from "react";
import { SquareProps } from "types";
import Square from "../Square/Square";
import styles from "./Board.module.css";

interface BoardProps {
  board: SquareProps[][];
}

const Board = ({ board }: BoardProps) => {
  return (
    <div>
      {board.map((row) => {
        return (
          <div className={styles.row}>
            {row.map((square) => (
              <Square hasMine={square.hasMine} status={square.status}></Square>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
