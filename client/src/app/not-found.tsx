import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-9xl font-extrabold text-muted/50 mb-4 tracking-widest">404</h1>
      <h2 className="text-3xl font-bold mb-2 text-center">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
