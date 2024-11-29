import React from "react";
import { GameOverActions, Message, Row, Peg, PlayAgainButton } from "./styles";

interface Props {
  win: boolean;
  secretCode: string[];
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<Props> = ({ win, secretCode, onPlayAgain }) => (
  <GameOverActions>
    <Message win={win}>{win ? "You Win!" : "Game Over!"}</Message>
    {!win && (
      <div>
        <p>The correct code was:</p>
        <Row>
          {secretCode.map((color, i) => (
            <Peg key={i} color={color} />
          ))}
        </Row>
      </div>
    )}
    <PlayAgainButton onClick={onPlayAgain}>Play Again</PlayAgainButton>
  </GameOverActions>
);

export default GameOverScreen;
