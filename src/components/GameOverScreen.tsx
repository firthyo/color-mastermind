import React from "react";
import {
  CorrectCode,
  GameOverActions,
  Message,
  Peg,
  PlayAgainButton,
  Row,
} from "./styles";

export const GameOverScreen = ({ win, secretCode, onPlayAgain }) => (
  <GameOverActions>
    <Message win={win}>
      {win ? "Congratulations! You won!" : "Game Over!"}
    </Message>
    {!win && (
      <CorrectCode>
        <p>The correct code was:</p>
        <Row>
          {secretCode.map((color, i) => (
            <Peg key={i} color={color} />
          ))}
        </Row>
      </CorrectCode>
    )}
    <PlayAgainButton onClick={onPlayAgain}>Play Again</PlayAgainButton>
  </GameOverActions>
);
