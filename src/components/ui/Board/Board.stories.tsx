import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Board from "./Board";
import { SquareStatus } from "../../../types";

export default {
  title: "components/ui/Board/Square",
  component: Board,
  argTypes: {},
} as ComponentMeta<typeof Board>;

const Template: ComponentStory<typeof Board> = (args) => <Board {...args} />;

export const BoardDemo = Template.bind({});

BoardDemo.args = {
  board: [
    [
      { hasMine: true, status: SquareStatus.Uncovered },
      { hasMine: false, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Uncovered, numberOfMines: 5 },
    ],
    [
      { hasMine: true, status: SquareStatus.Uncovered },
      { hasMine: false, status: SquareStatus.Covered },
      { hasMine: false, status: SquareStatus.Uncovered, numberOfMines: 5 },
    ],
  ],
};

