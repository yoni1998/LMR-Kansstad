import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, deze pagina bestaat niet.</p>
      <Link href={'/'} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
