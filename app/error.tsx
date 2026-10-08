"use client";

import { useEffect } from "react";

type ErrorPageProps = {
    error: Error & {
        digest?: string;
    };

    reset: () => void;
};

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-screen max-w-2xl items-center px-4 py-8 sm:px-6 lg:px-8">
            <section
                aria-labelledby="error-title"
                className="w-full rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
                <p className="text-sm font-medium text-red-600">
                    Something went wrong
                </p>

                <h1
                    id="error-title"
                    className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950"
                >
                    We couldn&apos;t load this page.
                </h1>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Please try again. If the problem continues,
                    come back later.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                    Try again
                </button>
            </section>
        </main>
    );
}