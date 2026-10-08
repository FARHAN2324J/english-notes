"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

import { CopyLinkButton } from "@/components/workspace/copy-link-button";
import { NoteContent } from "@/components/note/note-content";
import {
  Button,
  ButtonLink,
} from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

export default function WorkspaceContent({
  slug,
}: {
  slug: string;
}) {
  const workspace = useQuery(
    api.workspaces.getBySlug,
    { slug },
  );

  const notes = useQuery(
    api.notes.list,
    workspace
      ? { workspaceId: workspace._id }
      : "skip",
  );

  const removeNote = useMutation(
    api.notes.remove,
  );

  const [canEdit, setCanEdit] = useState(false);
  const [confirmingNoteId, setConfirmingNoteId] =
    useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCanEdit(
      Boolean(
        localStorage.getItem(
          `workspace-edit-token:${slug}`,
        ),
      ),
    );
  }, [slug, workspace]);

  if (workspace === undefined) {
    return (
      <main className="min-h-screen bg-[#f1efe8]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#77746b]">
            Loading workspace...
          </p>
        </div>
      </main>
    );
  }

  if (workspace === null) {
    return (
      <main className="min-h-screen bg-[#f1efe8]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-10">
          <ButtonLink href="/" variant="secondary">
            <ArrowLeft size={16} />
            Back home
          </ButtonLink>

          <div className="mt-16 rounded-2xl border-2 border-[#11110f] bg-white p-8 shadow-[6px_6px_0_#11110f]">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#77746b]">
              404
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">
              Workspace not found.
            </h1>
          </div>
        </div>
      </main>
    );
  }

  async function handleConfirmDelete() {
    if (!confirmingNoteId || isDeleting) return;

    const editToken = localStorage.getItem(
      `workspace-edit-token:${slug}`,
    );

    if (!editToken) {
      setCanEdit(false);
      setConfirmingNoteId(null);
      return;
    }

    setIsDeleting(true);

    try {
      await removeNote({
        noteId: confirmingNoteId as never,
        editToken,
      });

      setConfirmingNoteId(null);
    } catch (error) {
      console.error("DELETE NOTE ERROR:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  const noteToDelete = notes?.find(
    (note) => note._id === confirmingNoteId,
  );

  return (
    <main className="min-h-screen bg-[#f1efe8]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 py-5">
          <ButtonLink href="/" variant="secondary">
            <ArrowLeft size={16} />
            Home
          </ButtonLink>

          <div className="flex items-center gap-3">
            <CopyLinkButton slug={slug} />

            {canEdit && (
              <ButtonLink
                href={`/workspace/${slug}/edit`}
                variant="secondary"
              >
                <Edit3 size={15} />
                Edit
              </ButtonLink>
            )}
          </div>
        </header>

        <section className="border-b-2 border-[#11110f] py-8">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#77746b]">
              Workspace
            </p>

            <h1 className="mt-4 break-words text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              {workspace.name}
            </h1>

            <p className="pt-4 text-lg text-[#77746b]">
              by{" "}
              <span className="font-bold text-[#11110f]">
                {workspace.author}
              </span>
            </p>
          </div>

          {canEdit && (
            <div className="mt-10">
              <ButtonLink
                href={`/workspace/${slug}/notes/new`}
                variant="accent"
                size="lg"
              >
                <Plus size={18} strokeWidth={2.5} />
                Add Note
              </ButtonLink>
            </div>
          )}
        </section>

        <section className="py-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#77746b]">
                Notes
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">
                {notes?.length ?? 0}{" "}
                {notes?.length === 1 ? "note" : "notes"}
              </h2>
            </div>
          </div>

          {notes === undefined ? (
            <div className="rounded-2xl border-2 border-[#11110f] bg-white p-8 shadow-[6px_6px_0_#11110f]">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#77746b]">
                Loading notes...
              </p>
            </div>
          ) : notes.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[#11110f] p-10 sm:p-14">
              <FileText size={28} strokeWidth={1.8} />

              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                No notes yet.
              </h3>

              <p className="mt-2 max-w-md text-[#77746b]">
                Start building this English workspace by adding your first note.
              </p>

              {canEdit && (
                <div className="mt-7">
                  <ButtonLink
                    href={`/workspace/${slug}/notes/new`}
                    variant="accent"
                  >
                    <Plus size={17} />
                    Add first note
                  </ButtonLink>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-7">
              {notes.map((note, index) => (
                <article
                  key={note._id}
                  className="group rounded-2xl border-2 border-[#11110f] bg-[#f4f1e8] shadow-[5px_5px_0_#11110f] transition-all duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_#11110f]"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#77746b]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="rounded-md border border-[#11110f] bg-[#d7ff3f] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em]">
                            {note.category}
                          </span>
                        </div>

                        <h3 className="break-words pt-3 font-[var(--font-space-grotesk)] text-2xl font-black leading-[0.95] tracking-[-0.055em] sm:text-[2rem]">
                          {note.title}
                        </h3>
                      </div>

                      {canEdit && (
                        <div className="flex shrink-0 gap-2">
                          <ButtonLink
                            href={`/workspace/${slug}/notes/${note._id}/edit`}
                            variant="icon"
                            ariaLabel={`Edit ${note.title}`}
                            className="!size-9 !rounded-lg"
                          >
                            <Edit3 size={15} />
                          </ButtonLink>

                          <Button
                            type="button"
                            variant="icon"
                            aria-label={`Delete ${note.title}`}
                            onClick={() =>
                              setConfirmingNoteId(note._id)
                            }
                            className="!size-9 !rounded-lg !bg-red-500 !text-white"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t-2 border-[#11110f] pt-5">
                      <NoteContent content={note.content} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {confirmingNoteId && noteToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#11110f]/70 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-note-title"
        >
          <div className="w-full max-w-md rounded-2xl border-2 border-[#11110f] bg-[#f1efe8] p-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#77746b]">
              Delete note
            </p>

            <h2
              id="delete-note-title"
              className="mt-3 text-3xl font-black tracking-[-0.05em]"
            >
              Delete “{noteToDelete.title}”?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#77746b]">
              This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setConfirmingNoteId(null)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                <Trash2 size={16} />
                {isDeleting ? "Deleting..." : "Delete Note"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}