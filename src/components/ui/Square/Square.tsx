import React from "react";
import styles from "./square.module.css";
import mine from "./assets/mine.png";
import flag from "./assets/flag.png";
import { SquareStatus, SquareProps } from "../../../types";

const Square = ({ hasMine, status, numberOfMines }: SquareProps) => {
  return (
    <div className={styles.container}>
      {hasMine && <img src={mine} alt="mine" className={styles.img} />}
      {!hasMine && status === SquareStatus.Flag && (
        <img src={flag} alt="mine" className={styles.img} />
      )}
      {!hasMine && numberOfMines && status === SquareStatus.Uncovered && (
        <span className={styles.numbers}>{numberOfMines}</span>
      )}
    </div>
  );
};

export default Square;
