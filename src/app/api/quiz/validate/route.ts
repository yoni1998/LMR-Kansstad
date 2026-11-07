import { NextResponse } from 'next/server';
import { ValidateQuizAnswersRequestSchema } from '@/features/quiz/model/quiz.schema';
import { ValidateQuizAnswersRequest } from '@/features/quiz/model/quiz.types';

import { validateQuizAnswers } from '@/features/quiz/validateQuizAnswers';

export async function POST(request: Request) {
  try {
    const body: ValidateQuizAnswersRequest = await request.json();
    const parsed = ValidateQuizAnswersRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Ongeldige invoer.' }, { status: 400 });
    }

    const result = await validateQuizAnswers(parsed.data);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Antwoorden konden niet worden gecontroleerd.' },
      { status: 500 },
    );
  }
}
