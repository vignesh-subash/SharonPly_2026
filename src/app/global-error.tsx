"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white bg-[#00793A] hover:bg-[#005a2b]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
