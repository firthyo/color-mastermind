import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Modern sophisticated color palette
const COLORS = [
  '#4A90E2', // Sky Blue
  '#50C878', // Emerald Green
  '#FF6B6B', // Coral Red
  '#8B4513', // Saddle Brown
  '#9B59B6', // Royal Purple
  '#FFB347'  // Pastel Orange
];

const COLOR_NAMES = {
  '#4A90E2': 'Sky Blue',
  '#50C878': 'Emerald Green',
  '#FF6B6B': 'Coral Red',
  '#8B4513': 'Saddle Brown',
  '#9B59B6': 'Royal Purple',
  '#FFB347': 'Pastel Orange'
};

// Theme colors for UI elements
const THEME = {
  primary: {
    light: '#4A90E2',
    main: '#357ABD',
    dark: '#2C6496',
  },
  secondary: {
    light: '#50C878',
    main: '#3DAB63',
    dark: '#2A8C4A',
  },
  background: {
    light: '#FFFFFF',
    main: '#F8F9FA',
    dark: '#E9ECEF',
  },
  text: {
    primary: '#2C3E50',
    secondary: '#34495E',
  }
};

const CODE_LENGTH = 4;
const MAX_ATTEMPTS = 5;

const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium'
};

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${THEME.background.main};
  color: ${THEME.text.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg, rgba(107, 154, 196, 0.1) 0%, rgba(248, 249, 250, 0) 100%);
    pointer-events: none;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${THEME.text.primary};
  font-size: 42px;
  font-weight: 800;
  margin: 0;
  padding: 30px 0;
  width: 100%;
  letter-spacing: -1px;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #FFB5B5, #95D5B2);
    border-radius: 2px;
  }
`;

const DifficultySelector = styled.div`
  display: flex;
  gap: 15px;
  margin: 40px 0;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const DifficultyButton = styled.button`
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  background: ${props => props.selected ? 
    `linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%)` : 
    `linear-gradient(135deg, ${THEME.background.light} 0%, ${THEME.background.dark} 100%)`};
  color: ${props => props.selected ? '#fff' : THEME.text.primary};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.selected ? 
    '0 10px 20px rgba(107, 154, 196, 0.2)' : 
    '0 10px 20px rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.selected ? 
      '0 15px 30px rgba(107, 154, 196, 0.3)' : 
      '0 15px 30px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 30px 0;
  padding: 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  animation: ${scaleIn} 0.5s ease-out;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  justify-content: center;
`;

const pegShimmer = css`
  background-size: 1000px 100%;
  animation: ${shimmer} 2s linear infinite;
`;

const Peg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: ${props => {
    if (props.color) {
      return `linear-gradient(135deg, ${props.color} 0%, ${adjustColor(props.color, -10)} 100%)`;
    }
    return 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
  }};
  border: ${props => {
    if (!props.feedback) return '3px solid ${props => props.color ? adjustColor(props.color, -50) : "rgba(0, 0, 0, 0.1)"}';
    switch (props.feedback) {
      case 'green': return '3px solid #27ae60';
      case 'yellow': return '3px solid #d4ac0d';
      case 'gray': return '3px solid #495057';
      default: return '3px solid rgba(0, 0, 0, 0.1)';
    }
  }};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.clickable ? 
    '0 8px 16px rgba(0, 0, 0, 0.1)' : 
    '0 4px 8px rgba(0, 0, 0, 0.05)'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  position: relative;
  overflow: hidden;

  ${props => props.clickable && css`
    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    ${props => props.clickable && pegShimmer}
  }
`;

const FeedbackPeg = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 2px;
  background-color: ${props => {
    switch (props.type) {
      case 'correct':
        return '#2ecc71';
      case 'wrongPosition':
        return '#f1c40f';
      default:
        return '#e9ecef';
    }
  }};
  border: 2px solid ${props => {
    switch (props.type) {
      case 'correct':
        return '#27ae60';
      case 'wrongPosition':
        return '#d4ac0d';
      default:
        return '#495057';
    }
  }};
`;

const ColorPicker = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  width: 100%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
`;

const IconButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: none;
  background: ${props => props.disabled ? 
    `linear-gradient(135deg, ${THEME.background.dark} 0%, #dee2e6 100%)` : 
    `linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%)`};
  color: ${props => props.disabled ? '#adb5bd' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.disabled ? 
    'none' : 
    '0 4px 12px rgba(107, 154, 196, 0.2)'};
  flex-shrink: 0;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 
      'none' : 
      '0 6px 16px rgba(107, 154, 196, 0.3)'};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  margin: 0;
  height: 48px;
  flex-grow: 1;
  min-width: 120px;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(107, 154, 196, 0.2);
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(107, 154, 196, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(107, 154, 196, 0.2);
  }

  &:disabled {
    background: linear-gradient(135deg, ${THEME.background.dark} 0%, #dee2e6 100%);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    animation: none;
  }
`;

const PlayAgainButton = styled(SubmitButton)`
  background: linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%);
  box-shadow: 0 10px 20px rgba(107, 154, 196, 0.2);
  padding: 16px 36px;
  font-size: 16px;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(107, 154, 196, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(107, 154, 196, 0.2);
  }
`;

const Message = styled.div`
  text-align: center;
  margin: 30px 0;
  font-weight: 600;
  font-size: 20px;
  color: ${props => props.win ? THEME.primary.main : props.lose ? THEME.secondary.main : THEME.text.primary};
  padding: 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
  letter-spacing: 0.5px;
`;

const CorrectCode = styled.div`
  margin-top: 30px;
  padding: 25px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;

  p {
    margin-bottom: 20px;
    color: ${THEME.text.primary};
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 1.6;
  }
`;

const GameInfo = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: ${THEME.text.primary};
  line-height: 1.8;
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 80%;

  br {
    content: '';
    display: block;
    margin: 10px 0;
  }
`;

const GameOverActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
`;

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

function adjustColor(color, amount) {
  const clamp = (num) => Math.min(Math.max(num, 0), 255);
  
  // Convert hex to RGB
  let hex = color.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Darken each component
  r = clamp(r + amount);
  g = clamp(g + amount);
  b = clamp(b + amount);
  
  // Convert back to hex
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

export default ColorMaster;
