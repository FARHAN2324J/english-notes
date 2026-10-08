"use client";

import type { FormEvent } from "react";
import type { JSONContent } from "@tiptap/core";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Undo2,
} from "lucide-react";

import { NoteEditor } from "@/components/note/note-editor";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";

const categories = [
  { value: "grammar", label: "Grammar" },
  {
    value: "vocabulary",
    label: "Vocabulary",
  },
  { value: "example", label: "Example" },
  { value: "other", label: "Other" },
] as const;

type Category =
  (typeof categories)[number]["value"];

type NewNoteFormProps = {
  slug: string;
};

const emptyDocument: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export default function NewNoteForm({
  slug,
}: NewNoteFormProps) {
  const router = useRouter();

  const workspace = useQuery(
    api.workspaces.getBySlug,
    { slug },
  );

  const createNote = useMutation(
    api.notes.create,
  );

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<Category>("grammar");
  const [content, setContent] =
    useState<JSONContent>(emptyDocument);

  const [error, setError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!workspace) {
      return;
    }

    const cleanTitle = title.trim();

    console.log("CREATE NOTE:", {
      title,
      cleanTitle,
      category,
      content,
    });

    if (!cleanTitle) {
      setError("Note title is required.");
      return;
    }

    const editToken = localStorage.getItem(
      `workspace-edit-token:${workspace.slug}`,
    );

    if (!editToken) {
      setError(
        "You don't have permission to edit this workspace.",
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      console.log("SENDING TO CONVEX:", {
        workspaceId: workspace._id,
        editToken,
        title: cleanTitle,
        category,
        content,
      });

      await createNote({
        workspaceId: workspace._id,
        editToken,
        title: cleanTitle,
        content,
        category,
      });

      console.log("NOTE CREATED SUCCESSFULLY");

      router.push(
        `/workspace/${workspace.slug}`,
      );
    } catch (error) {
      console.error(
        "CREATE NOTE ERROR:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (workspace === undefined) {
    return (
      <main className="min-h-screen bg-[#f1efe8] p-8">
        <p className="text-sm text-[#77746b]">
          Loading workspace...
        </p>
      </main>
    );
  }

  if (workspace === null) {
    return (
      <main className="min-h-screen bg-[#f1efe8] p-8">
        Workspace not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f1efe8]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[#c9c5ba] py-5">
          <Link
            href={`/workspace/${slug}`}
            className="group flex items-center gap-1 text-sm font-bold"
          >
            <Undo2
              size={16}
              strokeWidth={1.8}
            />
            Back
          </Link>
        </header>

        <form
          onSubmit={handleSubmit}
          className="page-reveal mx-auto max-w-4xl py-16 sm:py-24"
        >
          <div className="border-b border-[#c9c5ba] pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#77746b]">
              Add note
            </p>

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
              aria-invalid={Boolean(error)}
              className="mt-5 w-full bg-transparent text-5xl font-black leading-none tracking-[-0.065em] outline-none placeholder:text-[#aaa79d] sm:text-7xl overflow-hidden rounded-xl border border-[#c9c5ba] p-3"
            />

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map((item) => {
                const active =
                  category === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setCategory(item.value)
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition-colors ${active
                      ? "border-[#11110f] bg-[#11110f] text-[#f1efe8]"
                      : "border-[#c9c5ba] text-[#77746b] hover:border-[#11110f] hover:text-[#11110f]"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <label
              htmlFor="note-content"
              className="sr-only"
            >
              Note content
            </label>

            <NoteEditor
              content={content}
              onChange={setContent}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#c9c5ba] pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="group"
            >
              <Save
                size={16}
                strokeWidth={1.8}
              />

              {isSubmitting
                ? "Saving..."
                : "Save Note"}
            </Button>

            <Link
              href={`/workspace/${slug}`}
              className="text-sm font-semibold text-[#77746b] underline underline-offset-4 hover:text-[#11110f]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}