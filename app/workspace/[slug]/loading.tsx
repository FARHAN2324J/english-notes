export default function WorkspaceLoading() {
    return (
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div
                role="status"
                aria-label="Loading workspace"
                className="space-y-8"
            >
                <div className="h-4 w-32 animate-pulse rounded bg-zinc-100" />

                <div>
                    <div className="h-9 w-64 animate-pulse rounded-lg bg-zinc-200" />
                    <div className="mt-3 h-4 w-32 animate-pulse rounded bg-zinc-100" />
                </div>

                <div className="space-y-4">
                    <div className="h-40 animate-pulse rounded-xl bg-zinc-100" />
                    <div className="h-40 animate-pulse rounded-xl bg-zinc-100" />
                </div>

                <span className="sr-only">
                    Loading workspace...
                </span>
            </div>
        </main>
    );
}