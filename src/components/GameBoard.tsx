import React from "react";
import { Board, Row, Peg } from "./styles";
import { FeedbackStageProps } from "../types/type";
import { CODE_LENGTH } from "../utils/constants";

interface Props {
  attempts: { colors: string[]; feedback: FeedbackStageProps[] }[];
  currentGuess: string[];
}

const GameBoard: React.FC<Props> = ({ attempts, currentGuess }) => (
  <Board>
    {attempts.map((attempt, index) => (
      <Row key={index}>
        {attempt.colors.map((color, i) => (
          <Peg key={i} color={color} feedback={attempt.feedback[i]} />
        ))}
      </Row>
    ))}
    <Row>
      {Array.from({ length: CODE_LENGTH }).map((_, i) => (
        <Peg key={i} color={currentGuess[i] || "#f8f9fa"} />
      ))}
    </Row>
  </Board>
);

export default GameBoard;
