import React from "react";
import classnames from "classnames";
import styles from "./square.module.css";
import mine from "./assets/mine.png";
import flag from "./assets/flag.png";
import { SquareStatus, SquareProps } from "../../../types";

const Square = ({
  hasMine,
  status,
  numberOfMines,
  handleClick,
}: SquareProps) => {
  return (
    <div
      className={classnames(styles.container,{
        [styles.containerUncovered]: status === SquareStatus.Uncovered && !numberOfMines
      })}
      onClick={status !== SquareStatus.Uncovered ? handleClick : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        if (status !== SquareStatus.Uncovered && handleClick) {
          handleClick(e);
        }
      }}
    >
      {status !== SquareStatus.Covered && (
        <>
          {hasMine && status === SquareStatus.Uncovered && (
            <img src={mine} alt="mine" className={styles.img} />
          )}
          {status === SquareStatus.Flag && (
            <img src={flag} alt="mine" className={styles.img} />
          )}
          {!hasMine && status === SquareStatus.Uncovered && (
            <span className={styles.numbers}>
              {!numberOfMines ? "" : numberOfMines}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Square;
