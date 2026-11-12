import { NextResponse } from 'next/server';

import { answerSubmissionSchema } from '@/features/quiz/model/quiz.schema';
import { validateQuizAnswers } from '@/features/quiz/validateQuizAnswers';
import { ValidationError } from '@/libs/errors';
import { handleRouteError } from '@/libs/handleRouteError';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = answerSubmissionSchema.safeParse(body);

    if (!validation.success) {
      throw new ValidationError('Invalid request body');
    }

    const result = await validateQuizAnswers(validation.data);

    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
