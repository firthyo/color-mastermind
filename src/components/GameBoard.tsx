import React from "react";
import { CODE_LENGTH } from "../utils/constants";
import { Board, Peg, Row } from "./styles";

export const GameBoard = ({ attempts, currentGuess, secretCode, feedbackColors }) => (
  <Board>
    {attempts.map((attempt, i) => (
      <Row key={i}>
        {attempt.colors.map((color, j) => (
          <Peg key={j} color={color} feedback={feedbackColors[j]} />
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
