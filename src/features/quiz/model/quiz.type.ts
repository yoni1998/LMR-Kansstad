export type QuizAnswer = {
  answer: string;
  correct?: boolean;
};

export type QuizQuestion = {
  question: string;
  time_limit_s: number;
  answers: QuizAnswer[];
};
