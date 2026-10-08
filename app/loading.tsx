export default function Loading() {
    return (
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div
                role="status"
                aria-label="Loading"
                className="space-y-6"
            >
                <div className="h-9 w-56 animate-pulse rounded-lg bg-zinc-200" />

                <div className="h-4 w-80 animate-pulse rounded bg-zinc-100" />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
                    <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
                </div>

                <span className="sr-only">
                    Loading page...
                </span>
            </div>
        </main>
    );
}