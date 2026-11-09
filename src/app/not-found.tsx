import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center font-semibold">
      <h1>404 - Niet gevonden</h1>
      <p>Sorry, deze pagina bestaat niet.</p>
      <Link href={'/'} replace className="underline">
        Ga naar quiz pagina
      </Link>
    </main>
  );
};

export default NotFoundPage;
