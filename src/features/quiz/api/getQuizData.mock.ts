import { QuizQuestion } from '../model/quiz.type';

export const mockQuestions: QuizQuestion[] = [
  {
    question:
      'Duid de 3 dingen aan die niet op een vegetarische pizza thuis horen.',
    time_limit_s: 20,
    answers: [
      { answer: 'Deeg', correct: false },
      { answer: 'Tomatensaus', correct: false },
      { answer: 'Pepperoni', correct: true },
      { answer: 'Spinazie', correct: false },
      { answer: 'Mozarella', correct: false },
      { answer: 'Gehaktballen', correct: true },
      { answer: 'Groene asperges', correct: false },
      { answer: 'Ajuinen', correct: false },
      { answer: 'Paddenstoelen', correct: false },
      { answer: 'Hesp', correct: true },
    ],
  },
  {
    question:
      'Zie jij welke taken niet tot het takenpakket behoren van een productieoperator?',
    time_limit_s: 15,
    answers: [
      { answer: 'Het productieorder bekijken', correct: false },
      { answer: 'Het verband vervangen', correct: false },
      { answer: 'Koorts van de patiënt meten', correct: true },
      { answer: 'De wonde naaien', correct: true },
      { answer: 'De toevoer nakijken', correct: false },
      { answer: 'Te weinig grondstoffen', correct: false },
      { answer: 'Mengeling nakijken', correct: false },
      { answer: 'De dosering nakijken', correct: false },
      { answer: 'De machine controleren', correct: false },
      { answer: 'Brand blussen', correct: true },
    ],
  },
  {
    question: 'Door welke reden kan het vliegtuig hard landen?',
    time_limit_s: 30,
    answers: [
      { answer: 'De piloot moest niezen', correct: false },
      { answer: 'Landingsgestel is niet geolied', correct: true },
      { answer: 'De bemanning danste', correct: false },
      { answer: 'De mensen zitten niet stil', correct: false },
      { answer: 'Het oliepijl is niet goed', correct: false },
    ],
  },
];
