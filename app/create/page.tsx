"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {
    ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function CreateWorkspacePage() {
    const router = useRouter();

    const createWorkspace = useMutation(
        api.workspaces.create,
    );

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] =
        useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError(null);
        setIsSubmitting(true);

        try {
            const result = await createWorkspace({
                name,
                author,
            });

            localStorage.setItem(
                `workspace - edit - token:${result.slug} `,
                result.editToken,
            );

            router.push(
                `/workspace/${result.slug} `,
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f1efe8] px-5 py-10 text-[#11110f]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border-2 border-[#11110f] p-6 shadow-[6px_6px_0_#11110f] sm:p-8"
            >
                <div className="mb-7">
                    <h1 className="font-[var(--font-space-grotesk)] text-3xl font-black uppercase tracking-[-0.055em]">
                        New Workspace
                    </h1>

                    <div className="h-2 w-16 rounded-sm bg-[#d7ff3f]" />
                </div>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="workspace-name"
                            className="font-[var(--font-plex-mono)] text-[10px] font-bold uppercase tracking-[0.14em]"
                        >
                            Workspace name
                        </label>

                        <input
                            id="workspace-name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Sara English"
                            required
                            maxLength={100}
                            autoComplete="off"
                            className="mt-2.5 w-full rounded-full border-2 border-[#11110f] bg-[#f4f1e8] px-4 py-3 text-base font-bold outline-none transition-all placeholder:text-[#aaa69a] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:bg-white focus:shadow-[3px_3px_0_#d7ff3f]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="workspace-author"
                            className="font-[var(--font-plex-mono)] text-[10px] font-bold uppercase tracking-[0.14em]"
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
                            placeholder="Sara"
                            required
                            maxLength={50}
                            autoComplete="name"
                            className="mt-2.5 w-full rounded-full border-2 border-[#11110f] bg-[#f4f1e8] px-4 py-3 text-base font-bold outline-none transition-all placeholder:text-[#aaa69a] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:bg-white focus:shadow-[3px_3px_0_#d7ff3f]"
                        />
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="rounded-full border-2 border-red-500 bg-red-50 px-3 py-2.5 text-xs font-bold leading-5 text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="accent"
                        size="md"
                        disabled={isSubmitting}
                        className="w-full mt-5"
                    >
                        {isSubmitting ? "Creating..." : "Create Workspace"}
                    </Button>
                </div>
            </form>
        </main>
    );
}