export interface SquareProps {
  hasMine: boolean;
  status: SquareStatus;
  numberOfMines?: number;
}

export interface Game {
  idgame: number;
  idplayer: number;
  rows: number;
  columns: number;
  score: number;
  numberofmines: number;
  startdate?: Date;
  pausedate?: Date;
  enddate?: Date;
}

export enum SquareStatus {
  Flag = "Flag",
  Covered = "Covered",
  Uncovered = "Uncovered",
}