"use client";

import type { FormEvent } from "react";
import type { JSONContent } from "@tiptap/core";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Save,
    Trash2,
} from "lucide-react";

import { NoteEditor } from "@/components/note/note-editor";
import {
    Button,
    ButtonLink,
} from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const categories = [
    { value: "grammar", label: "Grammar" },
    { value: "vocabulary", label: "Vocabulary" },
    { value: "example", label: "Example" },
    { value: "other", label: "Other" },
] as const;

type Category =
    (typeof categories)[number]["value"];

type EditNoteFormProps = {
    slug: string;
    noteId: Id<"notes">;
};

const emptyDocument: JSONContent = {
    type: "doc",
    content: [
        {
            type: "paragraph",
        },
    ],
};

export default function EditNoteForm({
    slug,
    noteId,
}: EditNoteFormProps) {
    const router = useRouter();

    const note = useQuery(
        api.notes.getById,
        { noteId },
    );

    const updateNote = useMutation(
        api.notes.update,
    );

    const removeNote = useMutation(
        api.notes.remove,
    );

    const [title, setTitle] = useState("");
    const [category, setCategory] =
        useState<Category>("grammar");
    const [content, setContent] =
        useState<JSONContent | null>(null);

    const [initialized, setInitialized] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [isSaving, setIsSaving] =
        useState(false);

    const [isDeleting, setIsDeleting] =
        useState(false);

    useEffect(() => {
        if (!note || initialized) {
            return;
        }


        setTitle(note.title);
        setCategory(note.category);
        setContent(note.content as JSONContent);
        setInitialized(true);


    }, [note, initialized]);

    function getEditToken() {
        return localStorage.getItem(
            `workspace-edit-token:${slug}`,
        );
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();


        if (!note) {
            return;
        }

        const cleanTitle = title.trim();

        if (!cleanTitle) {
            setError("Note title is required.");
            return;
        }

        const editToken = getEditToken();

        if (!editToken) {
            setError(
                "You don't have permission to edit this workspace.",
            );
            return;
        }

        setError(null);
        setIsSaving(true);

        try {
            await updateNote({
                noteId,
                editToken,
                title: cleanTitle,
                content: content ?? emptyDocument,
                category,
            });

            router.push(`/workspace/${slug}`);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            );
        } finally {
            setIsSaving(false);
        }


    }

    async function handleDelete() {
        if (!note) {
            return;
        }


        const editToken = getEditToken();

        if (!editToken) {
            setError(
                "You don't have permission to edit this workspace.",
            );
            return;
        }

        const confirmed = window.confirm(
            `Delete "${note.title}"?`,
        );

        if (!confirmed) {
            return;
        }

        setError(null);
        setIsDeleting(true);

        try {
            await removeNote({
                noteId,
                editToken,
            });

            router.push(`/workspace/${slug}`);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            );
        } finally {
            setIsDeleting(false);
        }


    }

    if (note === undefined) {
        return (<main className="min-h-screen bg-[#f4f1e8] text-[#11110f]"> <div className="mx-auto max-w-[1000px] px-5 py-12 sm:px-8"> <div className="animate-pulse"> <div className="h-4 w-24 rounded bg-[#d9d4c7]" /> <div className="mt-8 h-12 w-2/3 rounded bg-[#d9d4c7]" /> <div className="mt-4 h-4 w-32 rounded bg-[#d9d4c7]" /> </div> </div> </main>
        );
    }

    if (note === null) {
        return (<main className="min-h-screen bg-[#f4f1e8] px-5 py-10 text-[#11110f]"> <div className="mx-auto max-w-[1000px]">
            <ButtonLink
                href={`/workspace/${slug}`}
                variant="secondary"
                size="sm"
            > <ArrowLeft size={15} />
                Back </ButtonLink>


            <div className="mt-10 rounded-2xl border-2 border-[#11110f] bg-[#f4f1e8] p-6 shadow-[5px_5px_0_#11110f] sm:p-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77746b]">
                    404 / NOTE
                </p>

                <h1 className="mt-3 font-[var(--font-space-grotesk)] text-4xl font-black tracking-[-0.06em]">
                    Note not found.
                </h1>

                <ButtonLink
                    href={`/workspace/${slug}`}
                    variant="primary"
                    size="sm"
                    className="mt-6"
                >
                    <ArrowLeft size={15} />
                    Back to workspace
                </ButtonLink>
            </div>
        </div>
        </main>
        );


    }

    return (<main className="min-h-screen bg-[#f4f1e8] text-[#11110f]"> <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8"> <header className="flex min-h-16 items-center justify-between border-b-2 border-[#11110f]">
        <Link
            href={`/workspace/${slug}`}
            className="group flex min-w-0 items-center gap-2 text-sm font-bold"
        > <ArrowLeft
                size={16}
                className="shrink-0 transition-transform group-hover:-translate-x-1"
            />


            <span className="truncate">
                {note.title}
            </span>
        </Link>

        <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#77746b]">
            Edit Note
        </span>
    </header>

        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl py-10 sm:py-14"
        >
            <div className="border-b-2 border-[#11110f] pb-7">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77746b]">
                        Note
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#11110f]" />

                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#77746b]">
                        Editing
                    </span>
                </div>

                <input
                    id="note-title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Note title..."
                    required
                    maxLength={150}
                    autoComplete="off"
                    className="mt-4 w-full bg-transparent font-[var(--font-space-grotesk)] text-4xl font-black leading-[0.95] tracking-[-0.06em] outline-none placeholder:text-[#aaa79d] sm:text-6xl"
                />

             
            </div>

            <div className="mt-8">
                {content && (
                    <NoteEditor
                        content={content}
                        onChange={setContent}
                    />
                )}
            </div>

            {error && (
                <div
                    role="alert"
                    className="mt-5 rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                    {error}
                </div>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 border-t-2 border-[#11110f] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting || isSaving}
                >
                    <Trash2 size={15} />

                    {isDeleting
                        ? "Deleting..."
                        : "Delete Note"}
                </Button>

                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/workspace/${slug}`}
                        variant="secondary"
                        size="sm"
                    >
                        Cancel
                    </ButtonLink>

                    <Button
                        type="submit"
                        variant="accent"
                        size="sm"
                        disabled={isSaving || isDeleting}
                    >
                        <Save size={15} />

                        {isSaving
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </div>
            </div>
        </form>
    </div>
    </main>


    );
}
