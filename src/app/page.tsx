import avatarSrc from '@/assets/illustrations/job-illustration-avatar.webp';
import bannerSrc from '@/assets/illustrations/job-illustration-background.webp';
import { getQuizData } from '@/features/quiz/api/getQuiz.api';
import { QuestionPanel } from '@/features/quiz/components/QuestionPanel';
import { GameSidePanel } from '@/features/quiz/components/side-panel/GameSidePanel';

const JOB_TITLE = 'Drukkerij';
const JOB_DESCRIPTION =
  'Je moet je goed bewust zijn van wat jij allemaal moet doen. Als drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van onderstaande taken behoren echter niet tot het takenpakket, stop er snel mee voor je baas het ziet!';

export default async function QuizPage() {
  const quizData = await getQuizData();

  const questions = quizData.map(({ answers, ...question }) => ({
    ...question,
    answers: answers.map(({ correct: _correct, ...answer }) => answer),
  }));

  return (
    <main className="mx-auto grid w-full max-w-300 flex-1 grid-cols-1 items-start gap-4 p-4 md:min-h-screen md:grid-cols-[1fr_2fr] md:grid-rows-1 md:items-center">
      <GameSidePanel
        title={JOB_TITLE}
        description={JOB_DESCRIPTION}
        bannerSrc={bannerSrc}
        avatarSrc={avatarSrc}
        progressMax={questions.length}
        timerDuration={3000}
        className="min-h-[calc(100dvh-2rem)] md:h-full"
      />

      <QuestionPanel
        questions={questions}
        className="min-h-[calc(100dvh-2rem)] md:h-full"
      />
    </main>
  );
}
