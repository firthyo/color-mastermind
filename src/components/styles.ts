import styled, { keyframes, css } from "styled-components";
import { THEME } from "../utils/constants";
import {
  DifficultyButtonProps,
  FeedbackPegProps,
  MessageProps,
  PegProps,
} from "../types/type";
import { adjustColor } from "../utils/adjustColot";

export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const float = keyframes`
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

export const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${THEME.background.main};
  color: ${THEME.text.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(
      180deg,
      rgba(107, 154, 196, 0.1) 0%,
      rgba(248, 249, 250, 0) 100%
    );
    pointer-events: none;
  }
`;

export const Title = styled.h1`
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
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    cursor: pointer;
    height: 4px;
    background: linear-gradient(90deg, #ffb5b5, #95d5b2);
    border-radius: 2px;
  }
`;

export const DifficultySelector = styled.div`
  display: flex;
  gap: 15px;
  margin: 40px 0;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  background: ${(props) =>
    props.selected
      ? `linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%)`
      : `linear-gradient(135deg, ${THEME.background.light} 0%, ${THEME.background.dark} 100%)`};
  color: ${(props) => (props.selected ? "#fff" : THEME.text.primary)};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.selected
      ? "0 10px 20px rgba(107, 154, 196, 0.2)"
      : "0 10px 20px rgba(0, 0, 0, 0.05)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.selected
        ? "0 15px 30px rgba(107, 154, 196, 0.3)"
        : "0 15px 30px rgba(0, 0, 0, 0.1)"};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Board = styled.div`
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

export const Row = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  justify-content: center;
`;

export const pegShimmer = css`
  background-size: 1000px 100%;
  /* animation: ${shimmer} 2s linear infinite; */
`;

export const Peg = styled.div<PegProps>`
  width: 60px;
  height: 60px;
  border-radius: 18px;

  
  background: ${(props) => {
    if (props.color) {
      return `linear-gradient(135deg, ${props.color} 0%, ${adjustColor(
        props.color,
        -10
      )} 100%)`;
    }
    return "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
  }};
  border: ${(props) => {
    if (!props.feedback)
      return '3px solid ${props => props.color ? adjustColor(props.color, -50) : "rgba(0, 0, 0, 0.1)"}';
    switch (props.feedback) {
      case "green":
        return "3px solid #27ae60";
      case "yellow":
        return "3px solid #ffd449";
      case "gray":
        return "3px solid #495057";
      default:
        return "3px solid rgba(0, 0, 0, 0.1)";
    }
  }};
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.clickable
      ? "0 8px 16px rgba(0, 0, 0, 0.1)"
      : "0 4px 8px rgba(0, 0, 0, 0.05)"};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.clickable &&
    css`
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
    content: "";
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
    ${(props) => props.clickable && pegShimmer}
  }
`;

export const FeedbackPeg = styled.div<FeedbackPegProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 2px;
  background-color: ${(props) => {
    switch (props.type) {
      case "correct":
        return "#2ecc71";
      case "wrongPosition":
        return "#f1c40f";
      default:
        return "#e9ecef";
    }
  }};
  border: 2px solid
    ${(props) => {
      switch (props.type) {
        case "correct":
          return "#27ae60";
        case "wrongPosition":
          return "#d4ac0d";
        default:
          return "#495057";
      }
    }};
`;

export const ColorPicker = styled.div`
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

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  width: 100%;
  max-width: 400px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
`;

export const IconButton = styled.button`
  /* width: 48px; */
  /* height: 48px; */
  border-radius: 14px;
  border: none;
  background: ${(props) =>
    props.disabled
      ? `linear-gradient(135deg, ${THEME.background.dark} 0%, #dee2e6 100%)`
      : `linear-gradient(135deg, ${THEME.primary.light} 0%, ${THEME.primary.main} 100%)`};
  color: ${(props) => (props.disabled ? "#adb5bd" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 4px 12px rgba(107, 154, 196, 0.2)"};
  flex-shrink: 0;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 6px 16px rgba(107, 154, 196, 0.3)"};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    ${THEME.primary.light} 0%,
    ${THEME.primary.main} 100%
  );
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
    background: linear-gradient(
      135deg,
      ${THEME.background.dark} 0%,
      #dee2e6 100%
    );
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    animation: none;
  }
`;

export const PlayAgainButton = styled(SubmitButton)`
  background: linear-gradient(
    135deg,
    ${THEME.primary.light} 0%,
    ${THEME.primary.main} 100%
  );
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

export const Message = styled.div<MessageProps>`
  text-align: center;
  margin: 30px 0;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) =>
    props.win
      ? THEME.primary.main
      : props.lose
      ? THEME.secondary.main
      : THEME.text.primary};
  padding: 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
  letter-spacing: 0.5px;
`;

export const CorrectCode = styled.div`
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

export const GameInfo = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: ${THEME.text.primary};
  line-height: 1.8;
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 80%;

  br {
    content: "";
    display: block;
    margin: 10px 0;
  }
`;

export const GameOverActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
`;
