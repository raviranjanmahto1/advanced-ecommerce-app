'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 font-sans bg-background text-foreground">
          <h2 className="text-2xl font-bold mb-4">A critical error occurred!</h2>
          <p className="text-muted-foreground mb-8 text-center">
            The application experienced a fatal error. 
          </p>
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Refresh application
          </button>
        </div>
      </body>
    </html>
  );
}
