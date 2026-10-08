import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-screen max-w-2xl items-center px-4 py-8 sm:px-6 lg:px-8">
            <section
                aria-labelledby="not-found-title"
                className="w-full rounded-xl border border-zinc-200 bg-white p-6 text-center sm:p-8"
            >
                <p className="text-sm font-medium text-zinc-500">
                    404
                </p>

                <h1
                    id="not-found-title"
                    className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950"
                >
                    Page not found
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
                    The page you&apos;re looking for doesn&apos;t
                    exist or may have been removed.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                    Back to Workspaces
                </Link>
            </section>
        </main>
    );
}