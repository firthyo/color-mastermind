import React, { useState, useEffect } from "react";
import { GameContainer, Title } from "./styles";
import { DIFFICULTY, MAX_ATTEMPTS, CODE_LENGTH } from "../utils/constants";
import { generateSecretCode, calculateFeedback } from "../utils/gameLogic";
// import GameSetup from './GameSetup';
import GameBoard from "./GameBoard";
// import GameActions from './GameActions';
import GameOverScreen from "./GameOverScreen";
import GameActions from "./ColorPicker";
import { GameSetup } from "./GameSetup";

const COLORS = [
  "#4A90E2",
  "#50C878",
  "#FF6B6B",
  "#8B4513",
  "#9B59B6",
  "#FFB347",
];

const ColorMaster: React.FC = () => {
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<
    { colors: string[]; feedback: string[] }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  useEffect(() => {
    if (difficulty) {
      const code = generateSecretCode(difficulty, COLORS, CODE_LENGTH);
      setSecretCode(code);
      resetGame();
    }
  }, [difficulty]);

  const resetGame = () => {
    setCurrentGuess([]);
    setAttempts([]);
    setGameOver(false);
    setWin(false);
  };

  const checkGuess = () => {
    if (currentGuess.length !== CODE_LENGTH) return;

    const feedback = calculateFeedback(currentGuess, secretCode, CODE_LENGTH);
    const updatedAttempts = [
      ...attempts,
      { colors: [...currentGuess], feedback },
    ];
    setAttempts(updatedAttempts);
    setCurrentGuess([]);

    if (feedback.every((f) => f === "green")) {
      setGameOver(true);
      setWin(true);
    } else if (updatedAttempts.length >= MAX_ATTEMPTS) {
      setGameOver(true);
    }
  };

  if (!difficulty) {
    return (
      <GameSetup difficulty={difficulty} onDifficultySelect={setDifficulty} />
    );
  }

  return (
    <GameContainer>
      <Title>Color Master</Title>
      <GameBoard attempts={attempts} currentGuess={currentGuess} />
      {gameOver ? (
        <GameOverScreen
          win={win}
          secretCode={secretCode}
          onPlayAgain={resetGame}
        />
      ) : (
        <GameActions
          colors={COLORS}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          checkGuess={checkGuess}
          difficulty={difficulty}
        />
      )}
    </GameContainer>
  );
};

export default ColorMaster;
