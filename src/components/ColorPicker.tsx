import React from "react";
import {
  ActionButtons,
  ColorPicker,
  SubmitButton,
  IconButton,
  Peg,
} from "./styles";
import { DIFFICULTY } from "../utils/constants";
import { Undo } from "lucide-react";

interface Props {
  colors: string[];
  currentGuess: string[];
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>;
  checkGuess: () => void;
  difficulty: string;
}

export const GameActions: React.FC<Props> = ({
  colors,
  currentGuess,
  setCurrentGuess,
  checkGuess,
  difficulty,
}) => {
  const addColor = (color: string) => {
    if (
      currentGuess.length < 4 &&
      !(difficulty === DIFFICULTY.EASY && currentGuess.includes(color))
    ) {
      setCurrentGuess([...currentGuess, color]);
    }
  };

  const undoLastColor = () => setCurrentGuess(currentGuess.slice(0, -1));

  return (
    <>
      <ColorPicker>
        {colors.map((color) => {
          const isClickable =
            currentGuess.length < 4 &&
            !(difficulty === DIFFICULTY.EASY && currentGuess.includes(color));
          const isDisabled = !isClickable;
          return (
            <Peg
              key={color}
              color={color}
              clickable={isClickable}
              disabled={isDisabled}
              onClick={() => addColor(color)}
            />
          );
        })}
      </ColorPicker>
      <ActionButtons>
        <IconButton onClick={undoLastColor}>
          <Undo size={42} />
        </IconButton>
        <SubmitButton onClick={checkGuess}>Submit</SubmitButton>
      </ActionButtons>
    </>
  );
};

export default GameActions;
