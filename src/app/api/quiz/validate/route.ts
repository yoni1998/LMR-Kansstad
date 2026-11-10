import { NextResponse } from 'next/server';

import { ValidateQuizAnswersRequestSchema } from '@/features/quiz/model/quiz.schema';
import { validateQuizAnswers } from '@/features/quiz/validateQuizAnswers';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = ValidateQuizAnswersRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const result = await validateQuizAnswers(validation.data);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (error instanceof Error && error.message === 'Question not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
