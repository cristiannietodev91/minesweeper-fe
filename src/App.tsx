import React from "react";
import Square from "components/ui/Square/Square";
import { SquareStatus } from "types";

function App() {
  return (
    <div className="App">
      <Square hasMine={true} status={SquareStatus.Covered}></Square>
      <Square hasMine={false} status={SquareStatus.Flag}></Square>
      <Square hasMine={false} status={SquareStatus.Uncovered} numberOfMines={3}></Square>
    </div>
  );
}

export default App;
