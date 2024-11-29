import { DIFFICULTY } from "./constants";

export const generateSecretCode = (difficulty, colors, length) => {
  if (difficulty === DIFFICULTY.EASY) {
    const availableColors = [...colors];
    return Array.from({ length }, () => {
      const index = Math.floor(Math.random() * availableColors.length);
      return availableColors.splice(index, 1)[0];
    });
  }
  return Array.from(
    { length },
    () => colors[Math.floor(Math.random() * colors.length)]
  );
};

export const calculateFeedback = (guess, code, length) => {
  const feedback = new Array(length).fill("gray");
  const codeCopy = [...code];
  const guessCopy = [...guess];

  // Correct position and color
  for (let i = 0; i < length; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      feedback[i] = "green";
      codeCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // Correct color, wrong position
  for (let i = 0; i < length; i++) {
    if (guessCopy[i] !== null) {
      const index = codeCopy.indexOf(guessCopy[i]);
      if (index !== -1) {
        feedback[i] = "yellow";
        codeCopy[index] = null;
      }
    }
  }

  return feedback;
};
