export interface MessageProps {
  win?: boolean;
  lose?: boolean;
}

// For DifficultyButton component props
export interface DifficultyButtonProps {
  selected?: boolean;
}

export type FeedbackStageProps = string;

// For Peg component props
export interface PegProps {
  color?: string; // Color of the peg
  feedback?: FeedbackStageProps;
  clickable?: boolean;
  disabled?: boolean;
}

// For IconButton component props
export interface IconButtonProps {
  disabled?: boolean;
}

// For FeedbackPeg component props
export interface FeedbackPegProps {
  type?: "correct" | "wrongPosition" | "none";
}

// For SubmitButton component props
export interface SubmitButtonProps {
  disabled?: boolean;
}
