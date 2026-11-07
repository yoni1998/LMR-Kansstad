import { Button } from '@/components/Button';
import { Surface } from '@/components/Surface';
import { CountdownTimer } from './CountdownTimer';
import { OptionButton } from './OptionButton';

type QuestionPanelProps = {
  question: string;
  className?: string;
};

const mockAnswers = [
  { answer: 'Boeken en tijdschriften maken' },
  { answer: 'Auto’s herstellen' },
  { answer: 'Kleding ontwerpen' },
  { answer: 'Brood en taarten bakken' },
];

export function QuestionPanel({
  question,
  className = '',
}: QuestionPanelProps) {
  return (
    <section
      className={`bg-blue-background flex flex-col rounded-2xl p-4 ${className}`}
    >
      <div className="bg-darkest-blue flex flex-1 flex-col items-center gap-8 rounded-md px-4 py-3 md:px-12">
        <div className="h-10">
          <Surface
            color="secondary"
            className="h-10 rounded-full [--edge:var(--color-primary-blue-dark)]!"
          >
            <CountdownTimer size="lg" duration={200} />
          </Surface>
        </div>

        <h1 className="text-h3 text-primary-white max-w-xl text-center font-bold">
          {question}
        </h1>

        <div className="@container w-full">
          <div
            role="group"
            aria-label="Antwoordmogelijkheden"
            className="grid grid-cols-1 gap-3 md:gap-x-8 md:gap-y-6 @md:grid-cols-2"
          >
            {mockAnswers.map(({ answer }, index) => (
              <OptionButton key={index} state="default">
                {answer}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="mt-auto mb-6 flex h-40 w-full max-w-100 flex-col justify-end gap-4">
          <Button variant="primary" className="w-full">
            Klaar!
          </Button>

          <Button variant="secondary" className="w-full">
            Geef me een tip...
          </Button>
        </div>
      </div>
    </section>
  );
}
