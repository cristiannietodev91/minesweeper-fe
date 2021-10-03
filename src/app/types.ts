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
