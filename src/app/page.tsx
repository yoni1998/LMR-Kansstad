import avatarSrc from '@/assets/illustrations/job-illustration-avatar.webp';
import bannerSrc from '@/assets/illustrations/job-illustration-background.webp';
import { getQuizData } from '@/features/quiz/api/getQuizData.api';
import { GameSession } from '@/features/quiz/components/GameSession';
import { GameSidePanel } from '@/features/quiz/components/side-panel/GameSidePanel';

const JOB_TITLE = 'Drukkerij';
const JOB_DESCRIPTION =
  'Je moet je goed bewust zijn van wat jij allemaal moet doen. Als drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van onderstaande taken behoren echter niet tot het takenpakket, stop er snel mee voor je baas het ziet!';

export default async function GamePage() {
  const quizData = await getQuizData();

  const questions = quizData.map(({ answers, ...question }) => ({
    ...question,
    answers: answers.map(({ correct: _correct, ...answer }) => answer),
  }));

  return (
    <main className="mx-auto grid max-w-300 grid-cols-1 gap-4 p-4 md:min-h-screen md:grid-cols-[1fr_2fr]">
      <GameSidePanel
        title={JOB_TITLE}
        description={JOB_DESCRIPTION}
        bannerSrc={bannerSrc}
        avatarSrc={avatarSrc}
        progressMax={questions.length}
      />

      <GameSession questions={questions} />
    </main>
  );
}
