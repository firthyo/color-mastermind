import React from "react";
import {
  ActionButtons,
  ColorPicker,
  SubmitButton,
  IconButton,
  Peg,
} from "./styles";
import { DIFFICULTY } from "../utils/constants";

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
        {colors.map((color) => (
          <Peg key={color} color={color} onClick={() => addColor(color)} />
        ))}
      </ColorPicker>
      <ActionButtons>
        <IconButton onClick={undoLastColor}>Undo</IconButton>
        <SubmitButton onClick={checkGuess}>Submit</SubmitButton>
      </ActionButtons>
    </>
  );
};

export default GameActions;
