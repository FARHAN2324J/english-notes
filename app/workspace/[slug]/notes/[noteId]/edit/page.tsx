"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

import EditNoteForm from "@/components/note/edit-note-form";
import { Id } from "@/convex/_generated/dataModel";

function EditNotePageContent() {
    const params = useParams<{
        slug: string;
        noteId: string;
    }>();

    const noteId = params.noteId as Id<"notes">;

    return (
        <EditNoteForm
            slug={params.slug}
            noteId={noteId}
        />
    );
}

export default function EditNotePage() {
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
            <EditNotePageContent />
        </Suspense>
    );
}