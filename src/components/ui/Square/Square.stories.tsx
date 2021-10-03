import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Square from "./Square";
import { SquareStatus } from "../../../types";

export default {
  title: "components/ui/Square/Square",
  component: Square,
  argTypes: {},
} as ComponentMeta<typeof Square>;

const Template: ComponentStory<typeof Square> = (args) => <Square {...args} />;

export const WithMine = Template.bind({});

WithMine.args = {
  hasMine: true,
  status: SquareStatus.Uncovered,
};

export const WithFlag = Template.bind({});

WithFlag.args = {
  hasMine: false,
  status: SquareStatus.Flag,
};

export const UnCovered = Template.bind({});

UnCovered.args = {
  hasMine: false,
  status: SquareStatus.Uncovered,
  numberOfMines: 4
};
