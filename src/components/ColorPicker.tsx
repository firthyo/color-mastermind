import React from "react";
import { ColorPicker, Peg } from "./styles";

export const ColorPickerComponent = ({
  colors,
  onSelectColor,
  disabledColors,
}) => (
  <ColorPicker>
    {colors.map((color) => (
      <Peg
        key={color}
        color={color}
        clickable
        disabled={disabledColors.includes(color)}
        onClick={() => onSelectColor(color)}
      />
    ))}
  </ColorPicker>
);
