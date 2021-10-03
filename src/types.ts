export interface SquareProps {
  hasMine: boolean;
  status: SquareStatus;
  numberOfMines?: number;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
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

export interface PlayerAttributes {
  idplayer: number;
  nickname: string;
  email: string;
  uid: string;
}