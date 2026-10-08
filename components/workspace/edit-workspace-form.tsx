"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

type EditWorkspaceFormProps = {
    slug: string;
};

export default function EditWorkspaceForm({
    slug,
}: EditWorkspaceFormProps) {
    const router = useRouter();

    const workspace = useQuery(
        api.workspaces.getBySlug,
        {
            slug,
        },
    );

    const updateWorkspace = useMutation(
        api.workspaces.update,
    );

    const removeWorkspace = useMutation(
        api.workspaces.remove,
    );

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");

    const [error, setError] =
        useState<string | null>(null);

    const [isSaving, setIsSaving] =
        useState(false);

    const [isDeleting, setIsDeleting] =
        useState(false);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (workspace === undefined) {
            return;
        }

        if (workspace === null) {
            return;
        }

        if (hasInitialized.current) {
            return;
        }

        setName(workspace.name);
        setAuthor(workspace.author);

        hasInitialized.current = true;
    }, [workspace]);

    function getEditToken() {
        const correctKey =
            `workspace-edit-token:${slug}`;


        const oldKeys = [
            `workspace - edit - token:${slug} `,
            `workspace - edit - token:${slug}`,
            `workspace-edit-token:${slug} `,
            `workspace-edit-token: ${slug}`,
            `workspace-edit-token: ${slug} `,
        ];

        const currentToken =
            localStorage.getItem(correctKey);

        if (currentToken) {
            return currentToken;
        }

        for (const oldKey of oldKeys) {
            const oldToken =
                localStorage.getItem(oldKey);

            if (!oldToken) {
                continue;
            }

            localStorage.setItem(
                correctKey,
                oldToken,
            );

            localStorage.removeItem(oldKey);

            return oldToken;
        }

        return null;


    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();


        if (workspace === undefined) {
            return;
        }

        if (workspace === null) {
            return;
        }

        const editToken = getEditToken();

        if (!editToken) {
            setError(
                "You do not have permission to edit this workspace.",
            );
            return;
        }

        const cleanName = name.trim();
        const cleanAuthor = author.trim();

        if (!cleanName) {
            setError(
                "Workspace name is required.",
            );
            return;
        }

        if (!cleanAuthor) {
            setError(
                "Author name is required.",
            );
            return;
        }

        setError(null);
        setIsSaving(true);

        try {
            await updateWorkspace({
                workspaceId: workspace._id,
                editToken,
                name: cleanName,
                author: cleanAuthor,
            });

            router.push(
                `/workspace/${slug}`,
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setIsSaving(false);
        }


    }

    async function handleDelete() {
        if (workspace === undefined) {
            return;
        }


        if (workspace === null) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this workspace? This action cannot be undone.",
        );

        if (!confirmed) {
            return;
        }

        const editToken = getEditToken();

        if (!editToken) {
            setError(
                "You do not have permission to delete this workspace.",
            );
            return;
        }

        setError(null);
        setIsDeleting(true);

        try {
            await removeWorkspace({
                workspaceId: workspace._id,
                editToken,
            });

            localStorage.removeItem(
                `workspace-edit-token:${slug}`,
            );

            localStorage.removeItem(
                `workspace - edit - token:${slug} `,
            );

            localStorage.removeItem(
                `workspace - edit - token:${slug}`,
            );

            localStorage.removeItem(
                `workspace-edit-token:${slug} `,
            );

            localStorage.removeItem(
                `workspace-edit-token: ${slug}`,
            );

            localStorage.removeItem(
                `workspace-edit-token: ${slug} `,
            );

            router.push("/");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setIsDeleting(false);
        }


    }

    if (workspace === undefined) {
        return (<div className="mx-auto w-full max-w-2xl"> <div className="mb-7"> <div className="h-3 w-32 animate-pulse rounded-sm bg-[#d7ff3f]" />


            <div className="mt-3 h-12 w-64 animate-pulse rounded-lg bg-[#ebe7dc] sm:h-14" />
        </div>

            <div className="rounded-2xl border-2 border-[#11110f] bg-white p-5 shadow-[6px_6px_0_#11110f] sm:p-7">
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 h-3 w-28 animate-pulse rounded bg-[#ebe7dc]" />

                        <div className="h-12 w-full animate-pulse rounded-xl bg-[#ebe7dc]" />
                    </div>

                    <div>
                        <div className="mb-2 h-3 w-16 animate-pulse rounded bg-[#ebe7dc]" />

                        <div className="h-12 w-full animate-pulse rounded-xl bg-[#ebe7dc]" />
                    </div>

                    <div className="mt-8 border-t-2 border-[#11110f] pt-5">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="h-9 w-20 animate-pulse rounded-lg bg-[#ebe7dc]" />

                            <div className="flex items-center justify-end gap-5">
                                <div className="h-4 w-12 animate-pulse rounded bg-[#ebe7dc]" />

                                <div className="h-9 w-28 animate-pulse rounded-lg bg-[#ebe7dc]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );


    }

    if (workspace === null) {
        return (<div className="mx-auto w-full max-w-2xl"> <div className="rounded-2xl border-2 border-[#11110f] bg-white p-6 shadow-[6px_6px_0_#11110f] sm:p-8"> <p className="font-[var(--font-plex-mono)] text-[9px] font-bold uppercase tracking-[0.18em] text-[#77746b]">
            Error 404 </p>


            <h1 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-black uppercase leading-none tracking-[-0.06em] sm:text-4xl">
                Workspace Not Found
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#77746b]">
                This workspace does not exist or may have
                been deleted.
            </p>

            <div className="mt-6">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push("/")}
                >
                    Back Home
                </Button>
            </div>
        </div>
        </div>
        );


    }

    return (<form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl"
    > <div className="my-5">
            <h1 className="mt-2 font-[var(--font-space-grotesk)] text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-5xl">
                Edit Workspace
            </h1>

            <div className="h-2 w-16 rounded-sm bg-[#d7ff3f]" />
        </div>

        <div className="rounded-2xl border-2 border-[#11110f] bg-white p-5 shadow-[6px_6px_0_#11110f] sm:p-7">
            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="workspace-name"
                        className="mb-2 block font-[var(--font-plex-mono)] text-[10px] font-bold uppercase tracking-[0.12em]"
                    >
                        Workspace Name
                    </label>

                    <input
                        id="workspace-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="e.g. English Grammar"
                        autoComplete="off"
                        disabled={isSaving || isDeleting}
                        className="w-full rounded-xl border-2 border-[#11110f] bg-[#f4f1e8] px-4 py-3 text-sm font-semibold text-[#11110f] outline-none transition-shadow placeholder:text-[#9b988e] focus:shadow-[3px_3px_0_#d7ff3f] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="workspace-author"
                        className="mb-2 block font-[var(--font-plex-mono)] text-[10px] font-bold uppercase tracking-[0.12em]"
                    >
                        Author
                    </label>

                    <input
                        id="workspace-author"
                        name="author"
                        type="text"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                        placeholder="Your name"
                        autoComplete="name"
                        disabled={isSaving || isDeleting}
                        className="w-full rounded-xl border-2 border-[#11110f] bg-[#f4f1e8] px-4 py-3 text-sm font-semibold text-[#11110f] outline-none transition-shadow placeholder:text-[#9b988e] focus:shadow-[3px_3px_0_#d7ff3f] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
                    >
                        {error}
                    </div>
                )}
            </div>

            <div className="mt-8 border-t-2 border-[#11110f] pt-5 sm:mt-10 sm:pt-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting || isSaving}
                    >
                        <Trash2
                            size={15}
                            strokeWidth={2.5}
                        />

                        {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                    </Button>

                    <div className="flex items-center justify-end gap-5">
                        <Link
                            href={`/workspace/${slug}`}
                            className="text-sm font-bold text-[#77746b] underline decoration-2 underline-offset-4 transition-colors hover:text-[#11110f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11110f] focus-visible:ring-offset-2"
                        >
                            Cancel
                        </Link>

                        <Button
                            type="submit"
                            variant="accent"
                            size="sm"
                            disabled={isSaving || isDeleting}
                        >
                            <Save
                                size={15}
                                strokeWidth={2.5}
                            />

                            {isSaving
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </form>


    );
}
