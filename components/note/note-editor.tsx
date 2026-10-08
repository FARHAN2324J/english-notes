"use client";

import type { JSONContent } from "@tiptap/core";
import {
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

type NoteEditorProps = {
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
};

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const buttonClass =
  "flex size-9 items-center justify-center rounded-full text-[#77746b] transition-colors hover:bg-[#e4e1d8] hover:text-[#11110f] disabled:pointer-events-none disabled:opacity-30";

export function NoteEditor({
  content,
  onChange,
}: NoteEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? emptyDocument,
    immediatelyRender: false,

    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getJSON());
    },
  });

  if (!editor) {
    return (
      <div
        className="min-h-72 animate-pulse bg-[#e3e0d6]"
        aria-label="Loading editor"
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#c9c5ba]">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-[#c9c5ba] px-2 py-2"
        aria-label="Text formatting"
      >
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          aria-label="Bold"
          aria-pressed={editor.isActive("bold")}
          className={buttonClass}
        >
          <Bold size={16} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          aria-label="Italic"
          aria-pressed={editor.isActive("italic")}
          className={buttonClass}
        >
          <Italic size={16} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          aria-label="Heading 2"
          aria-pressed={editor.isActive("heading", {
            level: 2,
          })}
          className={buttonClass}
        >
          <Heading2
            size={16}
            strokeWidth={1.8}
          />
        </button>

        <span className="mx-2 h-5 w-px bg-[#d3cfc5]" />

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          aria-label="Bullet list"
          aria-pressed={editor.isActive("bulletList")}
          className={buttonClass}
        >
          <List size={17} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          aria-label="Numbered list"
          aria-pressed={editor.isActive("orderedList")}
          className={buttonClass}
        >
          <ListOrdered
            size={17}
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          aria-label="Blockquote"
          aria-pressed={editor.isActive(
            "blockquote",
          )}
          className={buttonClass}
        >
          <Quote size={16} strokeWidth={1.8} />
        </button>

        <span className="mx-2 h-5 w-px bg-[#d3cfc5]" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          disabled={!editor.can().undo()}
          aria-label="Undo"
          className={buttonClass}
        >
          <Undo2 size={16} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          disabled={!editor.can().redo()}
          aria-label="Redo"
          className={buttonClass}
        >
          <Redo2 size={16} strokeWidth={1.8} />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="
          min-h-80
          px-1
          py-7

          [&_.ProseMirror]:min-h-72
          [&_.ProseMirror]:text-[17px]
          [&_.ProseMirror]:leading-8
          [&_.ProseMirror]:text-[#292927]
          [&_.ProseMirror]:outline-none

          [&_.ProseMirror_p]:my-5

          [&_.ProseMirror_h2]:mb-4
          [&_.ProseMirror_h2]:mt-8
          [&_.ProseMirror_h2]:text-3xl
          [&_.ProseMirror_h2]:font-black
          [&_.ProseMirror_h2]:leading-none
          [&_.ProseMirror_h2]:tracking-[-0.05em]

          [&_.ProseMirror_ul]:my-5
          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:pl-7

          [&_.ProseMirror_ol]:my-5
          [&_.ProseMirror_ol]:list-decimal
          [&_.ProseMirror_ol]:pl-7

          [&_.ProseMirror_li]:pl-2

          [&_.ProseMirror_blockquote]:my-7
          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-[#11110f]
          [&_.ProseMirror_blockquote]:pl-6
          [&_.ProseMirror_blockquote]:text-[#77746b]

          [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#aaa79d]
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-['Start_writing...']
          [&_.ProseMirror:focus-visible]:outline-none
        "
      />
    </div>
  );
}
