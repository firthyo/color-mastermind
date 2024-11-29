import React, { useState, useEffect } from 'react';
import { GameContainer, Title, DifficultySelector, DifficultyButton, Board, Row, pegShimmer, Peg, FeedbackPeg, ColorPicker, ActionButtons, ButtonGroup, IconButton, SubmitButton, PlayAgainButton, Message, CorrectCode, GameInfo, GameOverActions } from './styles'
import { DIFFICULTY, MAX_ATTEMPTS, CODE_LENGTH } from '../utils/constants'
// Modern sophisticated color palette
const COLORS = [
  '#4A90E2',
  '#50C878',
  '#FF6B6B',
  '#8B4513',
  '#9B59B6',
  '#FFB347'
];




function ColorMaster() {
  const [secretCode, setSecretCode] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  const undoLastColor = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    if (difficulty) {
      generateSecretCode();
    }
  }, [difficulty]);

  const generateSecretCode = () => {
    let code = [];
    if (difficulty === DIFFICULTY.EASY) {
      // Easy mode: no duplicate colors in the secret code
      const availableColors = [...COLORS];
      for (let i = 0; i < CODE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        code.push(availableColors.splice(randomIndex, 1)[0]);
      }
    } else {
      // Medium mode: allow duplicate colors in the secret code
      code = Array.from({ length: CODE_LENGTH }, () =>
        COLORS[Math.floor(Math.random() * COLORS.length)]
      );
    }
    setSecretCode(code);
    setCurrentGuess([]);
    setAttempts([]);
    setGameOver(false);
    setWin(false);
  };

  const startNewGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const addColor = (color) => {
    if (currentGuess.length < CODE_LENGTH && !gameOver) {
      // In Easy mode, can't use the same color more than once in a guess
      if (difficulty === DIFFICULTY.EASY && currentGuess.includes(color)) {
        return;
      }
      setCurrentGuess([...currentGuess, color]);
    }
  };

  const checkGuess = () => {
    if (currentGuess.length !== CODE_LENGTH) return;

    const feedback = calculateFeedback(currentGuess, secretCode);
    const newAttempts = [...attempts, { colors: [...currentGuess], feedback }];
    setAttempts(newAttempts);
    setCurrentGuess([]);

    if (feedback.every(f => f === 'green')) {
      setGameOver(true);
      setWin(true);
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setGameOver(true);
    }
  };

  const calculateFeedback = (guess, code) => {
    const feedback = new Array(CODE_LENGTH).fill('gray');
    const codeCopy = [...code];
    const guessCopy = [...guess];

    // First check for correct position and color
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] === codeCopy[i]) {
        feedback[i] = 'green';
        codeCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // Then check for correct color but wrong position
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guessCopy[i] !== null) {
        const colorIndex = codeCopy.indexOf(guessCopy[i]);
        if (colorIndex !== -1) {
          feedback[i] = 'yellow';
          codeCopy[colorIndex] = null;
        }
      }
    }

    return feedback;
  };

  const resetGame = () => {
    setDifficulty(null);
    setCurrentGuess([]);
    setAttempts([]);
    setGameOver(false);
    setWin(false);
  };

  if (!difficulty) {
    return (
      <GameContainer>
        <Title>Color Master</Title>
        <GameInfo>
          Choose your difficulty level:<br />
          Easy: No duplicate colors allowed<br />
          Medium: Duplicate colors allowed
        </GameInfo>
        <DifficultySelector>
          <DifficultyButton
            selected={difficulty === DIFFICULTY.EASY}
            onClick={() => startNewGame(DIFFICULTY.EASY)}
          >
            Easy
          </DifficultyButton>
          <DifficultyButton
            selected={difficulty === DIFFICULTY.MEDIUM}
            onClick={() => startNewGame(DIFFICULTY.MEDIUM)}
          >
            Medium
          </DifficultyButton>
        </DifficultySelector>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Title>Color Master</Title>
      <Board>
        {attempts.map((attempt, i) => (
          <Row key={i}>
            {attempt.colors.map((color, j) => (
              <Peg
                key={j}
                color={color}
                feedback={attempt.feedback[j]}
              />
            ))}
          </Row>
        ))}
        <Row>
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <Peg
              key={i}
              color={currentGuess[i] || '#f8f9fa'}
            />
          ))}
        </Row>
      </Board>

      {!gameOver && (
        <>
          <ColorPicker>
            {COLORS.map((color) => (
              <Peg
                key={color}
                color={color}
                clickable
                disabled={difficulty === DIFFICULTY.EASY && currentGuess.includes(color)}
                onClick={() => addColor(color)}
              />
            ))}
          </ColorPicker>
          <ActionButtons>
            <ButtonGroup>
              <IconButton
                onClick={undoLastColor}
                disabled={currentGuess.length === 0}
                title="Undo last color"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
                </svg>
              </IconButton>
              <SubmitButton
                disabled={currentGuess.length !== CODE_LENGTH}
                onClick={checkGuess}
              >
                Submit
              </SubmitButton>
            </ButtonGroup>
          </ActionButtons>
        </>
      )}

      {gameOver && (
        <GameOverActions>
          <Message win={win} lose={!win}>
            {win ? 'Congratulations! You won!' : 'Game Over!'}
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
          <PlayAgainButton onClick={resetGame}>
            Play Again
          </PlayAgainButton>
        </GameOverActions>
      )}
    </GameContainer>
  );
}



export default ColorMaster;
