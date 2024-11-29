import React from "react";
import {
  GameContainer,
  GameInfo,
  Title,
  DifficultySelector,
  DifficultyButton,
} from "../styles";
import { DIFFICULTY } from "../../utils/constants";

export const GameSetup = ({ difficulty, onDifficultySelect }) => (
  <GameContainer>
    <Title>Color Master</Title>
    <GameInfo>
      Choose your difficulty level:
      <br />
      Easy: No duplicate colors allowed
      <br />
      Medium: Duplicate colors allowed
    </GameInfo>
    <DifficultySelector>
      <DifficultyButton
        selected={difficulty === DIFFICULTY.EASY}
        onClick={() => onDifficultySelect(DIFFICULTY.EASY)}
      >
        Easy
      </DifficultyButton>
      <DifficultyButton
        selected={difficulty === DIFFICULTY.MEDIUM}
        onClick={() => onDifficultySelect(DIFFICULTY.MEDIUM)}
      >
        Medium
      </DifficultyButton>
    </DifficultySelector>
  </GameContainer>
);
