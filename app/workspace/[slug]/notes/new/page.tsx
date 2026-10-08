"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

import NewNoteForm from "@/components/note/new-note-form";

function NewNotePageContent() {
    const params = useParams<{ slug: string }>();

    return <NewNoteForm slug={params.slug} />;
}

export default function NewNotePage() {
    return (
        <Suspense
            fallback={
                <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <p
                        role="status"
                        className="text-sm text-zinc-500"
                    >
                        Loading...
                    </p>
                </main>
            }
        >
            <NewNotePageContent />
        </Suspense>
    );
}