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
  board: SquareProps[][];
  startdate?: Date;
  pausedate?: Date;
  enddate?: Date;
}

export enum GameStatus {
  NoGameLoad = "NoGameLoad",
  Initiating = "Initiating",
  Playing = "Playing",
  Over = "Over"
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

export interface CreateGameProps {
  idplayer: number;
  rows: number;
  columns: number;
}

export interface StartGameProps {
  idgame: number;
  x: number;
  y: number;
}

export interface GameStatusProps {
  idgame: number;
  gameStatus: GameStatus
}