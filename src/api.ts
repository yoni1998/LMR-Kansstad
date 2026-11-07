const API_BASE_URL = process.env.BASE_URL;

export const API = {
  BASE_URL: API_BASE_URL,

  ENDPOINTS: {
    QUIZ: {
      GET_ALL: 'dev-test/quiz_data.json',
      VALIDATE_ANSWERS: '/api/quiz/validate',
    },
  },
} as const;
